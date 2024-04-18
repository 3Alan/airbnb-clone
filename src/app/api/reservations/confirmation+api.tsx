import dayjs from 'dayjs';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { z } from 'zod';

import prisma from '@/server/db';
import getApiParams from '@/utils/getApiParams';

export async function GET(request: ExpoRequest) {
  const params = getApiParams(request);

  const schema = z.object({
    listingId: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    guestCount: z.string()
  });
  const parsedRes = schema.safeParse(params);

  // TODO: middleware
  if (!parsedRes.success) {
    return new ExpoResponse(parsedRes.error.message, {
      status: 400
    });
  }

  const { listingId, startDate, endDate } = parsedRes.data;

  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId
    },
    select: {
      price: true,
      imgs: true,
      title: true
    }
  });

  if (!listing) {
    return new ExpoResponse('Listing not found', {
      status: 500
    });
  }

  return ExpoResponse.json({
    ...parsedRes.data,
    ...listing,
    totalPrice: listing.price * dayjs(endDate).diff(dayjs(startDate), 'day')
  });
}
