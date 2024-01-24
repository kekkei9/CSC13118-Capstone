import { Switch, Text, VStack, useColorMode } from "native-base";

const SettingScreen = () => {
    const {
        colorMode,
        toggleColorMode
    } = useColorMode();

    return ( <VStack>
        <Switch isChecked={colorMode === "dark"} onToggle={_ => {toggleColorMode()}}/>
    </VStack> );
}
 
export default SettingScreen;