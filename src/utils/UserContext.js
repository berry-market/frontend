import { createContext, useContext, useState } from "react";

// Context 생성
const UserContext = createContext();

// 사용자 정보 제공하는 Provider 컴포넌트
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginContext = (userData) => setUser(userData); // 로그인 시 사용자 정보 저장
  const logoutContext = () => setUser(null); // 로그아웃 시 사용자 정보 초기화

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

// 커스텀 훅
export const useUser = () => useContext(UserContext);
