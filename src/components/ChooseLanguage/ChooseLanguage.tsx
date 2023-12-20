import { Button, Container, Flex, Text } from "native-base";
import { useState } from "react";
import { SvgUri } from "react-native-svg";
import { supportedLanguages } from "./languages";

const ChooseLanguage = () => {
  //TODO: move this to redux later
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const [showLanguagePopup, setShowLanguagePopup] = useState<boolean>(false);

  const onChooseLanguage = (locale: string) => {
    setCurrentLanguage(locale);
    setShowLanguagePopup(false);
  };

  return (
    <Container>
      <Button
        backgroundColor={"rgb(228, 230, 235)"}
        rounded={"full"}
        width={38}
        height={38}
        onPress={() => setShowLanguagePopup((prev) => !prev)}
      >
        <SvgUri
          uri={
            supportedLanguages.find(
              (language) => language.locale === currentLanguage
            )?.icon || ""
          }
          width={18}
          height={18}
        />
      </Button>
      {showLanguagePopup ? (
        <Flex
          position={"absolute"}
          top={38}
          width={127}
          left={-100}
          paddingY={1}
        >
          {supportedLanguages.map(({ icon, name, locale }) => (
            <Flex
              direction="row"
              paddingX={3}
              paddingY={1.25}
              onTouchStart={() => onChooseLanguage(locale)}
              shadow={"10"}
              key={locale}
              backgroundColor={"#fff"}
            >
              <SvgUri uri={icon} width={22} height={22} />
              <Text marginLeft={2}>{name}</Text>
            </Flex>
          ))}
        </Flex>
      ) : null}
    </Container>
  );
};

export default ChooseLanguage;
