import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./components/StyledComponents.js";
import Layout from "./components/Layout.js";
import { UserProvider } from "./utils/UserContext";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/login/Login";

function App() {
  return (
    <>
      <UserProvider>
        <GlobalStyle />
        <div>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<Login />} />

              {/* 인증이 필요한 페이지 */}
              <Route element={<PrivateRoute />}></Route>
            </Route>
          </Routes>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
