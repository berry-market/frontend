import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/PostApi";
import styles from "./NavBar.module.css";

// 이미지
import { ReactComponent as HomeIcon } from "./images/home_icon.svg";

const NavBar = () => {
  // 더미 데이터
  const categories = [
    { id: 1, categoryName: "패션·잡화·뷰티" },
    { id: 2, categoryName: "스포츠·취미" },
    { id: 3, categoryName: "디지털·가전" },
    { id: 4, categoryName: "가구·홈데코" },
    { id: 5, categoryName: "식품·생필품" },
    { id: 6, categoryName: "자동차·공구" },
    { id: 7, categoryName: "반려동물 용품" },
    { id: 8, categoryName: "기타" },
  ];

  // const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await getCategories();
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error("Failed to fetch categories", error);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  const handleNavClick = (id) => {
    const queryString = id !== null ? `?categoryId=${id}` : "";
    navigate(`/posts${queryString}`);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.nav_wrapper}>
        <div className={styles.nav_list}>
          <span
            className={`${styles.nav_item} ${styles.nav_home}`}
            onClick={() => handleNavClick(null)}
          >
            <HomeIcon className={styles.home_icon} />
            HOME
          </span>
          {categories.map((category) => (
            <span
              key={category.id}
              className={styles.nav_item}
              onClick={() => handleNavClick(category.id)}
            >
              {category.categoryName}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
