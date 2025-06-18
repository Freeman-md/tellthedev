/// <reference lib="deno.ns" />

import { assertEquals, assertExists } from 'jsr:@std/assert@1';
import { createClient, SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import 'jsr:@std/dotenv/load';

// Env setup
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const jwt = Deno.env.get('SUPABASE_TEST_JWT')!;
const testProjectId = Deno.env.get('SUPABASE_TEST_PROJECT_ID')!;

// Supabase client with test JWT (for RLS if enabled)
const client: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  },
});

Deno.test('Validate Project - valid ID', async () => {
  const { data, error } = await client.functions.invoke('validate-project', {
    body: { projectId: testProjectId },
     headers: {
      "x-test-mode": "true",
    }
  });

  if (error) {
    const raw = await error.context.text();
    console.error('Function Error:', raw);
    throw new Error('Edge function threw error');
  }

  assertExists(data);
  assertEquals(data.valid, true);
});

Deno.test('Validate Project - invalid ID format', async () => {
  const { data, error } = await client.functions.invoke('validate-project', {
    body: { projectId: 'invalid-id-123' },
     headers: {
      "x-test-mode": "true",
    }
  });

  let response: any = data;

  if (error && error.context?.text) {
    const raw = await error.context.text();
    response = JSON.parse(raw);
  }

  assertEquals(response.valid, false);
});

Deno.test('Validate Project - valid UUID but not found', async () => {
  const fakeUuid = '11111111-1111-1111-1111-111111111111';

  const { data, error } = await client.functions.invoke('validate-project', {
    body: { projectId: fakeUuid },
     headers: {
      "x-test-mode": "true",
    }
  });

  let response: any = data;

  if (error && error.context?.text) {
    const raw = await error.context.text();
    response = JSON.parse(raw);
  }

  assertEquals(response.valid, false);
});



Deno.test('Validate Project - missing ID', async () => {
  const { data, error } = await client.functions.invoke('validate-project', {
    body: {},
     headers: {
      "x-test-mode": "true",
    }
  });

  let responseJson: any = data;

  if (error && error.context?.text) {
    const raw = await error.context.text();
    responseJson = JSON.parse(raw);
  }

  assertEquals(responseJson.error, 'Missing or invalid projectId');
});
