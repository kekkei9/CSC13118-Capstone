import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Center,
  Container,
  Flex,
  HStack,
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

type FormValues = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const onSubmit = (values: FormValues) => {
    // TODO: Remove this
    const values1 = { email: "student@lettutor.com", password: "123456" };
    dispatch(loginWithEmailPassword(values1));
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
            Say hello to your English tutors
          </Text>
          <Text
            textAlign={"center"}
            marginY={1.5}
            fontWeight={500}
            fontSize={"16px"}
          >
            Become fluent faster through one on one video chat lessons tailored
            to your goals.
          </Text>
          <VStack w="full">
            <Flex mb={4} w={"full"}>
              <Text color="#A4B0BE" mb={2}>
                EMAIL
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
                  />
                )}
                name="email"
                // rules={{ required: "Email is required", minLength: 6 }}
              />
            </Flex>
            <Flex mb={"6"}>
              <Text color="#A4B0BE">PASSWORD</Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    type="password"
                    onChangeText={(val) => onChange(val)}
                    value={value}
                    isInvalid={"password" in errors}
                  />
                )}
                name="password"
                // rules={{ required: "Password is required", minLength: 6 }}
              />
            </Flex>
            <Pressable
              onPress={() => navigation.navigate("ForgotPassword" as never)}
            >
              <Text mb={2.5} color="#286AD2">
                Forgot password?
              </Text>
            </Pressable>
            <Button mb={6} onPress={handleSubmit(onSubmit)} py={2.5}>
              <Text fontSize={20} color="white" fontWeight={500}>
                LOG IN
              </Text>
            </Button>
            <Center>
              <Text fontSize={16}>Or continue with</Text>
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
                <Text>Not a member yet? </Text>
                <Text
                  color={"#1890ff"}
                  onPress={() => navigation.navigate("SignUp" as never)}
                >
                  Sign up
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
