export const useSidebar = () => {
  const isSidebarOpen = useState<boolean>('sidebar-open', () => false)
  const toggleSidebar = () => isSidebarOpen.value = !isSidebarOpen.value
  const openSidebar = () => isSidebarOpen.value = true
  const closeSidebar = () => isSidebarOpen.value = false

  return {
    isSidebarOpen,
    toggleSidebar,
    openSidebar,
    closeSidebar,
  }
}
