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
    endDate: z.string()
  });
  const parsedRes = schema.safeParse(body);

  console.log(parsedRes);

  // TODO: middleware
  if (!parsedRes.success) {
    return new ExpoResponse(parsedRes.error.message, {
      status: 400
    });
  }

  const user = await getCurrentUser(request);
  const { listingId, startDate, endDate } = parsedRes.data;

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
          totalPrice: dayjs(endDate).diff(dayjs(startDate), 'day') * listing.price
        }
      }
    }
  });

  return ExpoResponse.json({ isSuccess: !!listingAndReservation });
}
