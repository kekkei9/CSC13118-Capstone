import { Flex, Image } from "native-base";
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
      shadow={"2"}
      backgroundColor={"#fff"}
    >
      <Image
        width="170"
        height="39"
        src="/assets/letutor_LO"
        alt="Lettutor Logo"
      />
      <ChooseLanguage />
    </Flex>
  );
};

export default TopNav;
