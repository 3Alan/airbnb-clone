import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';

import prisma from '@/server/db';

export async function POST(request: ExpoRequest) {
  const body = (await request.json()) as User;
  const { email, password, name } = body;
  const hashPassword = bcrypt.hashSync(password, 8);

  const user = await prisma.user.create({
    data: {
      name: name || '旅行家',
      email,
      password: hashPassword
    }
  });

  return ExpoResponse.json({ user });
}
