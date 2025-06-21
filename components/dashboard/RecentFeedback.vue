<template>
  <BaseTable
    :data="data.slice(0, 5)"
    :columns="columns"
    :show-column-toggles="true"
    filter-column="email"
    :pagination="false"
  />
</template>

<script setup lang="ts">
import BaseTable from '~/components/base/BaseTable.vue'
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UBadge = resolveComponent('UBadge')

defineProps<{
  data: {
    id: string
    date: string
    status: string
    email: string
    content: string
  }[]
}>()

const columns: TableColumn[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) =>
      new Date(row.getValue('date')).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short'
      })
  },
  {
    accessorKey: 'email',
    header: 'From'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) =>
      h(UBadge, { color: 'info', variant: 'subtle' }, () => row.getValue('status'))
  },
  {
    accessorKey: 'content',
    header: 'Summary',
    cell: ({ row }) =>
      h('div', { class: 'line-clamp-1 text-sm text-muted' }, row.getValue('content'))
  }
]
</script>
