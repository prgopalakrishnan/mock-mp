import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatisticCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: string;
  trendPositive?: boolean;
  description?: string;
}

const StatisticCard = ({
  title,
  value,
  icon,
  trend,
  trendPositive,
  description,
}: StatisticCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="bg-primary/10 rounded-full p-2">
          <div className="text-primary h-5 w-5">{icon}</div>
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {trend && (
        <p className={cn(
          "text-sm flex items-center mt-2",
          trendPositive ? "text-green-600" : "text-red-600"
        )}>
          <span className="mr-1">
            {trendPositive ? "↑" : "↓"}
          </span> 
          {trend}
        </p>
      )}
      {description && !trend && (
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      )}
    </div>
  );
};

export default StatisticCard;
