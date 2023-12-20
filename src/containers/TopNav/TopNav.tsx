import { useNavigation } from "@react-navigation/native";
import { Flex, HStack, Pressable } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";
import ChooseLanguage from "../../components/ChooseLanguage/ChooseLanguage";
import { useAppSelector } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const TopNav = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const user = useAppSelector((state) => state.authentication.data);

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
      <HStack space={2}>
        <ChooseLanguage />
        {!!user ? (
          <Pressable
            backgroundColor={"rgb(228, 230, 235)"}
            rounded={"full"}
            width={38}
            height={38}
            onPress={() => navigation.openDrawer()}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <FontAwesomeIcon icon={faBars} size={18} color="#1A1A1A" />
          </Pressable>
        ) : null}
      </HStack>
    </Flex>
  );
};

export default TopNav;
