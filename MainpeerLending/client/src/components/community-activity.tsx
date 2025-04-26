import { CommunityActivity as CommunityActivityType } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { User, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface CommunityActivityProps {
  activities?: CommunityActivityType[];
  isLoading: boolean;
}

const CommunityActivity = ({ activities, isLoading }: CommunityActivityProps) => {
  // Fetch users for display names
  const { data: users } = useQuery({
    queryKey: ["/api/users"],
    enabled: false, // Disable this query as we don't have a /api/users endpoint in this demo
  });
  
  // Fetch loan opportunities for business names
  const { data: opportunities } = useQuery({
    queryKey: ["/api/loan-opportunities"],
  });
  
  // Get display name for a user (use initial if no name found)
  const getUserName = (userId?: number) => {
    if (!userId) return "Anonymous";
    
    // In a real app, we would look up the actual user
    const initials = ['A', 'J', 'M', 'S', 'R', 'K', 'T', 'L'];
    const names = ['Alex T.', 'Jamie L.', 'Morgan S.', 'Sarah K.', 'Robert W.', 'Kelly M.', 'Taylor B.', 'Logan P.'];
    
    return names[userId % names.length];
  };
  
  // Get business name for an opportunity
  const getBusinessName = (opportunityId?: number) => {
    if (!opportunityId) return "a business";
    
    const opportunity = opportunities?.find(o => o.id === opportunityId);
    return opportunity?.title || "a business";
  };
  
  // Format timestamp
  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return days === 1 ? "Yesterday" : `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return "Just now";
    }
  };
  
  // Format activity message
  const formatActivity = (activity: CommunityActivityType) => {
    const userName = getUserName(activity.userId);
    const businessName = getBusinessName(activity.opportunityId);
    const amount = activity.amount ? `$${parseFloat(activity.amount.toString()).toFixed(0)}` : "";
    
    switch (activity.activityType) {
      case "funded":
        return (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{userName}</span> funded{" "}
            <span className="font-medium text-gray-900">{amount}</span> to{" "}
            <span className="font-medium text-gray-900">{businessName}</span>
          </p>
        );
      case "funded_complete":
        return (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{businessName}</span> reached{" "}
            <span className="font-medium text-gray-900">100% funding</span> of their{" "}
            <span className="font-medium text-gray-900">{amount}</span> goal!
          </p>
        );
      case "repaid":
        return (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{businessName}</span> repaid{" "}
            <span className="font-medium text-gray-900">{amount}</span> to lenders
          </p>
        );
      default:
        return (
          <p className="text-sm text-gray-600">
            Activity related to <span className="font-medium text-gray-900">{businessName}</span>
          </p>
        );
    }
  };

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Community Activity</h2>
        <a href="#" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
          View all <span className="ml-1">→</span>
        </a>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="space-y-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex">
                <Skeleton className="h-10 w-10 rounded-full flex-shrink-0 mr-4" />
                <div className="flex-grow">
                  <Skeleton className="h-4 w-3/4 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))
          ) : activities && activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity.id} className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className={`h-10 w-10 rounded-full ${
                    activity.activityType === "funded_complete" 
                      ? "bg-green-500 text-white" 
                      : "bg-gray-200 text-gray-600"
                  } flex items-center justify-center`}>
                    {activity.activityType === "funded_complete" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </div>
                </div>
                <div>
                  {formatActivity(activity)}
                  <p className="text-xs text-gray-500 mt-1">{formatTime(activity.createdAt)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>No community activity to display yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityActivity;
