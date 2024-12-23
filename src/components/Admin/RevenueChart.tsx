import stripe from "@/utils/stripe";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { unstable_cache as cache } from "next/cache";

const RevenueChartContent = dynamic(() => import("./RevenueChartContent"));

const getMonthlyRevenue = cache(
  async (year: number, month: number) => {
    const startDate = Math.floor(new Date(year, month - 1, 1).getTime() / 1000);
    const endDate = Math.floor(new Date(year, month, 1).getTime() / 1000);

    let total = 0;
    const charges = stripe.charges.list({
      created: {
        gte: startDate,
        lt: endDate,
      },
      limit: 1000,
    });

    await charges.autoPagingEach((charge) => {
      total += charge.amount;
    });

    return total / 100;
  },
  ["monthly-revenue"],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ["revenue"],
  },
);

export default async function RevenueChart() {
  // Dynamically determine the current year:
  const currentYear = new Date().getFullYear();

  // Dynamically generate month data:
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // If you want data for all 12 months of the current year:
  const months = monthNames.map((name, index) => ({ name, month: index + 1 }));

  // Fetch revenue for each month in parallel
  const data = await Promise.all(
    months.map(async ({ name, month }) => {
      const total = await getMonthlyRevenue(currentYear, month);
      return { name, total };
    }),
  );

  return (
    <Suspense fallback={<RevenueChartSkeleton />}>
      <RevenueChartContent monthlyRevenue={data} />
    </Suspense>
  );
}

export const RevenueChartSkeleton = () => {
  return <Skeleton className="h-[370px] w-full" />;
};
