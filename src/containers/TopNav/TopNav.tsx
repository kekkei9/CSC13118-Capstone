import { Text, Flex } from "native-base";
import SvgUri from "react-native-svg-uri";
import ChooseLanguage from "../../components/ChooseLanguage/ChooseLanguage";

const TopNav = () => {
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      flexDirection={"row"}
      width={"full"}
      maxWidth={"full"}
      paddingX={18}
      height={70}
      position={"fixed"}
      style={{
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: { height: 2, width: 2 },
      }}
    >
      <SvgUri
        width="170"
        height="39"
        source={{
          uri: "https://sandbox.app.lettutor.com/static/media/lettutor_logo.91f91ade.svg",
        }}
      />
      <ChooseLanguage />
    </Flex>
  );
};

export default TopNav;
