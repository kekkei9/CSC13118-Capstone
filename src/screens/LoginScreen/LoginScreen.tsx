import { useNavigation } from "@react-navigation/native";
import { Button, Center, Flex, HStack, Image, Text, VStack } from "native-base";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <Center paddingY={9} paddingX={2.5}>
      <Image
        src="https://sandbox.app.lettutor.com/static/media/login.8d01124a.png"
        width={"355"}
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
          Become fluent faster through one on one video chat lessons tailored to
          your goals.
        </Text>
        <Flex w="full">
          <Flex mb={"6"}>
            <Text>EMAIL</Text>
            <Text>EMAIL</Text>
          </Flex>
          <Flex mb={"6"}>
            <Text>PASSWORD</Text>
            <Text>PASSWORD</Text>
          </Flex>
          <Text mb={2.5}>Forgot password?</Text>
          <Button
            mb={6}
            onPress={() => navigation.navigate("TutorList" as never)}
          >
            Log in
          </Button>
          <Center>
            <Text>Or continue with</Text>
            <HStack>
              <Text>A</Text>
              <Text>B</Text>
              <Text>B</Text>
            </HStack>
            <HStack>
              <Text>Not a member yet?</Text>
              <Text>Sign up</Text>
            </HStack>
          </Center>
        </Flex>
      </Center>
    </Center>
  );
};

export default LoginScreen;
