// FeatureCard.tsx
import { FC } from 'react';
import { Chip } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { FaDollarSign } from 'react-icons/fa6';
import { TService } from '../../types';
import { ImFire } from 'react-icons/im';

interface FeatureCardProps {
  service: TService;
  onClick: () => void;
  theme: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ service, onClick, theme }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
    onClick={onClick}
    className={`rounded overflow-hidden w-full h-[240px] md:h-[300px] hover:shadow-lg transition-shadow duration-300 cursor-pointer text-center transform mb-4 ${
      theme === 'dark'
        ? 'bg-blend-darken text-white border border-gray-50 border-opacity-15'
        : 'bg-white text-gray-900 border'
    }`}
  >
    <img
      src={service.image}
      alt={service.name}
      className="w-full h-[100px] md:h-[140px] object-cover"
    />
    <div className="text-start md:p-4 relative">
      <h3 className="text-sm md:text-lg font-semibold">{service.name}</h3>
      <p className="text-xs md:text-sm text-default-600 dark:text-gray-400">
        {service.description}
      </p>
      <div className="flex justify-between items-center gap-1 px-1 md:gap-3 absolute inset-0 mt-[95px] md:mt-[120px] md:px-2 w-full">
        <Chip
          startContent={<FaDollarSign size={18} />}
          variant="flat"
          size="md"
          color="default"
        >
          <p>{service.price}</p>
        </Chip>
        <Chip
          startContent={<ImFire className="text-warning-500" size={18} />}
          variant="flat"
          color="warning"
        >
          Trending
        </Chip>
      </div>
    </div>
  </motion.div>
);

export default FeatureCard;
