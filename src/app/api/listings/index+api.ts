import { ExpoRequest, ExpoResponse } from 'expo-router/server';

import { prisma } from '@/server/db';
import getApiParams from '@/utils/getApiParams';

export async function GET(request: ExpoRequest) {
  const { page = 1, num = 5 } = getApiParams(request);

  const listings = await prisma.listing.findMany({
    skip: (Number(page) - 1) * Number(num),
    take: Number(num)
  });

  const hasNextPage =
    (await prisma.listing.count({
      skip: Number(page) * Number(num),
      take: Number(num)
    })) > 0;

  return ExpoResponse.json({ listings, hasNextPage });
}
