import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import { useUser } from "../../../utils/UserContext";
import { getUserById } from "../../../api/UserApi";
import { Button } from "../../../components/StyledComponents";
import ChargeModal from "../payments/ChargeModal";

// 이미지
import { ReactComponent as UserIcon } from "./images/user_icon.svg";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

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

  const handleChargeClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmModal = (amount) => {
    if (amount > 0) {
      setShowModal(false);
      // 새창으로 Checkout 페이지 열기
      const url = `/payments/checkout?amount=${amount}`;
      // 화면 너비, 높이 가져오기
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
      const width = 700;
      const height = 700;
      const left = (screenWidth - width) / 2;
      const top = (screenHeight - height) / 2;
      const position = `width=${width},height=${height},top=${top},left=${left}`;

      window.open(url, "_blank", position);
    } else {
      alert("유효한 금액을 입력해주세요.");
    }
  };

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
            <Button onClick={handleChargeClick}>충전</Button>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button>비밀번호 변경</button>
        <button>회원 탈퇴</button>
      </div>

      {/* 모달 */}
      {showModal && (
        <ChargeModal
          onClose={handleCloseModal}
          onConfirm={handleConfirmModal}
        />
      )}
    </div>
  );
};

export default Profile;
