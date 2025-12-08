import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function OurProductsSkeleton() {
  return (
    <section className="min-h-screen w-full mx-auto main-wrapper">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card className="" key={index}>
            <CardContent className="aspect-square flex flex-col gap-3 p-0">
              <Skeleton className="w-full h-[150px] md:h-[280px] lg:h-[400px] rounded-none" />
              <div className="space-y-2">
                <Skeleton className="h-4 md:h-6 w-full rounded-none" />
                <Skeleton className="h-2 md:h-4 w-3/4 rounded-none" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
