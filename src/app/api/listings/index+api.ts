import { Listing } from '@prisma/client';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';

import prisma from '@/server/db';
import getApiParams from '@/utils/getApiParams';

export async function GET(request: ExpoRequest) {
  const { page = 1, num = 5, category, startDate, endDate, guestCount } = getApiParams(request);

  const filterParams: any = {
    guestCount: {
      gte: Number(guestCount) || 0
    },
    category: {
      name: category
    }
  };

  if (!startDate && !endDate) {
    filterParams.reservation = {
      none: {
        OR: [
          {
            startDate: {
              gt: endDate
            }
          },
          {
            endDate: {
              lt: startDate
            }
          }
        ]
      }
    };
  }

  const listings = await prisma.listing.findMany({
    skip: (Number(page) - 1) * Number(num),
    take: Number(num),
    where: filterParams,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          img: true,
          email: true
        }
      }
    }
  });

  const hasNextPage =
    (await prisma.listing.count({
      skip: Number(page) * Number(num),
      take: Number(num),
      where: filterParams
    })) > 0;

  return ExpoResponse.json({ listings, hasNextPage });
}

export async function POST(request: ExpoRequest) {
  const body = (await request.json()) as Listing;
  const {
    title,
    description,
    imgs,
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
      imgs,
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
