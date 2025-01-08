import { createContext, useContext, useState } from "react";

// Context 생성
const UserContext = createContext();

// 사용자 정보 제공하는 Provider 컴포넌트
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // 초기화 시 로컬 스토리지에서 사용자 정보 로드
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const loginContext = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logoutContext = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

// 커스텀 훅
export const useUser = () => useContext(UserContext);
