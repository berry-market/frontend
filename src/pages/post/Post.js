import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./Post.module.css";
import { getPosts } from "../../api/PostApi";
import PostCard from "../../components/post/PostCard";
import { Button, CustomDropdown } from "../../components/StyledComponents";

const Post = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [size, setSize] = useState(10);
  const [sortOption, setSortOption] = useState("latest");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const paramsObject = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const requestParams = {
          ...paramsObject,
          size,
          sort: sortOption,
          page: currentPage,
        };
        const response = await getPosts(requestParams);
        setPosts(response.data.content);
        setTotalPages(response.data.totalPages);
        console.log(requestParams);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };
    fetchPosts();
  }, [paramsObject, size, sortOption, currentPage]);

  const handleSortChange = (option) => {
    setSortOption(option.value);
    setCurrentPage(0);
  };

  const handleSizeChange = (option) => {
    setSize(Number(option.value));
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.option_container}>
          <div className={styles.option}>
            <CustomDropdown
              options={[
                { value: 10, label: "10개씩 보기" },
                { value: 30, label: "30개씩 보기" },
                { value: 50, label: "50개씩 보기" },
              ]}
              value={{ value: size, label: `${size}개씩 보기` }}
              onChange={handleSizeChange}
            />
          </div>
          <div className={styles.option}>
            <CustomDropdown
              options={[
                { value: "latest", label: "최신순" },
                { value: "old", label: "오래된순" },
                { value: "auction_ended_at", label: "마감임박순" },
                { value: "view_count", label: "조회수순" },
                { value: "likes_count", label: "찜많은순" },
              ]}
              value={{
                value: sortOption,
                label:
                  sortOption === "latest"
                    ? "최신순"
                    : sortOption === "old"
                    ? "오래된순"
                    : sortOption === "auction_ended_at"
                    ? "마감임박순"
                    : sortOption === "view_count"
                    ? "조회수순"
                    : "찜많은순",
              }}
              onChange={handleSortChange}
            />
          </div>
        </div>
        <div>
          <Button>판매글 등록</Button>
        </div>
      </div>

      {posts.length > 0 ? (
        <>
          <div className={styles.post_container}>
            {posts.map((post) => (
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
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className={styles.page_button}
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={
                  currentPage === index
                    ? styles.active_page
                    : styles.page_button
                }
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
              className={styles.page_button}
            >
              {">"}
            </button>
          </div>
        </>
      ) : (
        <p>등록된 상품이 없습니다.</p>
      )}
    </div>
  );
};

export default Post;
