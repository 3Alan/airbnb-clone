import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { z } from 'zod';

import prisma from '@/server/db';
import getCurrentUser from '@/utils/getCurrentUser';

export async function GET(request: ExpoRequest) {
  const user = await getCurrentUser(request);

  // 获取该用户的wishList列表并且包含该wishList下的ListItem
  const result = await prisma.wishList.findMany({
    where: {
      userId: user.id
    },
    include: {
      wishItems: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });

  for (const wishList of result) {
    const itemsCount = wishList.wishItems.length;
    let img = '';

    if (itemsCount > 0) {
      const latestItem = wishList.wishItems[0];
      const listing = await prisma.listing.findUnique({
        where: {
          id: latestItem.listingId
        },
        select: {
          imgs: true
        }
      });
      img = listing?.imgs[0] || '';
    }

    // @ts-ignore
    wishList.wishItemCount = itemsCount;
    // @ts-ignore
    wishList.img = img;
    // @ts-ignore
    delete wishList.wishItems;
  }

  return ExpoResponse.json(result);
}

export async function POST(request: ExpoRequest) {
  const body = await request.json();

  const schema = z.object({
    name: z.string()
  });
  const parsedRes = schema.safeParse(body);

  // TODO: middleware
  if (!parsedRes.success) {
    return new ExpoResponse(parsedRes.error.message, {
      status: 400
    });
  }

  const user = await getCurrentUser(request);
  const { name } = parsedRes.data;

  const wishList = await prisma.wishList.create({
    data: {
      name,
      userId: user.id
    }
  });

  return ExpoResponse.json(wishList ? { ...wishList, success: true } : { success: false });
}
