import listingData from '../../assets/data/airbnb-listings.json';
import { ListingItem } from '../interface/Listing';

export const getDetail = (id: string): ListingItem => {
  const data = listingData.find(item => item.id === id);
  return data as ListingItem;
};
