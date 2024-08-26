/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FC } from "react";
import { IoStar } from "react-icons/io5";
import CWInput from "../form/CWInput";
import CWForm from "../form/CWForm";
import { useTheme } from "next-themes";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useAddWebsiteReviewMutation } from "../../redux/features/websiteReviewApi";
import { toast } from "sonner";

type TAddReviewModalProps = object;

const AddReviewModal: FC<TAddReviewModalProps> = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [addWebsiteReview, { isLoading }] = useAddWebsiteReviewMutation();
  const { theme } = useTheme();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Register in...");
    const reviewData = {
      feedback: data.feedback,
      rating: Number(data.rating),
    };

    try {
      const res = await addWebsiteReview(reviewData).unwrap();
      onOpenChange();
      if (res?.success) {
        toast.success("Added your  successfully", {
          id: toastId,
          duration: 3000,
        });
      }
    } catch (err) {
      toast.error("Something went wrong", {
        id: toastId,
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="warning" variant="flat">
        Add Review
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Review
              </ModalHeader>
              <ModalBody>
                <CWForm onSubmit={onSubmit}>
                  <div
                    className={`flex flex-col items-center justify-center gap-5 border ${
                      theme === "dark" ? "border-gray-50 border-opacity-15" : ""
                    } rounded-md p-3 lg:p-5 w-full md:w-[400px]`}
                  >
                    <CWInput
                      name="feedback"
                      label="Feedback"
                      placeholder="Enter your feedback"
                      type="text"
                      icon={<IoStar className="text-2xl text-warning" />}
                    />
                    <CWInput
                      name="rating"
                      label="Rating"
                      placeholder="Enter your rating"
                      type="number"
                      icon={<IoStar className="text-2xl text-warning" />}
                    />
                    <Button isLoading={isLoading} color="default" type="submit">
                      Submit Review
                    </Button>
                  </div>
                </CWForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddReviewModal;
