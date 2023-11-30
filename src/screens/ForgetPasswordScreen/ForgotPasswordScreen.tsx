import { HStack, View, Text, Input, Button, VStack } from "native-base";

const ForgotPasswordScreen = () => {
  return (
    <View
      flex={1}
      px={2.5}
      py={8}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <VStack alignItems="center" justifyContent="center">
        <Text fontWeight={"bold"} fontSize={30} mb={4} textAlign={"center"}>
          Reset Password
        </Text>
        <Text mb={3.5} textAlign={"center"} fontSize={14}>
          Please enter your email address to search for your account.
        </Text>
        <VStack space={2} w={"full"}>
          <Text>Email</Text>
          <Input w={"full"} />
        </VStack>
        <Button mt={8}>Send reset link</Button>
      </VStack>
    </View>
  );
};

export default ForgotPasswordScreen;
