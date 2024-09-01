/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import {
  useGetMeQuery,
  useUpdateUserMutation,
} from "../../redux/features/auth/authApi";
import { useAppSelector } from "../../redux/hook";
import { TUser, useCurrentUser } from "../../redux/features/auth/authSlice";
import { FaEdit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { useTheme } from "next-themes";

const UserImageModal: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useAppSelector(useCurrentUser) as TUser;
  const { theme } = useTheme();
  const { data } = useGetMeQuery(user?.email);
  const userId = data?.data?._id;
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<Record<string, any>> = async (formData) => {
    const toastId = toast.loading("Updating your profile...");
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_NAME
    }/image/upload`;
    const cloudinaryUploadPreset = import.meta.env
      .VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloudinaryName = import.meta.env.VITE_CLOUDINARY_NAME;

    if (formData.image instanceof FileList && formData.image.length > 0) {
      console.log(formData);
      const newFormData = new FormData();
      newFormData.append("file", formData.image[0]);
      newFormData.append("upload_preset", cloudinaryUploadPreset as string);
      newFormData.append("cloud_name", cloudinaryName as string);

      try {
        const { data: cloudinaryData } = await axios.post(
          cloudinaryUrl,
          newFormData
        );
        const imgUrl = cloudinaryData.secure_url;

        const updateResponse = await updateUser({
          id: userId,
          data: { profileImg: imgUrl },
        }).unwrap();

        if (updateResponse?.success) {
          toast.success("Profile image updated successfully", {
            id: toastId,
            duration: 3000,
          });
        }
        onOpenChange();
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please select an image to upload", {
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
        startContent={<FaEdit size={20} />}
        size={"sm"}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Update Profile Image
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                className={`flex flex-col items-center gap-5 border rounded-md p-3 lg:p-5 w-full md:w-[400px] ${
                  theme === "dark" ? "border-gray-100 border-opacity-15" : ""
                }`}
              >
                <Input
                  {...register("image", { required: true })}
                  label="Profile Image"
                  placeholder="Upload image"
                  type="file"
                  fullWidth
                  endContent={
                    <IoImageOutline className="text-2xl text-warning" />
                  }
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
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserImageModal;
