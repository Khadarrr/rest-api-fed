import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Artists() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: artists } = await supabase.from("artists").select();

  return (
    <>
    <div className="container mx-auto p-4">
      {artists?.map((artist) => (
        <div key={artist.id} className="mb-8 p-4 bg-gray-100 rounded-md">
          <h2 className="text-2xl text-black font-bold mb-2">{artist.name}</h2>
          <p className="text-gray-600">Genre: {artist.genre}</p>
          <p className="text-gray-600">Origin City: {artist.origin_city}</p>
          <img
            src={artist.image_url}
            alt={`${artist.name}'s image`}
            className="mt-4 rounded-md shadow-md w-100 h-100 object-cover"
          />
        </div>
      ))}
    </div>
    </>
  );
}
