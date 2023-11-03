import { Button, Container, Flex, Text, Image } from "native-base";
import { supportedLanguages } from "./languages";
import { useState } from "react";

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
        <Image
          src={
            supportedLanguages.find(
              (language) => language.locale === currentLanguage
            )?.icon || ""
          }
          width={18}
          height={18}
          alt="Language Icon"
        />
      </Button>
      {showLanguagePopup && (
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
              <Image src={icon} width={22} height={22} alt="Language Icon" />
              <Text marginLeft={2}>{name}</Text>
            </Flex>
          ))}
        </Flex>
      )}
    </Container>
  );
};

export default ChooseLanguage;
