// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rpsxcuzlnvjihwmcmubv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwc3hjdXpsbnZqaWh3bWNtdWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMzg1NDMsImV4cCI6MjA2MzcxNDU0M30.hQNxxdcNgWRsLPDv-v4jPuhTa4SuXpB-fPbznTzjdDU';

export const supabase = createClient(supabaseUrl, supabaseKey);