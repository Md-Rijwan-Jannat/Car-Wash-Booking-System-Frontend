import { Button } from "@nextui-org/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

type TBackButtonProps = object;

const BackButton: FC<TBackButtonProps> = () => {
  const navigate = useNavigate();
  return (
    <div className="my-6 flex justify-between mr-1">
      <Button
        color="warning"
        variant="flat"
        onClick={() => window.history.back()}
      >
        Go Back
      </Button>
      <Button color="warning" variant="bordered" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </div>
  );
};

export default BackButton;
