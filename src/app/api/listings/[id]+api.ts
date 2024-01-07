import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { isEmpty } from 'lodash';

import { prisma } from '@/server/db';

export async function GET(_request: ExpoRequest, { id }: { id: string }) {
  const listing = await prisma.listing.findUnique({
    where: {
      id
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          img: true,
          createdAt: true
        }
      }
    }
  });

  if (isEmpty(listing)) {
    return ExpoResponse.json(listing);
  }

  const userListingCount = await prisma.listing.count({
    where: {
      userId: listing.user.id
    }
  });

  const user = {
    ...listing.user,
    listingCount: userListingCount
  };

  return ExpoResponse.json({ ...listing, user });
}
