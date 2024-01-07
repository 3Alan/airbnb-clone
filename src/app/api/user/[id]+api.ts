import { ExpoRequest, ExpoResponse } from 'expo-router/server';

import { prisma } from '@/server/db';

export async function GET(_request: ExpoRequest, { id }: { id: string }) {
  const user = await prisma.user.findMany({
    where: {
      id
    },
    select: {
      id: true,
      name: true,
      img: true
    }
  });

  return ExpoResponse.json(user);
}
