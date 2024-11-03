import React from "react";
import { motion } from "framer-motion";
import { Button, Chip } from "@nextui-org/react";
import { useTheme } from "next-themes";

const plans = [
  {
    name: "Basic Wash",
    price: "৳850", // Updated to BDT
    features: ["Exterior Wash", "Tire Shine", "Quick Dry"],
  },
  {
    name: "Premium Wash",
    price: "৳1,700", // Updated to BDT
    features: ["Exterior Wash", "Interior Vacuum", "Tire Shine", "Wax Finish"],
  },
  {
    name: "Ultimate Wash",
    price: "৳2,550", // Updated to BDT
    features: [
      "Exterior & Interior Cleaning",
      "Engine Detailing",
      "Tire Shine",
      "Wax Finish",
    ],
  },
];

const PricingPlans: React.FC = () => {
  const { theme } = useTheme();
  return (
    <motion.section
      className="py-12 rounded-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Chip size="lg" variant="bordered" className="text-xl">
        Pricing Plans
      </Chip>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-5">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`bg-gray-50 p-6 rounded-lg border hover:shadow transition-shadow duration-300 text-center inset-0 relative h-[300px] ${
              theme === "dark"
                ? "bg-opacity-5 border-gray-100 border-opacity-15"
                : ""
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-bold text-warning mb-3">{plan.name}</h3>
            <Chip color="warning" variant="faded" size="lg">
              {plan.price}
            </Chip>
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className={`text-default-500`}>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-center">
              <Button
                variant="faded"
                color="warning"
                size="sm"
                className="mt-7 absolute z-10 bottom-3"
              >
                Choose Plan
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default PricingPlans;
