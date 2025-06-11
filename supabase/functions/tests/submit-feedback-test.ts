import { assert, assertEquals } from 'jsr:@std/assert@1'
import { createClient, SupabaseClient } from 'jsr:@supabase/supabase-js@2'

import 'jsr:@std/dotenv/load'

const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
const options = {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
    }
}

const testClientCreation = async () => {
    var client: SupabaseClient = createClient(supabaseUrl, supabaseKey, options)

    if (!supabaseUrl) throw new Error('supabaseUrl is required')
    if (!supabaseKey) throw new Error('supabaseKey is required')

    const { data: table_data, error: table_error } = await client.from('feedback').select('*').limit(1)

    if (table_error) {
        throw new Error('Invalid Supabase client: ' + table_error.message)
    }

    assert(table_data, 'Data returned')
}

Deno.test('Client Creation Test', testClientCreation)
