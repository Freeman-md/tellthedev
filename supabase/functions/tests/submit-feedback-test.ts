/// <reference lib="deno.ns" />

import { assert, assertEquals, assertExists } from 'jsr:@std/assert@1';
import { createClient, SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import 'jsr:@std/dotenv/load';

// Environment vars
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const jwt = Deno.env.get('SUPABASE_TEST_JWT')!;
const testProjectId = Deno.env.get('SUPABASE_TEST_PROJECT_ID')!;

// Authenticated Supabase client for RLS
const client: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  },
});

// Helper: Fake image file
function createFakeImage(): File {
  const imageData = new Uint8Array([137, 80, 78, 71]); // PNG header
  return new File([imageData], 'test.png', { type: 'image/png' });
}

Deno.test('Client Connectivity Test', async () => {
  const { data, error } = await client.from('projects').select('*').limit(1);
  if (error) throw new Error('Supabase query failed: ' + error.message);
  assertExists(data, 'Should fetch at least one project');
});

Deno.test('Submit Feedback - with image', async () => {
  const formData = new FormData();
  formData.set('projectId', testProjectId);
  formData.set('type', 'bug');
  formData.set('message', 'Test feedback: with image');
  formData.set('image', createFakeImage());

  const { data, error } = await client.functions.invoke('submit-feedback', {
    body: formData,
    headers: {
      "x-test-mode": "true",
    }
  });

  if (error) {
    const raw = await error.context.text();
    console.log('Function Error:', raw);
    throw new Error('Edge function threw error');
  }

  assertExists(data);
  assertEquals(data.message, 'Feedback submitted successfully');
  assert(typeof data.imageUrl, 'string');
});

Deno.test('Submit Feedback - without image', async () => {
  const formData = new FormData();
  formData.set('projectId', testProjectId);
  formData.set('type', 'feature');
  formData.set('message', 'Test feedback: without image');

  const { data, error } = await client.functions.invoke('submit-feedback', {
    body: formData,
    headers: {
      "x-test-mode": "true",
    }
  });

  if (error) {
    const raw = await error.context.text();
    console.log('Function Error:', raw);
    throw new Error('Edge function threw error');
  }

  assertExists(data);
  assertEquals(data.message, 'Feedback submitted successfully');
  assertEquals(data.imageUrl, null);
});

Deno.test('Submit Feedback - missing fields (invalid input)', async () => {
  const formData = new FormData();
  formData.set('projectId', '');
  formData.set('type', 'invalid');
  formData.set('message', '');
  formData.set('image', 'not-a-real-file');

  const { data, error } = await client.functions.invoke('submit-feedback', {
    body: formData,
    headers: {
      "x-test-mode": "true",
    }
  });

  let responseJson = data;

  if (error && error.context?.text) {
    const raw = await error.context.text();
    responseJson = JSON.parse(raw);
  }

  assertEquals(responseJson.error, 'Validation failed');
  assertExists(responseJson.details?.projectId);
  assertExists(responseJson.details?.type);
  assertExists(responseJson.details?.message);
  assertExists(responseJson.details?.image);
});
