import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useUser } from "../../../utils/UserContext";
import { getUserById } from "../../../api/UserApi";
import { Button } from "../../../components/StyledComponents";

// 이미지
import { ReactComponent as UserIcon } from "./images/user_icon.svg";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserById(user.userId);
        setUserInfo(data.data);
      } catch (error) {
        console.error("Failed to fetch user info", error);
      }
    };

    fetchUserInfo();
  }, [user.userId]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile_container}>
        <div className={styles.image_container}>
          {userInfo.profileImage ? (
            <div className={styles.image_wrapper}>
              <img
                src={userInfo.profileImage}
                alt="Profile"
                className={styles.profile_image}
              />
            </div>
          ) : (
            <div className={styles.image_wrapper}>
              <UserIcon className={styles.default_image} />
            </div>
          )}
        </div>
        <div className={styles.info_container}>
          <div className={styles.info}>
            <h2>아이디</h2>
            <p>{userInfo.nickname}</p>
          </div>
          <div className={styles.info}>
            <h2>이메일</h2>
            <p>{userInfo.email}</p>
            <Button>변경</Button>
          </div>
          <div className={styles.info}>
            <h2>포인트</h2>
            <p>{userInfo.point.toLocaleString()}</p>
            <Button>충전</Button>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button>비밀번호 변경</button>
        <button>회원 탈퇴</button>
      </div>
    </div>
  );
};

export default Profile;
