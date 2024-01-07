import { Listing } from '@prisma/client';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';

import { prisma } from '@/server/db';
import getApiParams from '@/utils/getApiParams';

export async function GET(request: ExpoRequest) {
  const { page = 1, num = 5, category } = getApiParams(request);

  const listings = await prisma.listing.findMany({
    skip: (Number(page) - 1) * Number(num),
    take: Number(num),
    where: {
      category: {
        name: category
      }
    }
  });

  const hasNextPage =
    (await prisma.listing.count({
      skip: Number(page) * Number(num),
      take: Number(num),
      where: {
        category: {
          name: category
        }
      }
    })) > 0;

  return ExpoResponse.json({ listings, hasNextPage });
}

export async function POST(request: ExpoRequest) {
  const body = (await request.json()) as Listing;
  const {
    title,
    description,
    img,
    roomCount,
    bathRoomCount,
    bedCount,
    guestCount,
    rating,
    price,
    categoryId,
    userId
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      img,
      roomCount,
      bathRoomCount,
      bedCount,
      guestCount,
      rating,
      price,
      categoryId,
      userId
    }
  });

  return ExpoResponse.json({ listing });
}
