import { User } from '@prisma/client';
import { ExpoRequest } from 'expo-router/server';
import jwt from 'jsonwebtoken';

export default function getCurrentUser(request: ExpoRequest) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1] || '';
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { user: User };
    return payload.user;
  } catch (error) {
    throw Error('Invalid token');
  }
}
