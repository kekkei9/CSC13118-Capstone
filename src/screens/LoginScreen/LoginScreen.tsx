import { Center, Image, Text } from "native-base";
import { SvgUri } from "react-native-svg";

const LoginScreen = () => {
  return (
    <Center paddingY={8} paddingX={2.5}>
      <Image
        src="https://sandbox.app.lettutor.com/static/media/login.8d01124a.png"
        width={"355"}
        height={329}
        alt="login_screen_img"
        marginBottom={30}
      />
      <Center paddingX={5} paddingY={4}>
        <Text
          marginBottom={3.5}
          fontSize={"3xl"}
          textAlign={"center"}
          color={"rgb(0, 113, 240)"}
          fontWeight={"bold"}
        >
          Say hello to your English tutors
        </Text>
        <Text textAlign={"center"} marginY={1.5} fontWeight={"semibold"}>
          Become fluent faster through one on one video chat lessons tailored to
          your goals.
        </Text>
      </Center>
    </Center>
  );
};

export default LoginScreen;
