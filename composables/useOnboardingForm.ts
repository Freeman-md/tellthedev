import { ref } from 'vue';

export function useOnboardingForm() {
  const formData = ref({
    project: {
      name: '',
      description: '',
      slug: '',
    },
    origins: [],
    widgetSettings: {
      theme: 'system',
      position: 'bottom-right',
      allowScreenshot: true,
      allowEmail: false,
      defaultTypes: ['bug', 'idea'],
    },
  });

  const resetForm = () => {
    formData.value = {
      project: {
        name: '',
        description: '',
        slug: '',
      },
      origins: [],
      widgetSettings: {
        theme: 'system',
        position: 'bottom-right',
        allowScreenshot: true,
        allowEmail: false,
        defaultTypes: ['bug', 'idea'],
      },
    };
  }

  return {
    formData,
    resetForm,
  };
} 