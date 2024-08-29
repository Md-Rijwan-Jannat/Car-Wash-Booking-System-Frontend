import { Button } from "@nextui-org/react";
import { FC } from "react";

type TBackButtonProps = object;

const BackButton: FC<TBackButtonProps> = () => {
  return (
    <div className="my-6 flex justify-between">
      <Button
        color="warning"
        variant="flat"
        onClick={() => window.history.back()}
      >
        Go Back
      </Button>
      <Button
        color="warning"
        variant="bordered"
        onClick={() => (window.location.href = "/")}
      >
        Go Home
      </Button>
    </div>
  );
};

export default BackButton;
