// composables/useProjects.ts
import { ref, useSupabaseClient, useSupabaseUser, useAsyncData } from '#imports';

export const useProjects = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const projects = ref([]);

  const { data, pending, error, refresh } = useAsyncData(
    'user-projects',
    async () => {
      if (!user.value) return [];

      const { data, error } = await supabase
        .from('projects')
        .select('id, name, created_at, updated_at')
        .eq('user_id', user.value.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    {
      server: false,
      watch: [user],
    }
  );

  projects.value = data;

  return {
    projects,
    pending,
    error,
    refresh,
  };
};
