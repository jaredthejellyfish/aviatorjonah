import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import stripe from "@/utils/stripe";
import { UserIcon } from "lucide-react";

export default async function RecentSalesWidget() {

    const getMostRecentSales = async () => {
        const response = await stripe.charges.list({
            limit: 6,
        });
        return response.data
    }

    const sales = await getMostRecentSales()

  return (
    <div className="space-y-8">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={''}
              alt={sale.customer?.toString()}
            />
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.billing_details?.email}</p>
            <p className="text-sm text-muted-foreground"></p>
          </div>
          <div className="ml-auto font-medium">
            ${sale.amount / 100}
          </div>
        </div>
      ))}
    </div>
  );
}
