import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  useToast,
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Image,
  Input,
} from "@chakra-ui/react";
import Avatar from "./Avatar";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const EditProfile = ({ user, userInfo, isOpen, onClose }) => {
  //update avatar
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const fileURL = file && URL.createObjectURL(file);
  const toast = useToast();
  const navigate = useNavigate();
  const uid = user?.uid;
  async function updateAvatar() {
    if (!file || !uid) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      return;
    }

    setLoading(true);

    const fileRef = ref(storage, "avatars/" + uid);
    await uploadBytes(fileRef, file);

    const avatarURL = await getDownloadURL(fileRef);

    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, { avatar: avatarURL });

    toast({
      title: "Profile updated!",
      status: "success",
      isClosable: true,
      position: "top",
      duration: 5000,
    });
    setLoading(false);

    navigate(0); //Refresh page
  }
  function handleChange(e) {
    setFile(e.target.files[0]);
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="20px">
        <Avatar userInfo={userInfo} overrideAvatar={fileURL} />
        <FormControl py="4">
          <FormLabel htmlFor="picture" color="black">
            Change Avatar
          </FormLabel>
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <Button
            as="label"
            htmlFor="file-upload"
            cursor="pointer"
            colorScheme="blue"
            color="white"
            size="sm"
            _hover={{ backgroundColor: "blue.600" }}
          >
            Choose File
          </Button>
        </FormControl>
        <Button
          loadingText="Uploading"
          w="full"
          colorScheme="teal"
          onClick={updateAvatar}
          isLoading={isLoading}
        >
          Save
        </Button>
        <ModalCloseButton />
      </ModalContent>
    </Modal>
  );
};

export default EditProfile;
