import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PostDetail.module.css";
import { getPost, deleteLike, createLike } from "../../../api/PostApi";
import { Button } from "../../../components/StyledComponents";
import ProductDetail from "./ProductDetail";
import SellerDetail from "./SellerDetail";

// 이미지
import noImage from "../../../components/post/images/no_image.svg";
import { ReactComponent as LikeIcon } from "../../../components/post/images/like_icon.svg";
import { ReactComponent as ClockIcon } from "../../../components/post/images/clock_icon.svg";

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("product");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPost(postId);
        setPost(response.data);
        setLiked(response.data.isLiked);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setError("게시글을 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!post) return <p>게시글이 존재하지 않습니다.</p>;

  const {
    writerId,
    productDetailsImages = [],
    productImage,
    productName = "상품명 없음",
    immediatePrice = 0,
    auctionStartedAt,
    auctionEndedAt,
    startedPrice = 0,
    deliveryMethod = "정보 없음",
    deliveryFee = 0,
    productContent = "상품 설명 없음",
    likeCount = 0,
    viewCount = 0,
    bidPrice,
  } = post;

  const formatDateTime = (dateString) => {
    if (!dateString) return "정보 없음";
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}`;
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
      console.error("Failed to update like:", error);
    }
  };

  const handleBidClick = () => {
    navigate("/bid-chat");
  };

  const renderTabContent = () => {
    if (activeTab === "product") {
      return (
        <ProductDetail images={productDetailsImages} content={productContent} />
      );
    }
    if (activeTab === "seller") {
      return <SellerDetail writerId={writerId} postId={postId} />;
    }
    return null;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.detail_header}>
        <p className={styles.view_count}>조회수 {viewCount}</p>
        <div className={styles.button_container}>
          <Button>수정</Button>
          <Button>삭제</Button>
        </div>
      </div>
      <div className={styles.detail_container}>
        <div className={styles.image_container}>
          <img
            src={productImage || noImage}
            alt={productName}
            className={styles.product_image}
            onError={(e) => (e.target.src = noImage)}
          />
        </div>
        <div className={styles.contents}>
          <div className={styles.contents_top}>
            <h4 className={styles.product_name}>{productName}</h4>
            <div className={styles.like_containaer}>
              <button onClick={handleLikeToggle} aria-label="찜하기">
                {liked ? (
                  <LikeIcon className={styles.like_fill} />
                ) : (
                  <LikeIcon className={styles.like_empty} />
                )}
              </button>
              <span className={styles.like_count}>{likeCount}</span>
            </div>
          </div>
          <div className={styles.contents_middle}>
            <div className={styles.immediate_price_container}>
              <span className={styles.immediate_price}>즉시구매가</span>
              <span>{immediatePrice.toLocaleString()}원</span>
            </div>
            <div className={styles.bid_period_container}>
              <ClockIcon className={styles.clock_icon} />
              <p className={styles.bid_period}>
                {formatDateTime(auctionStartedAt)} -{" "}
                {formatDateTime(auctionEndedAt)}
              </p>
            </div>
          </div>
          <div className={styles.contents_bottom}>
            <div className={styles.info_container}>
              <dl>
                <div className={styles.info_row}>
                  <dt>시작가</dt>
                  <dd>{startedPrice.toLocaleString()}원</dd>
                </div>
                <div className={styles.info_row}>
                  <dt>현재가</dt>
                  <dd>
                    {bidPrice ? `${bidPrice.toLocaleString()}원` : "낙찰 전"}
                  </dd>
                </div>
                <div className={styles.info_row}>
                  <dt>배송방법</dt>
                  <dd>{deliveryMethod}</dd>
                </div>
                <div className={styles.info_row}>
                  <dt>배송비</dt>
                  <dd>
                    {deliveryFee === 0
                      ? "무료"
                      : `${deliveryFee.toLocaleString()}원`}
                  </dd>
                </div>
              </dl>
            </div>
            <Button className={styles.bidButton} onClick={handleBidClick}>
              경매 참여하기
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.detail_nav}>
        <div className={styles.tabs}>
          <Button
            className={`${styles.tab} ${
              activeTab !== "product" ? styles.inactive : ""
            }`}
            onClick={() => setActiveTab("product")}
          >
            상품정보
          </Button>
          <Button
            className={`${styles.tab} ${
              activeTab !== "seller" ? styles.inactive : ""
            }`}
            onClick={() => setActiveTab("seller")}
          >
            판매자정보
          </Button>
        </div>
        <div className={styles.tab_content}>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default PostDetail;
