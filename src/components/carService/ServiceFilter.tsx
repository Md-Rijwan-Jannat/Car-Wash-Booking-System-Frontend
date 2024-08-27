import { FC } from "react";
import {
  Input,
  Dropdown,
  DropdownTrigger,
  Chip,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FaFilter } from "react-icons/fa";

interface ServiceFilterProps {
  sortItem: string;
  setSortItem: (sortItem: string) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  filterSearchTerm: string; // Add this prop
  maxPrice: string;
  setMaxPrice: (maxPrice: string) => void;
  minPrice: string;
  setMinPrice: (minPrice: string) => void;
  onApplyFilter: () => void;
  onResetFilter: () => void;
}

const ServiceFilter: FC<ServiceFilterProps> = ({
  setSortItem,
  searchTerm,
  setSearchTerm,
  maxPrice,
  setMaxPrice,
  minPrice,
  setMinPrice,
  onApplyFilter,
  onResetFilter,
}) => {
  const handleItemClick = (key: string) => setSortItem(key);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center gap-3 mb-10">
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target?.value)}
          className="w-[400px]"
          aria-label="Search services"
        />
        <Button color="warning" variant="flat" onClick={onApplyFilter}>
          Search
        </Button>
      </div>

      <div className="flex flex-row gap-3 justify-between items-center mb-4">
        <div className="flex flex-col justify-start gap-5">
          <div className="flex flex-col md:flex-row items-center justify-start gap-4">
            <Input
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-[200px] mr-2"
              type="number"
            />
            <Input
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-[200px] mr-4"
              type="number"
            />
          </div>
          <div className="flex items-center justify-start gap-3">
            <Button size="sm" onClick={onApplyFilter}>
              Apply Filter
            </Button>
            <Button size="sm" className="text-red-500" onClick={onResetFilter}>
              Reset
            </Button>
          </div>
        </div>

        <Dropdown>
          <DropdownTrigger>
            <Chip
              variant="flat"
              color="default"
              endContent={<FaFilter size={14} />}
            >
              Filter
            </Chip>
          </DropdownTrigger>
          <DropdownMenu aria-label="Filter options" selectionMode="single">
            <DropdownItem
              key="createdAt"
              onClick={() => handleItemClick("createdAt")}
            >
              New
            </DropdownItem>
            <DropdownItem
              key="-createdAt"
              onClick={() => handleItemClick("-createdAt")}
            >
              Old
            </DropdownItem>
            <DropdownItem
              key="-price"
              onClick={() => handleItemClick("-price")}
            >
              Price (High to low)
            </DropdownItem>
            <DropdownItem key="price" onClick={() => handleItemClick("price")}>
              Price (Low to high)
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default ServiceFilter;
