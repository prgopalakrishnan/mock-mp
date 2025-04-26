import { EducationalResource } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";

interface EducationalContentProps {
  resources?: EducationalResource[];
  isLoading: boolean;
}

const EducationalContent = ({ resources, isLoading }: EducationalContentProps) => {
  // Resource type badge style helper
  const getResourceTypeStyle = (type: string) => {
    switch (type) {
      case "guide":
        return "bg-primary-100 text-primary-800";
      case "video":
        return "bg-green-100 text-green-800";
      case "case_study":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Resource type name helper
  const getResourceTypeName = (type: string) => {
    switch (type) {
      case "guide":
        return "Guide";
      case "video":
        return "Video";
      case "case_study":
        return "Case Study";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  // Resource link text helper
  const getResourceActionText = (type: string) => {
    switch (type) {
      case "guide":
        return "Read article";
      case "video":
        return "Watch video";
      case "case_study":
        return "Read case study";
      default:
        return "Learn more";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Learning Resources</h2>
        <a href="#" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
          View all <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <Skeleton className="h-40 w-full" />
              <div className="p-6">
                <Skeleton className="h-5 w-24 rounded-full mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
          ))
        ) : resources && resources.length > 0 ? (
          resources.map((resource) => (
            <div key={resource.id} className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
              <div className="h-40 bg-gray-200">
                <img 
                  src={resource.imageUrl} 
                  alt={resource.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className={`inline-block ${getResourceTypeStyle(resource.resourceType)} text-xs px-2 py-1 rounded-full mb-2`}>
                  {getResourceTypeName(resource.resourceType)}
                </span>
                <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                <a href={resource.link} className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
                  {getResourceActionText(resource.resourceType)} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500 py-8">
            <p>No learning resources available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationalContent;
