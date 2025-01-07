import styles from "./Header.module.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "../StyledComponents";
import HeaderTop from "./HeaderTop";
import NavBar from "../navigationBar/NavBar";

// 이미지
import { ReactComponent as SearchIcon } from "./images/search_icon.svg";
import { ReactComponent as HeartIcon } from "./images/heart_icon.svg";
import { ReactComponent as BellIcon } from "./images/bell_icon.svg";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 로고만 보이는 페이지
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const handleSearch = () => {
    // 공백으로 키워드 분리
    const keywordsArray = keyword.split(" ").filter(Boolean);
    // 분리된 키워드 ","로 조인
    const queryString = keywordsArray.length
      ? `?keywords=${keywordsArray
          .map((word) => encodeURIComponent(word))
          .join(",")}`
      : "";
    navigate(`/posts${queryString}`);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleHeartClick = () => {
    navigate("/mypages/likes");
  };

  // Todo : 알림 모달 구현 후 추가
  const handleBellClick = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  return (
    <>
      <HeaderTop />
      <header className={styles.header}>
        <div className={styles.logo_container} onClick={handleLogoClick}>
          <span className={styles.logo}>
            <img src="/logo.svg" alt="logo" />
          </span>
          <h1>베리마켓</h1>
        </div>
        {!isAuthPage && (
          <>
            <div className={styles.search}>
              <Input
                placeholder="어떤 상품을 찾으시나요?"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <SearchIcon
                className={styles.search_icon}
                onClick={handleSearch}
              />
            </div>
            <div className={styles.header_right}>
              <HeartIcon
                className={styles.heart_icon}
                onClick={handleHeartClick}
              />
              <BellIcon
                className={styles.bell_icon}
                onClick={handleBellClick}
              />
            </div>
          </>
        )}
      </header>
      {!isAuthPage && <NavBar />}
    </>
  );
};

export default Header;
