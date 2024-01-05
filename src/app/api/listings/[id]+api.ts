import { ExpoRequest, ExpoResponse } from 'expo-router/server';

import listingData from '@/data/airbnb-listings.json';

export function GET(_request: ExpoRequest, { id }: { id: string }) {
  const listingDetail = listingData.find(item => item.id === id);

  return ExpoResponse.json(listingDetail);
}
