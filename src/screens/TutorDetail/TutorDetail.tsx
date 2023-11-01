import { Text, VStack, HStack, Button } from "native-base";

const TutorDetail = () => {
  return (
    <VStack>
      <HStack>
        <Text>Image</Text>
        <VStack>
          <Text>Keegan</Text>
          <Text>Star</Text>
          <Text>Country</Text>
        </VStack>
      </HStack>
      <Text>
        I am passionate about running and fitness, I often compete in trail/
      </Text>
      <HStack>
        <Button>Favourite</Button>
        <Button>Report</Button>
      </HStack>
      <Text>Video</Text>
      <Text>Education</Text>
      <Text>BA</Text>
      <Text>Languages</Text>
      <Text>English</Text>
      <Text>Specialties</Text>
      <Text>List of Specialties</Text>
      <Text>Suggested Courses</Text>
      <Text>List Suggested Courses</Text>
      <Text>Interests</Text>
      <Text>
        I loved the weather, the scenery and the laid-back lifestyle of the
        locals.
      </Text>
      <Text>Teaching experience</Text>
      <Text>I have more than 10 years of teaching english experience</Text>
      <Text>Other review</Text>
      <Text>Paginate</Text>
      <Text>Book Table</Text>
    </VStack>
  );
};

export default TutorDetail;
