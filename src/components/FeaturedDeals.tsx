import DealsList from '@/app/DealsList';
import { Category } from '@/types/Category';
import { getXataClient } from '@/xata';
import React from 'react';

export default async function FeaturedDeals({
  category,
}: {
  category: Category;
}) {
  const xataClient = getXataClient();
  const deals = await xataClient.db.deals
    .filter({ approved: true, featured: true, category })
    .sort('xata.createdAt', 'desc')
    .getMany({
      pagination: {
        size: 3,
      },
    });
  return (
    <div>
      <h2 className="text-4xl font-bold mb-6 text-gray-100 ">
        Featured <span className="text-teal-500">{category}</span> Deals
      </h2>
      <DealsList deals={deals} />
    </div>
  );
}
