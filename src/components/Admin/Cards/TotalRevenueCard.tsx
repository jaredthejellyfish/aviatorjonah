import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import stripe from "@/utils/stripe";
import { Skeleton } from "@/components/ui/skeleton";

async function getMonthlyRevenue(year: number, month: number) {
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

  return total / 100; // Returns revenue in whole dollars
}

export default async function TotalRevenue() {
  // Determine current month and year
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // getMonth() is 0-based

  // Determine last month’s year and month (accounting for January)
  let lastMonth = currentMonth - 1;
  let lastMonthYear = currentYear;
  if (lastMonth === 0) {
    lastMonth = 12;
    lastMonthYear = currentYear - 1;
  }

  // Fetch current month and last month revenue
  const [currentMonthRevenue, lastMonthRevenue] = await Promise.all([
    getMonthlyRevenue(currentYear, currentMonth),
    getMonthlyRevenue(lastMonthYear, lastMonth),
  ]);

  // Calculate growth percentage
  const growthPercentage =
    lastMonthRevenue === 0
      ? 100
      : ((currentMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;

  // Format revenue as a currency string
  const currentRevenueFormatted = currentMonthRevenue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  // Format growth percentage (e.g., +20.1%)
  const growthFormatted = `${growthPercentage > 0 ? "+" : ""}${growthPercentage.toFixed(1)}%`;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{currentRevenueFormatted}</div>
        <p className="text-xs text-muted-foreground">{growthFormatted} from last month</p>
      </CardContent>
    </Card>
  );
}

export function TotalRevenueSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 mb-2 w-24" />
        <Skeleton className="h-4 w-32" />
      </CardContent>
    </Card>
  )
}
