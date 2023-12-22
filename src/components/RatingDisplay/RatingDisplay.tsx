import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

type RatingDisplayProps = {
  numberOfStars: number;
};

const RatingDisplay = ({ numberOfStars }: RatingDisplayProps) => {
  return (
    <>
      {[...Array(5)].map((_item, index) => (
        <FontAwesomeIcon
          icon={faStar}
          key={index}
          color={index < numberOfStars ? "#F6D714" : "rgb(228, 230, 235)"}
          size={12}
        />
      ))}
    </>
  );
};

export default RatingDisplay;
