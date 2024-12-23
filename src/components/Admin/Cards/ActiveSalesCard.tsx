import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart } from "lucide-react";
import stripe from "@/utils/stripe";

import { unstable_cache as cache } from "next/cache";

const countMonthlyTransactions = cache(
  async (year: number, month: number) => {
    const startDate = Math.floor(new Date(year, month - 1, 1).getTime() / 1000);
    const endDate = Math.floor(new Date(year, month, 1).getTime() / 1000);

    let count = 0;
    const charges = await stripe.charges.list({
      created: {
        gte: startDate,
        lt: endDate,
      },
      limit: 1000,
    });

    charges.data.forEach(() => {
      count += 1;
    });

    return count;
  },
  ["monthly-transactions"],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ["stripe-transactions"],
  },
);

async function getMonthlyStats() {
  const now = new Date();
  const thisMonth = now.getMonth() + 1;
  const thisYear = now.getFullYear();

  // Handle previous month (accounting for year change)
  const lastMonth = thisMonth === 1 ? 12 : thisMonth - 1;
  const lastMonthYear = thisMonth === 1 ? thisYear - 1 : thisYear;

  const thisMonthCount = await countMonthlyTransactions(thisYear, thisMonth);
  const lastMonthCount = await countMonthlyTransactions(
    lastMonthYear,
    lastMonth,
  );

  const percentChange =
    lastMonthCount === 0
      ? 100
      : ((thisMonthCount - lastMonthCount) / lastMonthCount) * 100;

  return {
    currentCount: thisMonthCount,
    percentChange: Math.round(percentChange),
  };
}

export async function ActiveSalesCard() {
  const { currentCount, percentChange } = await getMonthlyStats();
  const changeText =
    percentChange >= 0 ? `+${percentChange}%` : `${percentChange}%`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Sales</CardTitle>
        <BarChart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{currentCount}</div>
        <p className="text-xs text-muted-foreground">
          {changeText} from last month
        </p>
      </CardContent>
    </Card>
  );
}

export function ActiveSalesCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Sales</CardTitle>
        <BarChart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 mb-2 w-24" />
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  );
}
