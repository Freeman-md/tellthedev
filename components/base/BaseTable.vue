<!-- components/base/BaseTable.vue -->
<template>
  <div class="w-full space-y-4 pb-4">
    <div
      v-if="filterColumn"
      class="flex px-4 py-3.5 border-b border-default"
    >
      <UInput
        :model-value="table?.tableApi?.getColumn(filterColumn)?.getFilterValue() as string"
        class="max-w-sm"
        :placeholder="`Filter ${filterColumn}...`"
        @update:model-value="table?.tableApi?.getColumn(filterColumn)?.setFilterValue($event)"
      />
    </div>

    <div
      v-if="showColumnToggles"
      class="flex justify-end px-4 py-3.5 border-b border-default"
    >
      <UDropdownMenu
        :items="toggleItems"
        :content="{ align: 'end' }"
      >
        <UButton
          label="Columns"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
        />
      </UDropdownMenu>
    </div>

    <UTable
      ref="table"
      :data="data"
      :columns="columns"
      :pagination-options="paginationOptions"
      :model-value:column-filters="columnFilters"
      :model-value:column-visibility="columnVisibility"
    />

    <div
      v-if="pagination"
      class="flex justify-center border-t border-default pt-4"
    >
      <UPagination
        :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import { upperFirst } from 'scule'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import { computed, ref, useTemplateRef } from 'vue';

const props = defineProps<{
  data: unknown[]
  columns: TableColumn<unknown>[]
  filterColumn?: string
  showColumnToggles?: boolean
  pagination?: boolean
}>()

const table = useTemplateRef('table')
const columnFilters = ref([])
const columnVisibility = ref({})
const paginationOptions = props.pagination
  ? { getPaginationRowModel: getPaginationRowModel() }
  : undefined

const toggleItems = computed<DropdownMenuItem>(() =>
  props.showColumnToggles
    ? table?.tableApi
            ?.getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => ({
              label: upperFirst(column.id),
              type: 'checkbox' as const,
              checked: column.getIsVisible(),
              onUpdateChecked(checked: boolean) {
                table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
              },
              onSelect(e?: Event) {
                e?.preventDefault()
              }
            }))
    : []
)
</script>
