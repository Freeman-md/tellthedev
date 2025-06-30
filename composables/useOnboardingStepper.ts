import { ref, computed, useTemplateRef, type Ref } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import type { StepperItem } from '@nuxt/ui';

export function useOnboardingStepper({
  projectCreated
} : {
  projectCreated: Ref<Project | null>
}) {
  // Stepper items definition
  const steps = ref<StepperItem[]>([
    {
      slot: 'project-info' as const,
      title: 'Project Info',
      icon: 'i-lucide-folder-plus',
    },
    {
      slot: 'allowed-origins' as const,
      title: 'Allowed Origins',
      icon: 'i-lucide-globe',
    },
    {
      slot: 'widget-settings' as const,
      title: 'Widget Settings',
      icon: 'i-lucide-sliders-horizontal',
    },
    {
      slot: 'finish-setup' as const,
      title: 'Finish Setup',
      icon: 'i-lucide-check-circle',
    },
  ]);

  // Stepper state
  const activeStep = ref(0);
  const stepRefs = [ref(), ref(), ref(), ref()];
  const stepper = useTemplateRef<UStepperRef>('stepper');

  // Responsive stepper size
  const isXS = useMediaQuery('(max-width: 400px)');
  const isSM = useMediaQuery('(max-width: 640px)');
  const stepperSize = computed(() =>
    isXS.value ? 'xs' : isSM.value ? 'sm' : 'md'
  );

  // Navigation helpers
  const isLastFormStep = computed(() => activeStep.value === 2);
  const isFinalStep = computed(() => activeStep.value === 3);

  const handlePrev = () => {
    if (projectCreated.value || isFinalStep.value) return

    stepper.value?.prev();
  };
  const handleNext = async () => {
    if (projectCreated.value || isFinalStep.value) return

    const current = stepRefs[activeStep.value]?.value
    const valid = await current?.validate?.();

    if (!valid) return

    stepper.value?.next();
  };

  return {
    steps,
    activeStep,
    stepRefs,
    stepper,
    stepperSize,
    isLastFormStep,
    isFinalStep,
    handlePrev,
    handleNext,
  };
} 