import { Button, Container, Flex, Text } from "native-base";
import { useState } from "react";
import { SvgUri } from "react-native-svg";
import { useI18nContext } from "../../i18n/i18n-react";

const ChooseLanguage = () => {
  const {locale, setLocale, LL} = useI18nContext();
  const [showLanguagePopup, setShowLanguagePopup] = useState<boolean>(false);

  const onChooseLanguage = (locale: "vi" | "en") => {
    setLocale(locale);
    setShowLanguagePopup(false);
  };

  const supportedLanguages = [
    {
      name: LL.language.english(),
      locale: "en",
      icon: "https://sandbox.app.lettutor.com/static/media/united-states.eb0c11f1.svg",
    },
    {
      name: LL.language.vietnamese(),
      locale: "vi",
      icon: "https://sandbox.app.lettutor.com/static/media/vietnam.3745180b.svg",
    },
  ];
  

  return (
    <Container>
      {/* <TouchableWithoutFeedback onPress={() => setShowLanguagePopup(false)}>
        <View style={{width: '100%', height: '100%', position: 'absolute', left: 0, top: 0}} />
      </TouchableWithoutFeedback> */}
      <Button
        _light={{backgroundColor: "rgb(228, 230, 235)"}}
        _dark={{backgroundColor: "rgb(100, 100, 100)"}}
        rounded={"full"}
        width={38}
        height={38}
        onPress={() => setShowLanguagePopup((prev) => !prev)}
      >
        <SvgUri
          uri={
            supportedLanguages.find(
              (language) => language.locale === locale
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
              paddingY={1.5}
              onTouchStart={() => onChooseLanguage(locale as "vi" | "en")}
              shadow={"10"}
              key={locale}
              _light={{ backgroundColor: "white" }}
              _dark={{ backgroundColor: "gray.700" }}
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
