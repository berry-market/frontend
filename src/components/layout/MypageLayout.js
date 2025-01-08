import { Outlet } from "react-router-dom";
import MypageNavBar from "../navigationBar/MypageNavBar";
import { Container } from "../StyledComponents";

const MypageLayout = () => {
  return (
    <div>
      <MypageNavBar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default MypageLayout;
