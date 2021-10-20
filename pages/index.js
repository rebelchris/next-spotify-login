import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { useSession } from 'next-auth/react';

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const playlists = await prisma.playlist.findMany();
  return {
    props: {
      playlists,
    },
  };
}

const Index = ({ playlists }) => {
  const { data: session } = useSession();

  const upvote = async (playlistId) => {
    const res = await fetch('api/upvotes', {
      method: 'POST',
      body: JSON.stringify({ playlistId: playlistId }),
    });
    const data = await res.json();
  };

  return (
    <ul className='grid max-w-xl grid-cols-2'>
      {playlists.map((playlist) => (
        <li key={playlist.id} className='m-4 shadow-lg rounded-xl'>
          <Link href={`/playlist/${playlist.id}`}>
            <a>
              <img
                src={playlist?.image}
                className='object-cover w-full rounded-t-xl'
              />
            </a>
          </Link>
          <div className='m-4'>
            <h3 className='text-2xl '>{playlist.title}</h3>
            {session && (
              <button
                className='block mt-4 underline'
                onClick={() => upvote(playlist.id)}
              >
                Upvote playlist)
              </button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
export default Index;
