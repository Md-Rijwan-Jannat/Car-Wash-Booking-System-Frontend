import { Textarea, TextAreaProps } from "@nextui-org/react";
import { useFormContext, Controller } from "react-hook-form";
import { ReactNode } from "react";

type CWTextareaProps = {
  name: string;
  label: string;
  placeholder: string;
  rows: number;
  endContent?: ReactNode;
} & TextAreaProps;

const CWTextarea = ({
  name,
  label,
  placeholder,
  endContent,
  rows,
  ...textareaProps
}: CWTextareaProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <Textarea
            {...field}
            label={label}
            placeholder={placeholder}
            endContent={endContent}
            rows={rows}
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
