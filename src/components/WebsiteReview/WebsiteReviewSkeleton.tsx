import { Skeleton } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { FC } from "react";

type TWebsiteReviewSkeletonProps = object;

const WebsiteReviewSkeleton: FC<TWebsiteReviewSkeletonProps> = () => {
  const { theme } = useTheme();

  const skeletonColor = theme === "dark" ? "" : "";

  return (
    <div className={`min-h-screen mt-2 ${skeletonColor}`}>
      <div className="mb-4 flex items-center justify-between mt-5">
        <Skeleton className="w-[120px] h-[20px] rounded-xl" />
        <Skeleton className="w-[80px] h-[40px] rounded-xl" />
      </div>

      <Skeleton className="w-[250px] h-5 rounded-xl mt-3" />
      <div className="flex flex-col md:flex-row items-start justify-between gap-5 w-full">
        <div
          className={`flex flex-col gap-3 w-full border rounded-md p-3 mt-5 ${
            theme === "dark" ? "border-gray-100 border-opacity-15" : ""
          }`}
        >
          <div className="flex gap-5 items-center">
            <Skeleton className="w-16 h-16 rounded-full object-cover" />
            <div className="flex flex-col gap-3 w-full">
              <Skeleton className="w-[230px] h-4 rounded-xl" />
              <Skeleton className="w-[200px] h-4 rounded-xl" />
            </div>
          </div>
          <Skeleton className="w-10/12 h-3 rounded-xl" />
          <div className="flex justify-between items-center gap-3 w-full mt-3">
            <Skeleton className="w-[100px] h-[15px] rounded-full" />
            <Skeleton className="w-[100px] h-[15px] rounded-full" />
          </div>
        </div>
        <div
          className={`flex flex-col gap-3 w-full border rounded-md p-3 mt-5 ${
            theme === "dark" ? "border-gray-100 border-opacity-15" : ""
          }`}
        >
          <div className="flex gap-5 items-center">
            <Skeleton className="w-16 h-16 rounded-full object-cover" />
            <div className="flex flex-col gap-3 w-full">
              <Skeleton className="w-[230px] h-4 rounded-xl" />
              <Skeleton className="w-[200px] h-4 rounded-xl" />
            </div>
          </div>
          <Skeleton className="w-10/12 h-3 rounded-xl" />
          <div className="flex justify-between items-center gap-3 w-full mt-3">
            <Skeleton className="w-[100px] h-[15px] rounded-full" />
            <Skeleton className="w-[100px] h-[15px] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteReviewSkeleton;
