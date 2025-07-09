import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  totalShifts: number;
  thisMonth: string;
  totalRevenue: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  totalShifts,
  thisMonth,
  totalRevenue,
}) => {
  return (
    <div className="flex flex-col gap-4 py-4 sm:flex-row sm:flex-wrap sm:justify-center">
      <Card className="flex-1 min-w-[220px] max-w-[300px] mx-auto sm:mx-0">
        <CardContent>
          <div className="font-bold text-xl">Total Shifts</div>
          <div className="text-2xl font-semibold">{totalShifts}</div>
        </CardContent>
      </Card>
      <Card className="flex-1 min-w-[220px] max-w-[300px] mx-auto sm:mx-0">
        <CardContent>
          <div className="font-bold text-xl">This Month</div>
          <div className="text-2xl font-semibold text-green-500">
            {thisMonth}
          </div>
        </CardContent>
      </Card>
      <Card className="flex-1 min-w-[220px] max-w-[300px] mx-auto sm:mx-0">
        <CardContent>
          <div className="font-bold text-xl">Total Revenue</div>
          <div className="text-2xl font-bold text-blue-600">
            £{totalRevenue.toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
