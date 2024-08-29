/* eslint-disable @typescript-eslint/no-explicit-any */
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
  defaultValue?: string;
  required?: boolean;
};

const CWInput: FC<TCWInputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  icon = (
    <IoMdPerson className="text-2xl text-warning pointer-events-none flex-shrink-0" />
  ),
  defaultValue,
  required,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Input
          {...field}
          label={label}
          placeholder={placeholder}
          defaultValue={defaultValue}
          type={type}
          endContent={icon}
          variant="bordered"
          color="warning"
          required={required ? required : true}
          value={field.value || defaultValue}
        />
      )}
    />
  );
};

export default CWInput;
