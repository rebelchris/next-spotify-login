import { getUsersPlaylists } from '../../lib/spotify';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req, res) => {
  const {
    token: { accessToken, email },
  } = await getSession({ req });
  if (req.method === 'POST') {
    const { body } = req;
    const {
      name,
      images: { 0: { url } = {} },
      uri,
    } = JSON.parse(body);
    const playlistItem = {
      title: name,
      image: url,
      uri: uri,
      addedBy: email,
    };
    const playlist = await prisma.playlist.create({
      data: playlistItem,
    });
    return res.status(200).json(playlist);
  } else if (req.method === 'GET') {
    const response = await getUsersPlaylists(accessToken);
    const { items } = await response.json();
    return res.status(200).json({ items });
  }
  res.end();
};

export default handler;
