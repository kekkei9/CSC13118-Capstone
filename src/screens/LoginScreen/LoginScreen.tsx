import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Center,
  Container,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { SvgUri } from "react-native-svg";
import { useAppDispatch } from "../../redux/store";
import { Controller, useForm } from "react-hook-form";
import { loginWithEmailPassword } from "../../redux/authentication/authentication.action";
import { useToast } from "native-base";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useI18nContext } from "../../i18n/i18n-react";
import _ from "lodash";

type FormValues = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const toast = useToast();
  const {LL} = useI18nContext();
  
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    // Auto fill form for development
    if (__DEV__) {
      // setValue("email", "quytn.dev@gmail.com");
      // setValue("password", "kekkei1610");
      setValue("email", "phhai@ymail.com");
      setValue("password", "123456");
    }
  }, []);

  const onSubmit = async (values: FormValues) => {
    try {
      const loginResult = await dispatch(
        loginWithEmailPassword(values)
      ).unwrap();
    } catch (error) {
      toast.show({
        description: "Login failed",
      });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Center paddingY={9} paddingX={2.5} flex={1}>
        <Image
          src="https://sandbox.app.lettutor.com/static/media/login.8d01124a.png"
          width={355}
          height={329}
          alt="login_screen_img"
          marginBottom={30}
        />
        <Center paddingX={6} paddingY={4}>
          <Text
            marginBottom={3.5}
            fontSize={"28px"}
            textAlign={"center"}
            color={"rgb(0, 113, 240)"}
            fontWeight={600}
          >
            {LL.login.sayHello()}
          </Text>
          <Text
            textAlign={"center"}
            marginY={1.5}
            fontWeight={500}
            fontSize={"16px"}
          >
            {LL.login.becomeFluentFaster()}
          </Text>
          <VStack w="full">
            <Flex mb={4} w={"full"}>
              <Text color="#A4B0BE" mb={2}>
                {LL.login.email().toUpperCase()}
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    placeholder="mail@example.com"
                    onChangeText={(val) => onChange(val)}
                    value={value}
                    w={"full"}
                    isInvalid={"email" in errors}
                    size="md" 
                  />
                )}
                name="email"
                rules={{ 
                  required: "Email is required", 
                  minLength: 0,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                }}
              />
              { errors.email?.message && 
                <Text mt={2} color="red.400">{errors.email?.message}</Text>
              }
            </Flex>
            <Flex mb={"6"}>
              <Text color="#A4B0BE">{LL.login.password().toUpperCase()}</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    onChangeText={(val) => onChange(val)}
                    value={value}
                    isInvalid={"password" in errors}
                    type={show ? "text" : "password"}
                    size="md" 
                    InputRightElement={
                      <Pressable onPress={() => setShow(!show)} mr={3}>
                        <FontAwesomeIcon icon={show ? faEye : faEyeSlash} color="#808080" size={22} />
                      </Pressable>}
                  />
                )}
                name="password"
                rules={{ required: "Password is required", minLength: 0 }}
              />
              { errors.password?.message &&
                <Text mt={2} color="red.400">{errors.password?.message}</Text>
              }
            </Flex>
            <Pressable
              onPress={() => navigation.navigate("ForgotPassword" as never)}
            >
              <Text mb={2.5} color="#286AD2">
                {LL.login.forgotPassword()}
              </Text>
            </Pressable>
            <Button mb={6} onPress={handleSubmit(onSubmit)} py={2.5}>
              <Text fontSize={20} color="white" fontWeight={500}>
                {LL.login.login().toUpperCase()}
              </Text>
            </Button>
            <Center>
              <Text fontSize={16}>{LL.login.orContinueWith()}</Text>
              <HStack space={6} mt={6}>
                <SvgUri
                  width={40}
                  height={40}
                  uri={
                    "https://sandbox.app.lettutor.com/static/media/facebook-logo.3bac8064.svg"
                  }
                />
                <SvgUri
                  width={40}
                  height={40}
                  uri={
                    "https://sandbox.app.lettutor.com/static/media/google-logo.5f53496e.svg"
                  }
                />
                <Container
                  w={10}
                  h={10}
                  rounded={"full"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  borderColor={"#0071F0"}
                  borderWidth={1}
                >
                  <SvgUri
                    width={24}
                    height={24}
                    uri={
                      "https://sandbox.app.lettutor.com/static/media/mobile-logo.8ef12de5.svg"
                    }
                  />
                </Container>
              </HStack>
              <HStack mt={6}>
                <Text>{LL.login.notAMemberYet()} </Text>
                <Text
                  color={"#1890ff"}
                  onPress={() => navigation.navigate("SignUp" as never)}
                >
                  {LL.login.signUp()}
                </Text>
              </HStack>
            </Center>
          </VStack>
        </Center>
      </Center>
    </ScrollView>
  );
};

export default LoginScreen;
