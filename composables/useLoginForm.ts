export const useLoginForm = () => {
  const isSubmitting = ref(false)

  const form = reactive({
    email: '',
    password: '',
  })

  const errors = reactive({
    email: '',
    password: '',
  })

  const toast = useToast()
  const supabase = useSupabaseClient()

  const validateForm = () => {
    let isValid = true

    errors.email = ''
    errors.password = ''

    if (!form.email.includes('@')) {
      errors.email = 'Please enter a valid email'
      isValid = false
    }

    if (!form.password) {
      errors.password = 'Password is required'
      isValid = false
    }

    return isValid
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    isSubmitting.value = true

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      })

      if (error) {
        toast.add({ title: error.message, color: 'error' })
        return
      }

      toast.add({
        title: '✅ Login successful',
      })

await useAuthRedirect()

    } catch (err) {
      toast.add({
        title: `Unexpected error: ${err}`,
        color: 'error',
      })
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    form,
    errors,
    isSubmitting,
    handleSubmit,
  }
}
