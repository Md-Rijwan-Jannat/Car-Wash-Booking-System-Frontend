import { FC, useState, useEffect } from "react";
import { useGetAllServicesQuery } from "../../redux/features/admin/serviceManagementApi";
import { Chip, Pagination } from "@nextui-org/react";
import ServiceFilter from "../../components/carService/ServiceFilter";
import ServiceCard from "../../components/carService/ServiceCard";
import { TMeta, TService } from "../../types";
import { useTheme } from "next-themes";
import ServiceSkeleton from "../../components/skeleton/ServiceSkeleton";

const Services: FC = () => {
  const [sortItem, setSortItem] = useState("price");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSearchTerm, setFilterSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [page, setPage] = useState(1);
  const { theme } = useTheme();

  const queryParams: Record<string, string> = {
    sort: sortItem,
    limit: "9",
    page: page.toString(),
  };

  if (filterSearchTerm) queryParams.searchTerm = filterSearchTerm;

  const { data: servicesData, isLoading } = useGetAllServicesQuery(queryParams);
  const services = servicesData?.data as TService[];
  const meta = servicesData?.meta as TMeta;

  const [filteredServices, setFilteredServices] =
    useState<TService[]>(services);

  useEffect(() => {
    if (services?.length > 0) {
      const filtered = services?.filter((service) => {
        const servicePrice = service.price;
        const isAboveMinPrice = minPrice
          ? servicePrice >= parseFloat(minPrice)
          : true;
        const isBelowMaxPrice = maxPrice
          ? servicePrice <= parseFloat(maxPrice)
          : true;
        const matchesSearchTerm = service.name
          .toLowerCase()
          .includes(filterSearchTerm.toLowerCase());

        return isAboveMinPrice && isBelowMaxPrice && matchesSearchTerm;
      });

      setFilteredServices(filtered);
    }
  }, [services, filterSearchTerm, minPrice, maxPrice]);

  const handleApplyFilter = () => {
    setPage(1);
    setFilterSearchTerm(searchTerm);
  };

  const handleResetFilter = () => {
    setMinPrice("");
    setMaxPrice("");
    setSearchTerm("");
    setFilterSearchTerm("");
    setFilteredServices(services);
  };

  const handlePageChange = (newPage: number) => setPage(newPage);

  if (isLoading || !services) {
    return <ServiceSkeleton />;
  }

  return (
    <div className="p-4 m-2">
      <Chip className="mb-10">
        <h2 className="font-bold text-center">Car Wash All Services</h2>
      </Chip>

      <ServiceFilter
        sortItem={sortItem}
        setSortItem={setSortItem}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        onApplyFilter={handleApplyFilter}
        onResetFilter={handleResetFilter}
        filterSearchTerm={""}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(filterSearchTerm || minPrice || maxPrice
          ? filteredServices
          : services
        )?.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>

      {meta && (
        <div className="mt-10 flex justify-center items-start">
          <Pagination
            color="default"
            variant="flat"
            showControls
            total={meta.totalPage}
            initialPage={page}
            className={`mb-5 px-5 py-1 mx-3 border-none shadow-none rounded-full bg-[#F4F4F5] ${
              theme === "dark" ? " bg-opacity-30" : ""
            }`}
            onChange={(newPage) => handlePageChange(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default Services;
