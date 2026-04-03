<template>
  <main class="bg-white dark:bg-slate-900 pb-24">
    <!-- Article Header -->
    <header class="pt-32 pb-16 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <!-- Meta Info -->
        <div class="flex items-center justify-center gap-3 mb-8">
          <NuxtLink to="/blog" class="text-primary text-xs font-bold uppercase tracking-wider hover:underline">
            Events
          </NuxtLink>
          <span class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
          <span class="text-slate-500 dark:text-slate-400 text-sm font-medium">May 15, 2024</span>
          <span class="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
          <span class="text-slate-500 dark:text-slate-400 text-sm font-medium flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">schedule</span> 5 min read
          </span>
        </div>

        <!-- Title -->
        <h1 class="text-4xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100 mb-8">
          The Impact of Art Therapy on Our Students
        </h1>

        <!-- Author / Share -->
        <div class="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-8 mt-8 text-left">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center">
              <span class="material-symbols-outlined text-slate-500">person</span>
            </div>
            <div>
              <p class="text-base font-bold text-slate-900 dark:text-slate-100 mb-0.5">Lakshmi Raman</p>
              <p class="text-xs text-slate-500 font-medium">Arts Coordinator</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-primary hover:border-primary/50 transition-colors">
              <span class="material-symbols-outlined text-sm">share</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Featured Image -->
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
      <div class="aspect-video w-full rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-700 shadow-xl border-8 border-white dark:border-slate-900 flex items-center justify-center">
        <div class="text-center text-slate-400 dark:text-slate-500">
          <span class="material-symbols-outlined text-6xl mb-4">image</span>
          <p class="font-bold text-lg mb-2">Featured Image Placeholder</p>
          <p class="text-sm">Landscape image defining the article context.</p>
        </div>
      </div>
      <p class="text-center text-xs text-slate-400 mt-4 italic">Photo: Students painting the new library mural.</p>
    </div>

    <!-- Article Content -->
    <article class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
      <div class="prose prose-lg dark:prose-invert prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-2xl max-w-none text-slate-600 dark:text-slate-400 space-y-8 leading-loose">
        
        <p class="text-xl text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
          Discover how integrating creative arts into our daily curriculum has transformed the way children express themselves and process complex emotions. See the beautiful murals and projects crafted by our talented students this semester.
        </p>

        <p>
          At Arunachala Village School, we have always believed that education is more than just textbooks and examinations. Our philosophy is rooted in holistic development—nurturing the mind, body, and soul. Recognizing that many of our students come from backgrounds shaped by systemic challenges and isolation, we recently introduced a dedicated <strong>Art Therapy program</strong>. The goal was simple: to give them a safe space to express what words sometimes cannot.
        </p>

        <h2 class="text-3xl text-slate-900 dark:text-slate-100 mt-12 mb-6">A New Medium for Emotion</h2>
        <p>
          When the program launched three months ago, the initial reaction was cautious curiosity. For many children, art was simply drawing a scenery during free time. We introduced them to colors as emotions, textures as feelings, and blank canvases as their personal journals.
        </p>
        <p>
          Our facilitators began with simple exercises like "draw your happiest memory" or "paint how the rain feels." Slowly, we witnessed a profound shift in classroom dynamics. The quietest children began to produce the most vibrant, complex paintings. One notably withdrawn student, 11-year-old Kavya, who rarely participated in group discussions, spent an hour blending turbulent blues into warm yellows, later explaining her painting represented <em>"waking up to see my mother smile."</em>
        </p>

        <!-- In-article blockquote -->
        <blockquote class="border-l-4 border-primary pl-6 my-10 italic text-2xl text-slate-800 dark:text-slate-200 font-medium leading-relaxed bg-slate-50 dark:bg-slate-800/50 py-6 pr-6 rounded-r-2xl">
          "The canvas became a voice for those who were told to be quiet. It was the most beautiful rebellion we could have hoped for."
        </blockquote>

        <h3 class="text-2xl text-slate-900 dark:text-slate-100 mt-10 mb-4">Building the Library Mural</h3>
        <p>
          As the students grew more comfortable with their artistic voices, we scaled the project up. The dull, white walls of our newly expanded library needed some life. Instead of hiring external painters, we handed the brushes to our senior students.
        </p>
        
        <!-- Embedded Image Placeholder -->
        <div class="my-10 aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
          <div class="text-center text-slate-400">
            <span class="material-symbols-outlined text-4xl mb-2">format_paint</span>
            <p class="font-bold text-sm">Content Image Placeholder</p>
          </div>
        </div>

        <p>
          The theme they chose was "The Roots of Knowledge." Working in teams, they learned collaboration, patience, and spatial planning. But more importantly, they learned to take ownership of their school. When a child paints the walls of their classroom, they never look at that wall the same way again—it becomes <em>their</em> school in the truest sense.
        </p>

        <h3 class="text-2xl text-slate-900 dark:text-slate-100 mt-10 mb-4">The Quantifiable Impact</h3>
        <p>
          The changes weren't merely anecdotal. Over the span of the semester, our teachers noted:
        </p>
        <ul class="list-disc pl-6 space-y-3 mb-8">
          <li><strong>A 40% reduction</strong> in playground conflicts, as students developed healthier coping mechanisms for frustration.</li>
          <li><strong>Increased focus</strong> during traditional academic subjects immediately following art sessions.</li>
          <li>Stronger peer-to-peer relationships, especially among students who previously struggled to integrate into group activities.</li>
        </ul>

        <p>
          We extend our deepest gratitude to the generous sponsors who funded the art supplies for this initiative. Your support didn't just buy paint and brushes; it bought confidence, healing, and a voice for those who needed it most. We look forward to seeing where these young artists take their creativity next.
        </p>

      </div>
      
      <!-- Tags -->
      <div class="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-2">
        <span class="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase">Art Therapy</span>
        <span class="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase">School Projects</span>
        <span class="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase">Mental Health</span>
      </div>
    </article>

    <!-- Next / Prev Post (Static Demo) -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
      <div class="grid sm:grid-cols-2 gap-4">
        <NuxtLink to="/blog" class="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group text-left">
          <p class="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest flex items-center gap-1 group-hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-sm">arrow_back</span> Previous
          </p>
          <p class="font-bold text-slate-900 dark:text-slate-100 line-clamp-2">How Our Organic Garden is Teaching Math</p>
        </NuxtLink>
        <NuxtLink to="/blog" class="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group text-right flex flex-col items-end">
          <p class="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest flex items-center gap-1 group-hover:text-primary transition-colors">
            Next <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </p>
          <p class="font-bold text-slate-900 dark:text-slate-100 line-clamp-2">Annual Sports Day: A Celebration of Teamwork</p>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup>
const route = useRoute()

// Normally, you would fetch data here based on the slug. 
// This is static template data demonstrating the layout.
const title = 'The Impact of Art Therapy on Our Students'

useSeoMeta({
  title: `${title} | AVS Blog`,
  description: 'Discover how integrating creative arts into our daily curriculum has transformed the way children express themselves and process complex emotions.'
})
</script>
