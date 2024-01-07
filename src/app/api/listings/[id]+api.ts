import { ExpoRequest, ExpoResponse } from 'expo-router/server';

import { prisma } from '@/server/db';

export async function GET(_request: ExpoRequest, { id }: { id: string }) {
  const listing = await prisma.listing.findUnique({
    where: {
      id
    }
  });

  return ExpoResponse.json(listing);
}
