import { Container } from "../StyledComponents";
import { Outlet } from "react-router-dom"; // 자식 라우트 컴포넌트 렌더링
import Header from "../header/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
