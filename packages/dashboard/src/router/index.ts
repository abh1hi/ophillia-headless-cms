import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { public: true },
    },
    {
      path: '/',
      component: () => import('@/components/AppLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: '/projects',
        },
        {
          path: 'projects',
          name: 'projects',
          component: () => import('@/views/ProjectsView.vue'),
        },
        {
          path: 'projects/:projectId/pages',
          name: 'pages',
          component: () => import('@/views/PagesView.vue'),
        },
        {
          path: 'projects/:projectId/pages/new',
          name: 'page-new',
          component: () => import('@/views/PageEditorView.vue'),
        },
        {
          path: 'projects/:projectId/pages/:pageId/edit',
          name: 'page-edit',
          component: () => import('@/views/PageEditorView.vue'),
        },
        {
          path: 'projects/:projectId/schemas',
          name: 'schemas',
          component: () => import('@/views/SchemasView.vue'),
        },
        {
          path: 'projects/:projectId/media',
          name: 'media',
          component: () => import('@/views/MediaView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
});

// ─── Navigation Guard ─────────────────────────────────────────────────────────
router.beforeEach((to) => {
  const auth = useAuthStore();

  if (!to.meta.public && !auth.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } };
  }

  // Redirect logged-in users away from /login
  if (to.name === 'login' && auth.isLoggedIn) {
    return { name: 'projects' };
  }
});

export default router;
