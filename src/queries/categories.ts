import { Category } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

import request from '@/utils/request';

export const fetchCategories = async () => {
  const res = await request('/categories');
  return [{ name: '全部', icon: 'home-outline' }, ...res.data] as Category[];
};

export default function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    placeholderData: []
  });
}
