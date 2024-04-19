import { ExpoRequest, ExpoResponse } from 'expo-router/server';

import prisma from '@/server/db';

export async function DELETE(_request: ExpoRequest, { id }: { id: string }) {
  const wishItem = await prisma.wishItem.findFirst({
    where: {
      listingId: id
    },
    include: {
      wishList: {
        select: {
          name: true
        }
      }
    }
  });

  if (!wishItem) {
    return ExpoResponse.json({
      success: false,
      message: 'Wish item not found'
    });
  }

  await prisma.wishItem.delete({
    where: {
      id: wishItem.id
    }
  });

  return ExpoResponse.json({ success: true, wishListName: wishItem.wishList.name });
}
