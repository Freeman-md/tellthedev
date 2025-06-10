let projectId: string | null = null;
let selectedType: 'bug' | 'feature' | 'general' | null = null;

window.addEventListener('message', (event) => {
    const { data } = event;

    if (data?.type === 'tellthedev:init' && data?.projectId) {
        projectId = data.projectId;
        console.log('[TellTheDev] Widget initialized with project ID:', projectId);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('[TellTheDev] Widget DOM loaded');

    const form = document.querySelector('form') as HTMLFormElement;
    if (!form) return;

    setupTypeSelector();
    setupFormSubmit(form);
});

function setupTypeSelector() {
    const typeButtons = document.querySelectorAll('[data-type]') as NodeListOf<HTMLButtonElement>;

    typeButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const value = btn.getAttribute('data-type');

            if (value === 'bug' || value === 'feature' || value === 'general') {
                selectedType = value;

                typeButtons.forEach((b) => {
                    b.classList.remove('bg-blue-600', 'text-white', 'hover:bg-blue-600');
                });

                btn.classList.add('bg-blue-600', 'text-white', 'hover:bg-blue-600');
            }
        });
    });
}

function setupFormSubmit(form: HTMLFormElement) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // if (!projectId) {
        //     alert('Widget is not initialized. No project ID.');
        //     return;
        // }

        handleFormSubmission(projectId!);
    });
}

function handleFormSubmission(projectId: string) {
  console.log('[TellTheDev] Submitting feedback for project:', projectId);
  console.log('Selected type:', selectedType);

  const messageEl = document.querySelector('textarea') as HTMLTextAreaElement;
  const imageEl = document.querySelector('input[type="file"]') as HTMLInputElement;

  const messageErrorEl = document.getElementById('message-error');
  const imageErrorEl = document.getElementById('image-error');
  const typeErrorEl = document.getElementById('type-error');

  const message = messageEl?.value.trim();
  const image = imageEl.files?.[0] ?? null;

  // Clear all errors first
  if (messageErrorEl) messageErrorEl.textContent = '';
  if (imageErrorEl) imageErrorEl.textContent = '';
  if (typeErrorEl) typeErrorEl.textContent = '';

  let hasError = false;

  if (!message) {
    if (messageErrorEl) messageErrorEl.textContent = 'Please enter a message';
    hasError = true;
  }

  if (!image) {
    if (imageErrorEl) imageErrorEl.textContent = 'Please select an image';
    hasError = true;
  }

  if (!selectedType) {
    if (typeErrorEl) typeErrorEl.textContent = 'Please select a feedback type';
    hasError = true;
  }

  if (hasError) {
    console.warn('[TellTheDev] Form submission blocked due to validation errors.');
    return;
  }
}
