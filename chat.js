import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { input } = req.body;
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are SYNCRO, a helpful coach.' },
      { role: 'user', content: input }
    ]
  });

  const bot_response = completion.choices[0].message.content;
  const tags = [];

  if (input.includes('왜')) tags.push('WHY');
  if (input.includes('어떻게')) tags.push('HOW');

  await supabase.from('conversations').insert({ user_input: input, bot_response, tags });
  res.status(200).json({ bot_response });
}
