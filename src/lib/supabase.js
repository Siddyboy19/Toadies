import { createClient } from '@supabase/supabase-js';

const _u = process.env.REACT_APP_SUPABASE_URL   || '';
const _k = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = (_u && _k) ? createClient(_u, _k) : null;
