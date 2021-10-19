import { PrismaClient } from '@prisma/client';

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();
  const playlist = await prisma.playlist.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  return {
    props: {
      playlist,
    },
  };
}

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const playlists = await prisma.playlist.findMany();

  return {
    paths: playlists.map((playlist) => ({
      params: {
        id: playlist.id.toString(),
      },
    })),
    fallback: false,
  };
}

const Playlist = ({ playlist }) => (
  <div className='rounded-xl shadow-lg'>
    <img src={playlist?.image} className='object-cover w-full rounded-t-xl' />
    <div className='m-4'>
      <h1 className='text-4xl'>{playlist.title}</h1>
      <a className='underline mt-4 block' href={playlist.uri}>
        Open on Spotify
      </a>
    </div>
  </div>
);
export default Playlist;
