import { createClient } from '@/utils/supabase/server';

export default async function handler(req, res) {
  const supabase = createClient();

  try {
    if (req.method === 'GET') {
      const { data: students, error } = await supabase.from('students').select();

      if (error) {
        throw error;
      }

      return res.status(200).json(students);
    }

    if (req.method === 'POST') {
      const { name, age, grade } = req.body;

      if (!name || !age || !grade || typeof age !== 'number') {
        return res.status(400).json({ error: 'Invalid request body' });
      }

      const { data, error } = await supabase.from('students').insert([{ name, age, grade }]);

      if (error) {
        throw error;
      }

      return res.status(201).json(data);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: 'Missing student ID' });
      }

      const { data, error } = await supabase.from('students').delete().eq('id', id);

      if (error) {
        throw error;
      }

      return res.status(200).json(data);
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Error:', error); // Log the error for debugging
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
