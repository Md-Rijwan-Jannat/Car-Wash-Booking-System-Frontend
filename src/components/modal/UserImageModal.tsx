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
import { IoImageOutline } from "react-icons/io5";
import CWForm from "../form/CWForm";
import { useTheme } from "next-themes";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CWInput from "../form/CWInput";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";
import { useAppSelector } from "../../redux/hook";
import { TUser, useCurrentUser } from "../../redux/features/auth/authSlice";
import { FaEdit } from "react-icons/fa";

type TUserImageModalProps = object;

const UserImageModal: FC<TUserImageModalProps> = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useAppSelector(useCurrentUser) as TUser;
  const { data } = useGetMeQuery(user?.email);
  const id = data?.data?._id;
  const [updateUser, { isLoading }] = useUpdateUserMutation(id);
  console.log(id);
  const { theme } = useTheme();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating your profile...");

    const userData = {
      name: data.name,
      profileImg: data.image[0],
    };

    try {
      const res = await updateUser(userData).unwrap();
      onOpenChange();
      if (res?.success) {
        toast.success("Profile updated successfully", {
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
      <Button
        onPress={onOpen}
        className="absolute top-2 right-2"
        size="sm"
        startContent={<FaEdit size={20} />}
      ></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Profile
              </ModalHeader>
              <ModalBody>
                <CWForm onSubmit={onSubmit}>
                  <div
                    className={`flex flex-col items-center justify-center gap-5 border ${
                      theme === "dark" ? "border-gray-50 border-opacity-15" : ""
                    } rounded-md p-3 lg:p-5 w-full md:w-[400px]`}
                  >
                    <CWInput
                      name="name"
                      label="Name"
                      placeholder="Enter your name"
                    />
                    <CWInput
                      name="image"
                      placeholder="Upload image"
                      label="Profile Image"
                      type="file"
                      required={false}
                    />
                    <Button
                      isLoading={isLoading}
                      color="warning"
                      variant="flat"
                      type="submit"
                    >
                      Update
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

export default UserImageModal;
