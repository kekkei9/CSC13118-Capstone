import { useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Button, HStack, Pressable, View } from "native-base";

type PaginationProps = {
  value: number;
  onChange: (value: number) => void;
  total: number;
  maxBulletNumber: number;
};

const Pagination = ({
  onChange,
  total,
  value,
  maxBulletNumber,
}: PaginationProps) => {
  const [offset, setOffset] = useState(value);

  return (
    <HStack alignItems={"center"} space={2} >
      <Pressable
        onPress={() =>
          setOffset((prev) =>
            prev - maxBulletNumber > 0 ? prev - maxBulletNumber : 1
          )
        }
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
        />
      </Pressable>
      {[...Array(maxBulletNumber)].map((_, index) => {
        const currentPage = offset + index;
        const isValidPage = currentPage > 0 && currentPage <= total;
        if (!isValidPage) return null;
        return (
          <Button
            key={index}
            onPress={() => {
              if (!isValidPage) return;
              onChange(currentPage);
              setOffset(currentPage);
            }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            variant={currentPage === value ? "solid" : "outline"}
          >
            {currentPage}
          </Button>
        );
      })}
      <Pressable 
        onPress={() =>
          setOffset((prev) =>
            prev + maxBulletNumber <= total
              ? prev + maxBulletNumber
              : total - maxBulletNumber
          )
        }
      >
        <FontAwesomeIcon
          icon={faChevronRight}
        />
      </Pressable>
    </HStack>
  );
};

export default Pagination;
