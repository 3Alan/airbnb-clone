import { ExpoRequest, ExpoResponse } from 'expo-router/server';

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
      wishItems: true
    }
  });

  // const result = await prisma.wishList.findMany({
  //   where: {
  //     userId: user.id
  //   },
  //   include: {
  //     wishItem: {
  //       include: {

  //       }
  //     }
  //   },
  // });

  return ExpoResponse.json(result);
}
