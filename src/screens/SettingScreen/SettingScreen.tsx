import { Switch, Text, VStack, useColorMode } from "native-base";
import { useI18nContext } from "../../i18n/i18n-react";

const SettingScreen = () => {
    const {
        colorMode,
        toggleColorMode
    } = useColorMode();

    const {LL} = useI18nContext();

    return ( <VStack>
        <Text>{"hihi"}</Text>
        <Switch isChecked={colorMode === "dark"} onToggle={_ => {toggleColorMode()}}/>
    </VStack> );
}
 
export default SettingScreen;