import { ScrollView, Text, VStack, Input, Button, useToast } from "native-base";
import React, { useState } from "react";
import { changeUserPassword } from "../../services/backend/UserController";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordScreen = () => {
    const toast = useToast();
    const navigation = useNavigation();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordChange = (value: string) => {
        setPassword(value);
    };

    const handleNewPasswordChange = (value: string) => {
        setNewPassword(value);
    };

    const handleConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
    };

    const handleSubmit = async () => {
        // Handle form submission logic here
        if (newPassword !== confirmPassword) {
            toast.show({
                title: "Error",
                description: "New password and confirm password must be the same",
            });
            return;
        }
        try {
            const result = await changeUserPassword(password, newPassword);
            toast.show({
                title: "Success",
                description: "Password changed successfully",
            });
            navigation.goBack();
        } catch (error) {
            toast.show({
                title: "Error",
                description: "Something went wrong",
            });
        }
    };
    return ( <ScrollView flex={1} p={9}>
        <VStack>
            <VStack space={5}>
                <Text fontWeight={"bold"} fontSize={20}>Change password</Text>
                <Input
                    placeholder="Current Password"
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry
                />
                <Input
                    placeholder="New Password"
                    value={newPassword}
                    onChangeText={handleNewPasswordChange}
                    secureTextEntry
                />
                <Input
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                    secureTextEntry
                />
                <Button onPress={handleSubmit}>Change password</Button>
            </VStack>
        </VStack>
    </ScrollView> );
}
 
export default ChangePasswordScreen;