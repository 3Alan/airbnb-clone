import { ExpoResponse } from 'expo-router/server';

import listings from '@/data/airbnb-listings.json';

export function GET() {
  return ExpoResponse.json({
    listings: listings.map(item => ({
      id: item.id,
      name: item.name,
      thumbnail_url: item.thumbnail_url
    }))
  });
}
