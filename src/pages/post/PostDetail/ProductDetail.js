import { useState } from "react";
import styles from "./ProductDetail.module.css";

// 이미지
import noImage from "../../../components/post/images/no_image.svg";

const ProductDetail = ({ images, content }) => {
  const imagesPerView = 5;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + imagesPerView < images.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const visibleImages = images.slice(
    currentIndex,
    currentIndex + imagesPerView
  );

  return (
    <div className={styles.product_detail}>
      <div className={styles.detail_images}>
        {images.length > 0 ? (
          <div className={styles.slider}>
            {images.length > imagesPerView && (
              <div className={styles.slider_button}>
                <button
                  className={styles.prev_button}
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                >
                  &lt;
                </button>
                <button
                  className={styles.next_button}
                  onClick={handleNext}
                  disabled={currentIndex + imagesPerView >= images.length}
                >
                  &gt;
                </button>
              </div>
            )}
            <div className={styles.images_container}>
              {visibleImages.map((image, index) => (
                <div
                  key={currentIndex + index}
                  className={styles.image_container}
                >
                  <div className={styles.image_wrapper}>
                    <img
                      src={image}
                      alt={`상품 이미지 ${currentIndex + index + 1}`}
                      className={styles.product_image}
                      onError={(e) => (e.target.src = noImage)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>이미지가 없습니다.</p>
        )}
      </div>
      <div className={styles.content_container}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
