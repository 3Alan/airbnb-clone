import { ExpoResponse } from 'expo-router/server';

import { prisma } from '@/db';

export async function GET() {
  const categoryList = await prisma.category.findMany();

  return ExpoResponse.json(categoryList);
}
