import { useEffect, useState } from "react";
import styles from "./PostMain.module.css";
import { getPosts } from "../../api/PostApi";
import PostCard from "../../components/post/PostCard";

const PostMain = () => {
  const [hotPosts, setHotPosts] = useState([]);
  const [closingSoonPosts, setClosingSoonPosts] = useState([]);

  const [currentIndexHot, setCurrentIndexHot] = useState(0);
  const [currentIndexClosing, setCurrentIndexClosing] = useState(0);

  const postsPerView = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const hotResponse = await getPosts({
          type: "likes_count",
          size: 10,
          page: 0,
        });
        setHotPosts(hotResponse.data.content || []);
        const closingResponse = await getPosts({
          type: "auction_ended_at",
          size: 10,
          page: 0,
        });
        setClosingSoonPosts(closingResponse.data.content || []);
      } catch (error) {
        console.error("게시글을 불러오는데 실패했습니다.", error);
      }
    };
    fetchPosts();
  }, []);

  const handlePrevHot = () => {
    if (currentIndexHot > 0) {
      setCurrentIndexHot(currentIndexHot - 1);
    }
  };

  const handleNextHot = () => {
    if (currentIndexHot + postsPerView < hotPosts.length) {
      setCurrentIndexHot(currentIndexHot + 1);
    }
  };

  const handlePrevClosing = () => {
    if (currentIndexClosing > 0) {
      setCurrentIndexClosing(currentIndexClosing - 1);
    }
  };

  const handleNextClosing = () => {
    if (currentIndexClosing + postsPerView < closingSoonPosts.length) {
      setCurrentIndexClosing(currentIndexClosing + 1);
    }
  };

  const visibleHotPosts = hotPosts.slice(
    currentIndexHot,
    currentIndexHot + postsPerView
  );
  const visibleClosingPosts = closingSoonPosts.slice(
    currentIndexClosing,
    currentIndexClosing + postsPerView
  );

  return (
    <div className={styles.post_main}>
      <section className={styles.hot_posts}>
        <div className={styles.title}>
          <div className={styles.eng_title}>Hot Auction</div>
          <div className={styles.kor_title}>지금 핫한 경매 상품</div>
        </div>
        {hotPosts.length > 0 ? (
          <div className={styles.slider}>
            <div className={styles.slider_button}>
              <button
                className={styles.prev_button}
                onClick={handlePrevHot}
                disabled={currentIndexHot === 0}
              >
                &lt;
              </button>
              <button
                className={styles.next_button}
                onClick={handleNextHot}
                disabled={currentIndexHot + postsPerView >= hotPosts.length}
              >
                &gt;
              </button>
            </div>
            <div className={styles.posts_container}>
              {visibleHotPosts.map((post) => (
                <PostCard
                  key={post.postId}
                  postId={post.postId}
                  productStatus={post.productStatus}
                  isLiked={post.isLiked}
                  viewCount={post.viewCount}
                  productImage={post.productImage}
                  productName={post.productName}
                  immediatePrice={post.immediatePrice}
                  auctionStartedAt={post.auctionStartedAt}
                  auctionEndedAt={post.auctionEndedAt}
                  className={styles.post_card}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.no_content}>
            지금 핫한 경매 상품 게시글이 없습니다.
          </div>
        )}
      </section>
      <section className={styles.closing_posts}>
        <div className={styles.title}>
          <div className={styles.eng_title}>Closing Soon</div>
          <div className={styles.kor_title}>종료임박 경매 상품</div>
        </div>
        {closingSoonPosts.length > 0 ? (
          <div className={styles.slider}>
            <div className={styles.slider_button}>
              <button
                className={styles.prev_button}
                onClick={handlePrevClosing}
                disabled={currentIndexClosing === 0}
              >
                &lt;
              </button>
              <button
                className={styles.next_button}
                onClick={handleNextClosing}
                disabled={
                  currentIndexClosing + postsPerView >= closingSoonPosts.length
                }
              >
                &gt;
              </button>
            </div>
            <div className={styles.posts_container}>
              {visibleClosingPosts.map((post) => (
                <PostCard
                  key={post.postId}
                  postId={post.postId}
                  productStatus={post.productStatus}
                  isLiked={post.isLiked}
                  viewCount={post.viewCount}
                  productImage={post.productImage}
                  productName={post.productName}
                  immediatePrice={post.immediatePrice}
                  auctionStartedAt={post.auctionStartedAt}
                  auctionEndedAt={post.auctionEndedAt}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.no_content}>
            종료임박 경매 상품이 없습니다.
          </div>
        )}
      </section>
    </div>
  );
};

export default PostMain;
