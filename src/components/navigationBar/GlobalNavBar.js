import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../api/PostApi";
import styles from "./GlobalNavBar.module.css";

// 이미지
import { ReactComponent as HomeIcon } from "./images/home_icon.svg";

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

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
