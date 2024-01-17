import bcrypt from 'bcryptjs';
import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

import prisma from '@/server/db';

// console.log(
//   jwt.verify(request.headers.get('Authorization')?.split(' ')[1], process.env.JWT_SECRET)
// );

export async function POST(request: ExpoRequest) {
  const body = await request.json();
  const schema = z.object({
    email: z.string().email(),
    password: z.string()
  });
  const parsedRes = schema.safeParse(body);

  if (!parsedRes.success) {
    return new ExpoResponse(parsedRes.error.message, {
      status: 400
    });
  }

  const { email, password } = parsedRes.data;

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    return ExpoResponse.json({ message: '登录信息无效', success: false });
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);
  if (!isValidPassword) {
    return ExpoResponse.json({ message: '登录信息无效', success: false });
  }
  const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: '7d'
  });

  return ExpoResponse.json({ user, token, success: true });
}
