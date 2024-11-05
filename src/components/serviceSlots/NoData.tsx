import { FC } from 'react';
import { TbHourglassEmpty } from 'react-icons/tb';

type TNoDataProps = { text: string };

const NoData: FC<TNoDataProps> = ({ text }) => {
  return (
    <div className="flex justify-center items-center h-[300px] lg:h-[70vh]">
      <h1
        className={`bg-default-50 px-5 text-default-700 py-2 text-sm rounded-full flex-col md:flex-row flex items-center justify-between ga-3`}
      >
        {text}
        <TbHourglassEmpty className="text-warning size-5 animate-pulse ml-2" />
      </h1>
    </div>
  );
};

export default NoData;
