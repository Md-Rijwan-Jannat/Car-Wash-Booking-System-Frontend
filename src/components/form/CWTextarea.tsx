import { Textarea, TextAreaProps } from "@nextui-org/react";
import { useFormContext, Controller } from "react-hook-form";
import { ReactNode } from "react";

type CWTextareaProps = {
  name: string;
  label: string;
  placeholder: string;
  rows: number;
  endContent?: ReactNode;
  defaultValue?: string;
} & TextAreaProps;

const CWTextarea = ({
  name,
  label,
  placeholder,
  endContent,
  rows,
  defaultValue,
  ...textareaProps
}: CWTextareaProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <Textarea
            {...field}
            label={label}
            color="warning"
            variant="bordered"
            defaultValue={defaultValue}
            placeholder={placeholder}
            endContent={endContent}
            rows={rows}
            value={field.value || defaultValue}
            status={error ? "error" : undefined}
            {...textareaProps}
          />
          {error && (
            <p className="text-xs text-red-500 mt-1">{error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default CWTextarea;
