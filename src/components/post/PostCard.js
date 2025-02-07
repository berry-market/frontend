import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PostCard.module.css";
import { createLike, deleteLike } from "../../api/PostApi";

// 이미지
import noImage from "./images/no_image.svg";
import { ReactComponent as LikeIcon } from "./images/like_icon.svg";
import { ReactComponent as MoneyIcon } from "./images/money_icon.svg";
import { ReactComponent as ClockIcon } from "./images/clock_icon.svg";

const PostCard = ({
  postId,
  isLiked,
  productName,
  immediatePrice,
  productStatus,
  productImage,
  viewCount,
  auctionStartedAt,
  auctionEndedAt,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const navigate = useNavigate();

  const productStatusMap = {
    PENDING: "경매전",
    ACTIVE: "경매중",
    CLOSED: "경매마감",
  };

  const auctionStatus = productStatusMap[productStatus] || "보류중";

  const handleCardClick = () => {
    navigate(`/posts/details/${postId}`);
  };

  const handleLikeToggle = async () => {
    try {
      if (liked) {
        await deleteLike(postId);
        setLiked(false);
      } else {
        await createLike(postId);
        setLiked(true);
      }
    } catch (error) {
      console.error("Failed to update like", error);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.auction_status} ${styles[productStatus]}`}>
        {auctionStatus}
      </div>
      <div className={styles.image_container} onClick={handleCardClick}>
        {productImage && productImage.trim() ? (
          <div className={styles.image_wrapper}>
            <img
              src={productImage}
              alt={productName}
              className={styles.product_image}
              onError={(e) => (e.target.src = noImage)}
            />
          </div>
        ) : (
          <img
            src={noImage}
            alt="기본 이미지"
            className={styles.product_image}
          />
        )}
        <div className={styles.image_header}>
          <span>조회수 {viewCount}</span>
          <button onClick={handleLikeToggle} aria-label="찜하기">
            {liked ? (
              <LikeIcon className={styles.like_fill} />
            ) : (
              <LikeIcon className={styles.like_empty} />
            )}
          </button>
        </div>
      </div>
      <div className={styles.product_info}>
        <p className={styles.product_name} onClick={handleCardClick}>
          {productName}
        </p>
        <div className={styles.bid_info_container}>
          <MoneyIcon className={styles.money_icon} />
          <p className={styles.immadiate_price}>
            즉구가 {immediatePrice.toLocaleString()}원
          </p>
        </div>
        <div className={styles.bid_info_container}>
          <ClockIcon className={styles.clock_icon} />
          <p className={styles.bid_period}>
            {formatDateTime(auctionStartedAt)} -{" "}
            {formatDateTime(auctionEndedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
