import { addToWaitlist } from '~/services/waitlist-service'

export function useWaitlist() {
  const toast = useToast()

  const submit = async (email: string) => {
    if (!email) return false
    const { error } = await addToWaitlist(email)
    if (error) {
      toast.add({
        title: 'Error',
        description: error.message && error.message.includes('duplicate key') ? 'This email is already on the waitlist.' : error.message,
        color: 'error',
        icon: 'i-heroicons-exclamation-triangle'
      })
      return false
    }
    toast.add({
      title: 'Success',
      description: 'Thanks for joining the waitlist! You\'ll be the first to know.',
      color: 'success',
      icon: 'i-heroicons-check-badge'
    })
    return true
  }

  return { submit }
} 