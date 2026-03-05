import { defineStore } from 'pinia';
import { ref } from 'vue';
import { projectsApi } from '@/api/projects';
import type { Project } from '@/api/projects';

export const useProjectStore = defineStore('project', () => {
    const projects = ref<Project[]>([]);
    const currentProject = ref<Project | null>(
        JSON.parse(localStorage.getItem('pb_current_project') ?? 'null')
    );
    const loading = ref(false);

    async function fetchProjects() {
        loading.value = true;
        try {
            const result = await projectsApi.list();
            projects.value = result.items;
            // Auto-select if only one project
            if (!currentProject.value && result.items.length === 1) {
                setCurrentProject(result.items[0]);
            }
        } finally {
            loading.value = false;
        }
    }

    function setCurrentProject(project: Project) {
        currentProject.value = project;
        localStorage.setItem('pb_current_project', JSON.stringify(project));
    }

    function clearProject() {
        currentProject.value = null;
        localStorage.removeItem('pb_current_project');
    }

    return { projects, currentProject, loading, fetchProjects, setCurrentProject, clearProject };
});
