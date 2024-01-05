import { ListingItem } from '../interface/Listing';

import listingData from '@/data/airbnb-listings.json';

export const getDetail = (id: string): ListingItem => {
  const data = listingData.find(item => item.id === id);
  return data as ListingItem;
};
