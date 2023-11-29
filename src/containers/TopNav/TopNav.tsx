import { Flex } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";
import ChooseLanguage from "../../components/ChooseLanguage/ChooseLanguage";

const TopNav = () => {
  const insets = useSafeAreaInsets();

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      flexDirection={"row"}
      width={"full"}
      maxWidth={"full"}
      paddingX={18}
      paddingY={13}
      position={"fixed"}
      style={{
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: { height: 2, width: 2 },
      }}
      shadow={"2"}
      backgroundColor={"#fff"}
      paddingTop={insets.top + 13}
    >
      <SvgUri
        width="170"
        height="39"
        uri="https://sandbox.app.lettutor.com/static/media/lettutor_logo.91f91ade.svg"
      />
      <ChooseLanguage />
      <></>
    </Flex>
  );
};

export default TopNav;
