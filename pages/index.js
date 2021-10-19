import Link from 'next/link';
import { PrismaClient } from '@prisma/client';

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const playlists = await prisma.playlist.findMany();
  return {
    props: {
      playlists,
    },
  };
}

const Index = ({ playlists }) => (
  <ul className='grid grid-cols-2 max-w-xl'>
    {playlists.map((playlist) => (
      <li key={playlist.id} className='rounded-xl shadow-lg m-4'>
        <Link href={`/playlist/${playlist.id}`}>
          <a>
            <img
              src={playlist?.image}
              className='object-cover w-full rounded-t-xl'
            />
            <h3 className='text-2xl m-4'>{playlist.title}</h3>
          </a>
        </Link>
      </li>
    ))}
  </ul>
);
export default Index;
