import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gxojwjtsfwgmoctwitza.supabase.co'
const supabaseAnonKey = 'sb_publishable_67zs5bf8J6DhWmRyQSSCiA_r56djFOk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)