import { Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./components/StyledComponents.js";
import { UserProvider } from "./utils/UserContext";
import PrivateRoute from "./utils/PrivateRoute";
import Layout from "./components/layout/Layout.js";
import MypageLayout from "./components/layout/MypageLayout.js";
import PaymentLayout from "./components/layout/PaymentLayout.js";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup.js";
import Profile from "./pages/mypage/profile/Profile.js";
import CheckoutPage from "./pages/mypage/payments/CheckoutPage.js";
import SuccessPage from "./pages/mypage/payments/response/SuccessPage.js";
import FailPage from "./pages/mypage/payments/response/FailPage.js";
import BidChat from "./pages/chat/BidChat.js";

function App() {
  return (
    <>
      <UserProvider>
        <GlobalStyle />
        <div>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              {/* 마이페이지 */}
              <Route element={<PrivateRoute />}>
                <Route path="/mypages" element={<MypageLayout />}>
                  <Route path="profile" element={<Profile />} />
                </Route>
              </Route>
            </Route>
            {/* 결제페이지 */}
            <Route element={<PrivateRoute />}>
              <Route path="/payments" element={<PaymentLayout />}>
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="success" element={<SuccessPage />} />
                <Route path="fail" element={<FailPage />} />
              </Route>
            </Route>
            <Route path="/bid-chat" element={<BidChat />} />
          </Routes>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
