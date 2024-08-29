import { useTheme } from "next-themes";
import { FC } from "react";
import { TbHourglassEmpty } from "react-icons/tb";

type TNoDataProps = { text: string };

const NoData: FC<TNoDataProps> = ({ text }) => {
  const { theme } = useTheme();
  return (
    <div className="flex justify-center items-center h-[100px]">
      <h1
        className={`bg-gray-200 px-5 text-gray-500 py-2 rounded-full flex items-center justify-between ga-3 ${
          theme === "dark" ? "bg-opacity-10" : ""
        }`}
      >
        {text}
        <TbHourglassEmpty className="text-warning size-5 animate-pulse ml-2" />
      </h1>
    </div>
  );
};

export default NoData;
