import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const handler = async (req, res) => {
  const {
    token: { email },
  } = await getSession({ req });
  if (req.method === 'POST') {
    const { body } = req;
    const upvote = { ...JSON.parse(body), votedBy: email };
    const vote = await prisma.upvote.create({
      data: upvote,
    });
    return res.status(200).json(vote);
  }

  res.end();
};

export default handler;
