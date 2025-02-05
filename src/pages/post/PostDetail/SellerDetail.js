import { useEffect, useState, useRef } from "react";
import styles from "./SellerDetail.module.css";
import { getGradeAverage, getReviews } from "../../../api/PostApi";
import { getUserByWriterId } from "../../../api/UserApi";

// 이미지
import { ReactComponent as UserIcon } from "../../mypage/profile/images/user_icon.svg";
import { ReactComponent as StarIcon } from "./images/star_icon.svg";

const SellerDetail = ({ postId, writerId }) => {
  const [reviews, setReviews] = useState([]);
  const [grade, setGrade] = useState(null);
  const [seller, setSeller] = useState(null);
  const [error, setError] = useState(null);
  const [expandedReviews, setExpandedReviews] = useState({});

  const contentRefs = useRef({});
  const [overflowMap, setOverflowMap] = useState({});

  useEffect(() => {
    const fetchSellerInfo = async () => {
      try {
        const sellerResponse = await getUserByWriterId(writerId);
        setSeller(sellerResponse.data);
      } catch (error) {
        console.error("Failed to fetch user info", error);
        setError("판매자 정보를 불러오는 중 문제가 발생했습니다.");
      }
    };

    const fetchReview = async () => {
      try {
        const reviewResponse = await getReviews();
        setReviews(reviewResponse.data.content || []);

        const gradeResponse = await getGradeAverage(postId);
        setGrade(gradeResponse.data.grade);
      } catch (error) {
        console.error("Failed to fetch review:", error);
        setError("리뷰를 불러오는 중 문제가 발생했습니다.");
      }
    };
    fetchSellerInfo();
    fetchReview();
  }, [postId, writerId]);

  useEffect(() => {
    const newOverflowMap = {};
    Object.keys(contentRefs.current).forEach((key) => {
      const el = contentRefs.current[key];
      if (el) {
        newOverflowMap[key] = el.scrollHeight > el.clientHeight;
      }
    });
    setOverflowMap(newOverflowMap);
  }, [reviews, expandedReviews]);

  const toggleExpand = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.seller_container}>
        <div className={styles.seller_title}>
          <div>판매자</div>
          <span className={styles.report}>신고하기</span>
        </div>
        <div className={styles.seller_info}>
          <div className={styles.image_container}>
            <div className={styles.image_wrapper}>
              {seller && seller.profileImage ? (
                <img
                  src={seller.profileImage}
                  alt="Profile"
                  className={styles.profile_image}
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : (
                <UserIcon className={styles.default_image} />
              )}
            </div>
          </div>
          <span className={styles.seller_nickname}>
            {seller?.nickname || "정보 없음"}
          </span>
        </div>
      </div>
      <div className={styles.review_container}>
        <div className={styles.review_header}>
          <span>판매자가 받은 구매후기</span>
          <span className={styles.seller_score}>
            <StarIcon className={styles.star_icon} />
            <p>{grade !== null ? grade.toFixed(1) : "0.0"}</p>
          </span>
        </div>
        {error ? (
          <p>{error}</p>
        ) : reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className={styles.review_item}>
              <div className={styles.review_left}>
                <StarIcon className={styles.star_icon} />
                <p>{review.reviewScore.toFixed(1)}</p>
              </div>
              <div className={styles.review_middle}>
                <p className={styles.product_name}>
                  [상품] {review.productName}
                </p>
                <div className={styles.content_container}>
                  <span
                    ref={(el) => (contentRefs.current[index] = el)}
                    className={`${styles.content} ${
                      expandedReviews[index] ? styles.expanded : ""
                    }`}
                  >
                    {review.reviewContent}
                  </span>
                  {(overflowMap[index] || expandedReviews[index]) && (
                    <span
                      className={styles.expand_button}
                      onClick={() => toggleExpand(index)}
                    >
                      {expandedReviews[index] ? ">> 숨기기" : ">> 더보기"}
                    </span>
                  )}
                </div>
              </div>
              <div className={styles.review_right}>
                <p className={styles.reviewer}>{review.nickname}</p>
                <p className={styles.date}>
                  {new Date(review.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>등록된 리뷰가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SellerDetail;
