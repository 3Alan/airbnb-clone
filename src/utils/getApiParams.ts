import { ExpoRequest } from 'expo-router/server';
import qs from 'qs';

export default function getApiParams(request: ExpoRequest) {
  return qs.parse(request.expoUrl.searchParams.toString());
}
