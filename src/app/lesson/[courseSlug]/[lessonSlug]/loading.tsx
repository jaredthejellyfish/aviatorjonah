import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export default function CourseLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[300px_1fr_250px]">
      {/* Sidebar skeleton */}
      <div className="hidden md:block md:h-[calc(100vh-64px)] border-r border-border bg-background">
        <div className="h-16 border-b border-border p-4">
          <Skeleton className="h-8 w-3/4" />
        </div>
        <div className="flex flex-col">
          <div className="h-16 border-b border-border flex flex-col justify-center p-2">
            <div className="flex flex-row gap-4 bg-neutral-700/20 p-2 rounded-lg">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="w-full !max-w-none md:px-10 px-4 py-5">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>

      {/* Sections skeleton */}
      <div className="fixed top-16 right-2 p-4 w-[300px] hidden lg:block translate-x-5">
        <div className="relative mx-auto h-[calc(100vh-6rem)] overflow-y-auto  bg-white dark:bg-black rounded-xl ">
          <nav className="flex flex-row">
            <div className="flex flex-col space-y-2 pb-4 px-4 py-2">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
              >
                <X className="w-4 h-4" />
              </Button>
              <p className="font-semibold text-sm text-muted-foreground mb-2">
                ON THIS PAGE
              </p>
              {[...Array(5)].map((section, index) => (
                <button
                  key={section + "-section" + index}
                  className={cn(
                    "text-sm text-left transition-colors rounded-md truncate max-w-[230px]",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  )}
                >
                  <Skeleton className="h-8 w-[230px]" />
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
