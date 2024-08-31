import { FC } from "react";
import { Button, Card, Chip } from "@nextui-org/react";
import { TService } from "../../types";
import { useTheme } from "next-themes";
import { FaClock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  service: TService;
}

const ServiceCard: FC<ServiceCardProps> = ({ service }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleServiceDetails = () => {
    navigate(`/service-details/${service._id}`);
  };
  return (
    <Card
      className={`overflow-hidden h-[440px] border ${
        theme === "dark" ? "border-gray-100 border-opacity-15" : ""
      }`}
    >
      <img
        src={service.image}
        alt={service.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 relative">
        <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="mt-5 absolute inset-0 top-[120px] z-20 px-4">
          <div className="flex justify-between items-center">
            <Chip color="warning" variant="flat">
              <p className="text-sm flex items-center gap-2">
                <FaClock size={16} className="mb-0.5" /> {service.duration}{" "}
                minutes
              </p>
            </Chip>
            <Chip>
              <p className="text-lg font-bold text-primaryColor">
                ৳{service.price.toFixed(2)}
              </p>
            </Chip>
          </div>
          <div className="mt-5 flex items-center justify-center gap-3 w-full">
            <Button
              onClick={handleServiceDetails}
              color="warning"
              variant="ghost"
            >
              View details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
