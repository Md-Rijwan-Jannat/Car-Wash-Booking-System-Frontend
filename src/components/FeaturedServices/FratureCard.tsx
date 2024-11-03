// FeatureCard.tsx
import { FC } from 'react';
import { Chip } from '@nextui-org/react';
import { motion } from 'framer-motion';
import { FaDollarSign, FaClock } from 'react-icons/fa6';
import { TService } from '../../types';

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
    className={`rounded-xl overflow-hidden w-full h-[325px] cursor-pointer my-5 ${
      theme === 'dark'
        ? 'bg-blend-darken text-white border border-gray-50 border-opacity-15'
        : 'bg-white text-gray-900 border'
    }`}
  >
    <img
      src={service.image}
      alt={service.name}
      className="w-full h-[170px] object-cover"
    />
    <div className="p-4 relative">
      <h3 className="text-lg font-semibold">{service.name}</h3>
      <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
      <div className="flex justify-between items-center gap-3 absolute inset-0 mt-[130px] px-2 w-full">
        <Chip
          startContent={<FaDollarSign size={18} />}
          variant="flat"
          size="md"
          color="default"
        >
          <p>{service.price}</p>
        </Chip>
        <Chip
          startContent={<FaClock size={18} />}
          variant="flat"
          color="warning"
        >
          <p>{service.duration} minutes</p>
        </Chip>
      </div>
    </div>
  </motion.div>
);

export default FeatureCard;