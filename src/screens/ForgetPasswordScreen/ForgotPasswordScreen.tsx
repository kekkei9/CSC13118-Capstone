import { useNavigation } from "@react-navigation/native";
import { Button, Input, Text, VStack, View, useToast } from "native-base";
import { useState } from "react";
import { sendForgotPasswordEmail } from "../../services/backend/AuthController";
import { useI18nContext } from "../../i18n/i18n-react";

const ForgotPasswordScreen = () => {
  const toast = useToast();
  const {LL} = useI18nContext();
  const [email, setEmail] = useState("");
  const [sentEmail, setSentEmail] = useState(false);

  const handleClickSendResetLink = async () => {
    try {
      const forgotResponse = await sendForgotPasswordEmail(email);
      if (forgotResponse.status === 200) {
        setSentEmail(true);
      } 
    } catch (error) {
      toast.show({
        description: "Something went wrong",
      });
    }
  };

  return (
    <View
      flex={1}
      px={8}
      py={8}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <VStack alignItems="center" justifyContent="center">
        <Text fontWeight={"bold"} fontSize={30} mb={4} textAlign={"center"}>
          {LL.forgotPassword.resetPassword()}
        </Text>
        <Text mb={3.5} textAlign={"center"} fontSize={14}>
          {LL.forgotPassword.pleaseEnterEmail()}
        </Text>
        { !sentEmail && 
          <>
            <VStack space={2} w={"full"}>
              <Text>{LL.login.email()}</Text>
              <Input w={"full"} value={email} onChangeText={setEmail} />
            </VStack>
            <Button mt={8} onPress={handleClickSendResetLink}>
              {LL.forgotPassword.sendResetLink()}
            </Button>
          </>
        }
      </VStack>
    </View>
  );
};

export default ForgotPasswordScreen;
