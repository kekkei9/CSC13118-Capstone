import { Center, Text } from "native-base";
import TopNav from "../../containers/TopNav";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Center>
      <TopNav />
      {children}
    </Center>
  );
};

export default MainLayout;
