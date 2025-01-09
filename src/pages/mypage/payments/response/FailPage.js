import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./ResponsePage.module.css";
import { Button } from "../../../../components/StyledComponents";

export function FailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function handleClose() {
    if (window.opener) {
      window.close();
    } else {
      navigate(-1);
    }
  }

  return (
    <div id="info" className={styles.wrapper}>
      <img
        className={styles.fail_image}
        src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
        alt="에러 이미지"
      />
      <h1>결제를 실패했어요</h1>

      <div className={styles.info_container}>
        <div className={styles.info_item}>
          <b>에러메시지</b>
          <div id="message">{`${searchParams.get("message")}`}</div>
        </div>
        <div className={styles.info_item}>
          <b>에러코드</b>
          <div id="code">{`${searchParams.get("code")}`}</div>
        </div>
        <Button className={styles.button} onClick={handleClose}>
          닫기
        </Button>
      </div>
    </div>
  );
}

export default FailPage;
