import SectionTitle from '../../components/ui/SectionTitle';
import { motion } from 'framer-motion';

const PricingSection = () => {
  const plans = [
    {
      title: 'Standard',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit utelit tellus.',
      price: '$19.90',
      services: [
        { name: 'Carpet Wash Service', available: true },
        { name: 'Wheel Service', available: true },
        { name: 'Glass Wash Service', available: true },
        { name: 'Steering Service', available: true },
        { name: 'Interiors VAC Service', available: false },
        { name: 'Fuel Service', available: false },
      ],
      buttonColor: '', // Using your primary color for the button background
    },
    {
      title: 'Premium',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit utelit tellus.',
      price: '$29.90',
      services: [
        { name: 'Carpet Wash Service', available: true },
        { name: 'Wheel Service', available: true },
        { name: 'Glass Wash Service', available: true },
        { name: 'Steering Service', available: true },
        { name: 'Interiors VAC Service', available: true },
        { name: 'Fuel Service', available: false },
      ],
      buttonColor: 'bg-warning', // Using warning color for the button background
    },
    {
      title: 'Enterprise',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit utelit tellus.',
      price: '$59.90',
      services: [
        { name: 'Carpet Wash Service', available: true },
        { name: 'Wheel Service', available: true },
        { name: 'Glass Wash Service', available: true },
        { name: 'Steering Service', available: true },
        { name: 'Interiors VAC Service', available: true },
        { name: 'Full Service', available: true },
      ],
      buttonColor: '', // Using primary color for the button background
    },
  ];

  return (
    <section className="">
      <SectionTitle
        subHeader="Our Pricing"
        header="Flexible Pricing Plans"
        des=" Choose a plan that fits your needs and budget. Whether you need a quick wash or a full service."
      />
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-lg p-6 w-full md:w-1/3 ${
              plan.title === 'Premium'
                ? 'bg-default-100 text-default-900 h-[450px]'
                : 'bg-default-50 text-default-700 h-[400px]'
            }`}
          >
            <h4
              className={`text-lg font-bold ${
                plan.title === 'Premium' ? 'text-warning' : 'text-primaryColor'
              }`}
            >
              {plan.title}
            </h4>
            <p className="mt-2 text-sm">{plan.description}</p>
            <div className="my-4 border-t border-gray-300"></div>
            <ul className="mb-6">
              {plan.services.map((service, i) => (
                <li
                  key={i}
                  className={`flex items-center text-sm ${
                    service.available
                      ? 'text-primaryColor'
                      : 'text-gray-400 line-through'
                  }`}
                >
                  <span className="mr-2">{service.available ? '✔' : '✘'}</span>{' '}
                  {service.name}
                </li>
              ))}
            </ul>
            <div className="text-2xl font-bold mb-4">
              {plan.price}/<span className="text-base">Service</span>
            </div>
            <motion.button
              className={`w-full py-2 rounded-full ${
                plan.buttonColor
                  ? `${plan.buttonColor} text-white mt-10`
                  : 'bg-transparent text-default-900 border border-warning hover:bg-warning hover:text-white'
              }  hover:opacity-90 transition-all duration-600`}
            >
              Booking Now
            </motion.button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
