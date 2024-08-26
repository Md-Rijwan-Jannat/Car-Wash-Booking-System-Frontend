import { Input } from "@nextui-org/react";
import { useFormContext, Controller } from "react-hook-form";
import { FC } from "react";
import { IoMdPerson } from "react-icons/io";

type TCWInputProps = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  icon?: JSX.Element;
};

const CWInput: FC<TCWInputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  icon = (
    <IoMdPerson className="text-2xl text-warning pointer-events-none flex-shrink-0" />
  ),
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          label={label}
          placeholder={placeholder}
          type={type}
          endContent={icon}
          variant="bordered"
          color="warning"
          required
        />
      )}
    />
  );
};

export default CWInput;
