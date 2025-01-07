import { Link, useNavigate } from "react-router-dom";
import styles from "./HeaderTop.module.css";
import { logout } from "../../api/AuthApi";

const HeaderTop = () => {
  const navigate = useNavigate();

  // 로그인 상태 확인 : Authorization 토큰 체크
  const isLoggedIn = Boolean(localStorage.getItem("Authorization"));

  const handleLogout = async () => {
    try {
      await logout();

      // 성공하면 로컬스토리지에서 토큰 제거 및 로그인 페이지로 이동
      localStorage.removeItem("Authorization");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.nav_wrapper}>
        <div className={styles.nav}>
          {isLoggedIn ? (
            <>
              <span onClick={handleLogout} className={styles.nav_item}>
                로그아웃
              </span>
              <Link to="/mypages/profile" className={styles.nav_item}>
                마이페이지
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.nav_item}>
                로그인
              </Link>
              <Link to="/signup" className={styles.nav_item}>
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderTop;
