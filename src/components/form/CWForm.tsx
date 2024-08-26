import { ReactNode } from "react";
import {
  FormProvider,
  useForm,
  SubmitHandler,
  FieldValues,
  UseFormProps,
} from "react-hook-form";

type TCWFormProps<T extends FieldValues = FieldValues> = {
  onSubmit: SubmitHandler<T>;
  defaultValues?: UseFormProps<T>["defaultValues"];
  children: ReactNode;
};

const CWForm = <T extends FieldValues = FieldValues>({
  onSubmit,
  defaultValues,
  children,
}: TCWFormProps<T>) => {
  const methods = useForm<T>({
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default CWForm;
