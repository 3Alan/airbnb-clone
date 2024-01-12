import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import jwt from 'jsonwebtoken';

import prisma from '@/server/db';

export async function POST(request: ExpoRequest) {
  const body = (await request.json()) as User;
  const { email, password } = body;

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    return new ExpoResponse('Unauthorized', {
      status: 401
    });
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    return new ExpoResponse('Unauthorized', {
      status: 401
    });
  }
  const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: '7d'
  });

  return ExpoResponse.json({ user, token });
}
