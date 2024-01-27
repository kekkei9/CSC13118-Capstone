import { Button, Container, Image, Input, Pressable, ScrollView, Select, Tag, Text, TextArea, VStack, View, useToast } from "native-base";
import useSWR from "swr";
import { LearnTopic, User } from "../../types/Auth";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { updateUserAvatar, updateUserInformation } from "../../services/backend/UserController";
import { Controller, useForm } from "react-hook-form";
import { countryNameMapper } from "../../constants/CountryConstant";
import _ from "lodash";
import { axiosClient } from "../../services/backend/axiosClient";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
    const toast = useToast();
    const navigation = useNavigation();
    const [wantToLearnCategories, setWantToLearnCategories] = useState<LearnTopic[]>([]);
    const {reset, control, handleSubmit, setValue} = useForm<User & {
        learnTopics: string[];
    }>();

    const [show, setShow] = useState(false);

    const fetchCategories = async () => {
        try {
            const learnTopicResponse = await axiosClient.get('/learn-topic');
            const testPreparationResponse = await axiosClient.get('/test-preparation');
            
            const learnTopicCategories = learnTopicResponse.data;
            const testPreparationCategories = testPreparationResponse.data;
            
            setWantToLearnCategories([... learnTopicCategories, ... testPreparationCategories])
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const {data: userResponse, mutate} = useSWR<{user: User}>("/user/info");

    useEffect(() => {
        reset({
            birthday: userResponse?.user.birthday,
            country: userResponse?.user.country,
            learnTopics: userResponse?.user.learnTopics.map((topic) => topic.id.toString()),
            level: userResponse?.user.level,
            name: userResponse?.user.name,
            phone: userResponse?.user.phone,
        });
    }, [userResponse]);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      
      if (!result.canceled) {
        const fileName = result.assets[0].uri.split('/').pop();
        const fileType = fileName?.split('.').pop();
        const formData = new FormData();
        formData.append('avatar', { 
          uri: result.assets[0].uri, 
          name: fileName, 
          type: `image/${fileType}` 
        } as any);
        
        try {
            await updateUserAvatar(formData);
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

    const onSubmit = async (values: User) => {
        try {
            const result = await updateUserInformation(values);
            mutate();
            toast.show({
                title: "Information updated",
            });
        } catch (error) {
            console.log(error)
            toast.show({
                title: "Error",
            });
        }
      };


    return ( 
        <ScrollView flex={1}>
            <VStack w={"full"}>
                <VStack p={9} w={"full"} alignItems={"center"}>
                    <View position={"relative"}>
                        <Image 
                            src={userResponse?.user.avatar}
                            alt="user avatar"
                            w={130}
                            h={130}
                            rounded={"full"}
                            fallbackElement={
                                <Container
                                    backgroundColor={"rgb(178, 54, 131)"}
                                    rounded={"full"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    textAlign={"center"}
                                    w={130}
                                    h={130}
                                    >
                                    <Text fontSize={36} color={"white"}>
                                        {userResponse?.user.name
                                        .split(" ")
                                        .map((word) => word.charAt(0))
                                        .join("")}
                                    </Text>
                                </Container>
                            }
                        />
                        <Pressable position={"absolute"} right={2} bottom={2} padding={2} bg={"rgb(0, 113, 240)"} rounded={"full"}
                            onPress={pickImage}
                        >
                            <FontAwesomeIcon icon={faEdit} color="white" size={10}/>
                        </Pressable>
                    </View>
                    {
                        userResponse?.user.roles.includes("CHANGE_PASSWORD")?
                        <Pressable
                        onPress={() => navigation.navigate("Change Password" as never)}
                    >
                        <Text color={"blue.400"}>Change password</Text>
                    </Pressable>: null
                    }
                    <VStack w={"full"} space={4}>
                        <Text>Name</Text>
                        <Controller
                            control={control}
                            name="name"
                            defaultValue={userResponse?.user.name}
                            render={({ field }) => (
                                <Input {...field} placeholder="Enter your name" 
                                onChangeText={field.onChange}
                                />
                            )}
                rules={{ required: "Password is required", minLength: 0 }}
                />
                        <Text>Email Address</Text>
                        <Controller
                            control={control}
                            name="email"
                            defaultValue={userResponse?.user.email}
                            render={({ field }) => (
                                <Input {...field} placeholder="Enter your email address" isDisabled/>
                            )}
                        />
                        <Text>Country</Text>
                        <Controller
                            control={control}
                            name="country"
                            defaultValue={userResponse?.user.country}
                            render={({ field }) => (
                                <Select {...field} placeholder="Enter your country" selectedValue={field.value}>
                                    {_.entries(countryNameMapper).map(([key, value]) => (
                                        <Select.Item shadow={2} label={value} key={key} value={key} />
                                    ))}
                                </Select>
                            )}
                        />
                        <Text>Phone Number</Text>
                        <Controller
                            control={control}
                            name="phone"
                            defaultValue={userResponse?.user.phone}
                            render={({ field }) => (
                                <Input {...field} placeholder="Enter your phone number" isDisabled/>
                            )}
                        />
                        {
                            userResponse?.user.isPhoneActivated ?
                            <Tag alignSelf={"flex-start"}>Verified</Tag>
                            : null
                        }
                        <Text>Birthday</Text>
                        <Controller
                            control={control}
                            name="birthday"
                            defaultValue={userResponse?.user.birthday}
                            render={({ field }) => (
                                <Input {...field} onPressIn={() => setShow(true)} isDisabled/>
                            )}
                        />
                        {show &&
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date(userResponse?.user.birthday || "")}
                        mode={"date"}
                        is24Hour={true}
                        onChange={(_, value) => {
                          setValue("birthday", `${value?.getFullYear()}-${value?.getMonth()}-${value?.getDate()}`);
                          setShow(false);
                        
                        }}
                      />}
                        <Text>My Level</Text>
                        <Controller
                            control={control}
                            name="level"
                            defaultValue={userResponse?.user.level}
                            render={({ field }) => (
                                <Input {...field} placeholder="Enter your level"/>
                            )}
                        />
                        <Text>Want to learn</Text>
                        <Controller
                            control={control}
                            name="learnTopics"
                            defaultValue={userResponse?.user.learnTopics}
                            render={({ field }) => (
                                <Select {...field} placeholder="Enter what you want to learn"
                                    onValueChange={v => field.onChange([v])}
                                    selectedValue={field.value?.[0]}
                                >
                                    {wantToLearnCategories.map(({id, key, name}) => (
                                        <Select.Item shadow={2} label={name} key={key} value={id.toString()} />
                                    ))}
                                </Select>
                            )}
                        />
                        <Text>Study Schedule</Text>
                        <Controller
                            control={control}
                            name="studySchedule"
                            defaultValue={userResponse?.user.studySchedule}
                            render={({ field }) => (
                                <TextArea {...field} 
                                    autoCompleteType={undefined} 
                                    placeholder="Note the time of the week you want to study on LetTutor" 
                                    onChangeText={field.onChange}
                                />
                            )}
                        />
                    </VStack>
                    <Button 
                        onPress={handleSubmit(onSubmit)}
                        mt={5}
                        alignSelf={"flex-end"}
                    >
                        Save changes
                    </Button>
                </VStack>
            </VStack>
        </ScrollView>
    );
}
 
export default EditProfileScreen;