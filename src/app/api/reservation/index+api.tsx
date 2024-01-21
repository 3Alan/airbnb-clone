import dayjs from 'dayjs';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { z } from 'zod';

import prisma from '@/server/db';
import getCurrentUser from '@/utils/getCurrentUser';

export async function POST(request: ExpoRequest) {
  const body = await request.json();

  const schema = z.object({
    listingId: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    guestCount: z.number()
  });
  const parsedRes = schema.safeParse(body);

  // TODO: middleware
  if (!parsedRes.success) {
    return new ExpoResponse(parsedRes.error.message, {
      status: 400
    });
  }

  const user = await getCurrentUser(request);
  const { listingId, startDate, endDate, guestCount } = parsedRes.data;

  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId
    }
  });

  if (!listing) {
    return new ExpoResponse('Listing not found', {
      status: 500
    });
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: {
      reservation: {
        create: {
          userId: user.id,
          startDate,
          endDate,
          guestCount,
          totalPrice: dayjs(endDate).diff(dayjs(startDate), 'day') * listing.price
        }
      }
    }
  });

  return ExpoResponse.json({ isSuccess: !!listingAndReservation });
}

export async function GET(request: ExpoRequest) {
  const user = await getCurrentUser(request);

  const result = await prisma.reservation.findMany({
    where: {
      userId: user.id
    },
    include: {
      listing: {
        select: {
          imgs: true,
          title: true,
          user: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });

  // TODO: graphql 可以解决这种问题？
  const reservationList = result.map(item => ({
    ...item,
    title: item.listing.title,
    listingImg: item.listing.imgs[0],
    hostName: item.listing.user.name
  }));

  return ExpoResponse.json(reservationList);
}
