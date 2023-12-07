import { ListingItem } from '../interface/Listing';

export default function getPriceInfo(item: ListingItem) {
  if (item.price) {
    return {
      price: item.price,
      unit: '晚'
    };
  }

  if (item.weekly_price) {
    return {
      price: item.weekly_price,
      unit: '周'
    };
  }

  return {
    price: item.monthly_price,
    unit: '月'
  };
}
