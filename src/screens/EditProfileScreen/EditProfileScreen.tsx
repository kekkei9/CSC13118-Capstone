import { Image, Pressable, Text, VStack, View, useToast } from "native-base";
import useSWR from "swr";
import { User } from "../../types/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { updateUserAvatar } from "../../services/backend/UserController";

const EditProfileScreen = () => {
    const toast = useToast();

    const {data: userResponse, mutate} = useSWR<{user: User}>("/user/info");
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.canceled) {
        const response = await fetch(result.assets[0].uri);
        const avatar = await response.blob();
        try {
            await updateUserAvatar(avatar);
            mutate();
            toast.show({
                title: "Avatar updated",
            });
        } catch (error) {
            console.error(error);
            toast.show({
                title: "Error",
            });
      }
    }};


    return ( <View flex={1}>
        <VStack w={"full"}>
            <VStack p={9} w={"full"} alignItems={"center"}>
                <View position={"relative"}>
                    <Image 
                        src={userResponse?.user.avatar}
                        alt="usre avatar"
                        w={130}
                        h={130}
                        rounded={"full"}
                    />
                    <Pressable position={"absolute"} right={2} bottom={2} padding={2} bg={"rgb(0, 113, 240)"} rounded={"full"}
                        onPress={pickImage}
                    >
                        <FontAwesomeIcon icon={faEdit} color="white" size={10}/>
                    </Pressable>
                </View>
            </VStack>
        </VStack>
    </View> );
}
 
export default EditProfileScreen;