import { NavLink } from "react-router-dom";
import styles from "./MypageNavBar.module.css";

const MypageNavBar = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <div className={styles.title}>마이페이지</div>
      </div>
      <div className={styles.nav_list}>
        <NavLink
          to="/mypages/profile"
          className={({ isActive }) => (isActive ? `${styles.active}` : "")}
        >
          내 정보
        </NavLink>
        <NavLink
          to="/mypages/likes"
          className={({ isActive }) => (isActive ? `${styles.active}` : "")}
        >
          찜 목록
        </NavLink>
        <NavLink
          to="/mypages/points"
          className={({ isActive }) => (isActive ? `${styles.active}` : "")}
        >
          포인트 내역
        </NavLink>
        <NavLink
          to="/mypages/bids"
          className={({ isActive }) => (isActive ? `${styles.active}` : "")}
        >
          낙찰 내역
        </NavLink>
        <NavLink
          to="/mypages/posts"
          className={({ isActive }) => (isActive ? `${styles.active}` : "")}
        >
          내 판매글
        </NavLink>
      </div>
    </nav>
  );
};

export default MypageNavBar;
