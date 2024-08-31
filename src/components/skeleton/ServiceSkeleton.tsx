import { Card, Skeleton } from "@nextui-org/react";
import { FC } from "react";

type TServiceSkeletonProps = {
  itemsCount?: number;
};

const ServiceSkeleton: FC<TServiceSkeletonProps> = ({ itemsCount = 9 }) => {
  return (
    <div>
      <div className="p-4">
        <Skeleton className="w-[200px] rounded-lg mb-10">
          <div className="h-8 w-[200px] rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <div className=" flex items-center justify-center gap-3 -mt-3">
        <Skeleton className="w-[400px] rounded-lg">
          <div className="h-10 w-[400px] rounded-lg bg-default-300"></div>
        </Skeleton>
        <Skeleton className="w-[80px] rounded-lg">
          <div className="h-10 w-[80px] rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
      <div className="flex flex-row gap-3 justify-between mb-4 mt-10">
        <div className="flex flex-col justify-start gap-5">
          <div className="flex flex-col md:flex-row items-center justify-start gap-4">
            <Skeleton className="w-[200px] rounded-lg ">
              <div className="h-10 w-[200px] rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-[200px] rounded-lg ">
              <div className="h-10 w-[200px] rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
          <div className="flex items-center justify-start gap-3">
            <Skeleton className="w-[80px] rounded-lg mb-10">
              <div className="h-8 w-[60px] rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-[80px] rounded-lg mb-10">
              <div className="h-8 w-[60px] rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </div>

        <div>
          <Skeleton className="w-[50px] rounded-lg">
            <div className="h-6 w-[50px] rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(itemsCount)].map((_, index) => (
          <Card key={index} className="w-full space-y-5 h-[440px]" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-48 rounded-lg bg-default-300"></div>
            </Skeleton>
            <div className="space-y-3 p-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
              </Skeleton>
              <div className="flex justify-between gap-3 mt-12">
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-8 w-2/4 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-8 w-2/4 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
              <div className="flex justify-between gap-3 mt-10">
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-10 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-10 w-2/5 rounded-lg bg-default-300"></div>
                </Skeleton>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceSkeleton;
