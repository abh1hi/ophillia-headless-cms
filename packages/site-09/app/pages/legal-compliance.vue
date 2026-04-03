<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-20 pb-24 bg-slate-50 dark:bg-slate-900 overflow-hidden border-b border-slate-200 dark:border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold w-fit mx-auto mb-6">
          <span class="material-symbols-outlined text-sm">gavel</span>
          Transparency & Trust
        </div>
        <h1 class="text-5xl lg:text-7xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100 mb-6">
          Legal <span class="text-primary">Compliance</span>
        </h1>
        <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We maintain the highest standards of accountability, transparency, and ethical conduct. Below you will find our registration details, certfications, and institutional policies.
        </p>
      </div>
    </section>

    <section class="py-24">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Registration & Statutory Details -->
        <div class="mb-20">
          <div class="flex items-center gap-4 mb-8">
            <span class="material-symbols-outlined text-4xl text-primary">verified_user</span>
            <h2 class="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Statutory Details</h2>
          </div>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="detail in legalDetails" :key="detail.label" class="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm transition hover:shadow-md">
              <p class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">{{ detail.label }}</p>
              <p class="text-xl font-bold text-slate-900 dark:text-slate-100">{{ detail.value }}</p>
              <p v-if="detail.desc" class="text-sm text-slate-400 mt-2">{{ detail.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Policies -->
        <div>
          <div class="flex items-center gap-4 mb-8">
            <span class="material-symbols-outlined text-4xl text-primary">policy</span>
            <h2 class="text-3xl font-extrabold text-slate-900 dark:text-slate-100">Our Policies</h2>
          </div>

          <div class="space-y-6">
            <div v-for="policy in policies" :key="policy.title" class="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-6 md:items-center justify-between hover:border-primary/30 transition-colors">
              <div>
                <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">{{ policy.title }}</h3>
                <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">{{ policy.description }}</p>
              </div>
              <AppButton :href="policy.link" variant="outline" class="shrink-0 w-full md:w-auto">
                <span class="material-symbols-outlined text-sm mr-2 align-middle">download</span>
                <span class="align-middle">Download PDF</span>
              </AppButton>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Support CTA -->
    <section class="py-16 bg-primary/5 text-center">
       <p class="text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2 flex-wrap">
         <span class="material-symbols-outlined text-primary">info</span>
         <span>Require further official documentation or audit reports? <a href="mailto:contact@arunachalaschool.org" class="text-primary font-bold hover:underline">Contact our administration</a>.</span>
       </p>
    </section>

  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Legal Compliance | Arunachala Village School',
  description: 'View the legal compliance, statutory registrations, FCRA details, and organizational policies of Arunachala Village School.'
})

const legalDetails = [
  {
    label: 'Trust Registration No.',
    value: 'Reg. No. 1234/2000',
    desc: 'Registered under the Indian Trusts Act.'
  },
  {
    label: 'FCRA Registration',
    value: '076040XXXX',
    desc: 'Authorized to receive foreign contributions.'
  },
  {
    label: '12A Registration',
    value: 'Active',
    desc: 'Income Tax exemption status for charitable entities.'
  },
  {
    label: '80G Certification',
    value: 'Active',
    desc: 'Donors receive a 50% tax deduction on their contributions.'
  },
  {
    label: 'CSR Registration',
    value: 'CSR0000XXXX',
    desc: 'Registered with Ministry of Corporate Affairs.'
  },
  {
    label: 'Darpan ID',
    value: 'TN/2010/00XXXX',
    desc: 'NITI Aayog NGO Darpan Registration.'
  }
]

const policies = [
  {
    title: 'Child Protection Policy',
    description: 'Outlines our unwavering commitment to safeguarding every child from harm, abuse, and exploitation. This policy is strictly enforced across all staff and volunteers.',
    link: '#'
  },
  {
    title: 'Privacy Policy',
    description: 'Details how we collect, use, and protect the personal data of our donors, volunteers, staff, and beneficiaries in accordance with applicable laws.',
    link: '#'
  },
  {
    title: 'Financial Management Policy',
    description: 'A comprehensive guide on our internal financial controls, fund utilization, audit processes, and anti-corruption measures.',
    link: '#'
  },
  {
    title: 'Anti-Sexual Harassment (POSH) Policy',
    description: 'Our framework for preventing and redressing sexual harassment at the workplace, ensuring a safe environment for all employees.',
    link: '#'
  }
]
</script>
