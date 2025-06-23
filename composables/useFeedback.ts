import { computed } from 'vue';

export const useFeedback = (limit: number = 10, fields?: Array<keyof FeedbackEntry>) => {
  const dummy: FeedbackEntry[] = [
    {
      id: '1',
      project_id: 'proj_1',
      type: 'bug',
      status: 'open',
      content: 'There’s a bug on the login page.',
      summary: null,
      sentiment: 'negative',
      email: 'user1@example.com',
      screenshot_url: 'https://tellthedev.vercel.app/assets/logo.png',
      device_info: { os: 'MacOS 13.5', browser: 'Safari' },
      referrer_url: '/login',
      is_review: false,
      created_at: '2025-06-19T14:35:00',
      updated_at: '2025-06-19T15:00:00',
    },
    {
      id: '2',
      project_id: 'proj_1',
      type: 'comment',
      status: 'resolved',
      content: 'I like the new dark mode!',
      summary: 'User praised dark mode',
      sentiment: 'positive',
      email: null,
      screenshot_url: null,
      device_info: { os: 'Windows 11', browser: 'Chrome' },
      referrer_url: '/settings',
      is_review: true,
      created_at: '2025-06-18T09:10:00',
      updated_at: '2025-06-18T10:00:00',
    },
    {
      id: '3',
      project_id: 'proj_1',
      type: 'idea',
      status: 'open',
      content: 'Can we get a mobile app?',
      summary: null,
      sentiment: 'neutral',
      email: 'user3@example.com',
      screenshot_url: null,
      device_info: { os: 'iOS', browser: 'Safari' },
      referrer_url: '/feedback',
      is_review: false,
      created_at: '2025-06-17T21:05:00',
      updated_at: '2025-06-17T21:06:00',
    },
  ];

  const data = computed(() => {
    return dummy
      .slice(0, limit)
      .map((item) =>
        fields
          ? fields.reduce<Record<string, unknown>>((obj, key) => {
            obj[key] = item[key];
            return obj;
          }, {})
          : item
      );
  });


  const latest = computed(() => data.value[0]);

  const headers = computed(() =>
    data.value.length > 0
      ? Object.keys(data.value[0])
        .filter(key => key !== 'id')
        .map(key => {
          const label = key.replace('_', ' ');
          return label.charAt(0).toUpperCase() + label.slice(1);
        })
      : []
  );

  // for now
  const pending = false;
  const error = null;


  return {
    data,
    latest,
    headers,
    pending,
    error
  };
};
