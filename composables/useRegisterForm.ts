import { ref, reactive } from 'vue'
import { useSupabaseClient, useToast } from '#imports'

export const useRegisterForm = () => {
  const isSubmitting = ref(false)

  const form = reactive({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const errors = reactive({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const toast = useToast()
  const supabase = useSupabaseClient()

  const validateForm = () => {
    let isValid = true

    errors.email = ''
    errors.password = ''
    errors.confirmPassword = ''

    if (!form.email.includes('@')) {
      errors.email = 'Please enter a valid email'
      isValid = false
    }

    if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
      isValid = false
    }

    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
      isValid = false
    }

    return isValid
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    isSubmitting.value = true

    try {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      })

      if (error) {
        errors.email = error.message
        return
      }

      toast.add({
        title: '✅ Account created. Check your inbox for verification.',
      })

      navigateTo('/auth/login')
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
