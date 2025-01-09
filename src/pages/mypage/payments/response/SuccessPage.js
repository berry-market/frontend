import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./ResponsePage.module.css";
import { useUser } from "../../../../utils/UserContext";
import { confirmPayment } from "../../../../api/PaymentApi";
import { Button } from "../../../../components/StyledComponents";

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);
  const { user } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleConfirmPayment() {
    if (isProcessing) return; // 중복 요청 방지
    setIsProcessing(true);

    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
      buyerId: user.userId,
    };

    try {
      const response = await confirmPayment(requestData);

      setResponseData(response.data); // 성공 시 응답 데이터 저장
      setIsSuccess(true);
    } catch (error) {
      // 실패 시 실패 페이지로 이동
      const errorMessage = error.response?.data?.message || "결제 실패";
      const errorCode = error.response?.data?.code || "UNKNOWN_ERROR";
      navigate(`/payments/fail?code=${errorCode}&message=${errorMessage}`);
    } finally {
      setIsProcessing(false); // 요청 처리 완료
    }
  }

  function handleClose() {
    if (window.opener) {
      window.close();
    } else {
      navigate(-1);
    }
  }

  return (
    <div className={styles.wrapper}>
      <img
        className={styles.image}
        src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
      />
      {!isSuccess ? (
        <>
          <h1>결제를 확인해주세요</h1>
          <div className={styles.info_container}>
            <div className={styles.info_item}>
              <b>결제금액:</b>
              <div id="amount">
                {`${Number(searchParams.get("amount")).toLocaleString()}원`}
              </div>
            </div>
            <div className={styles.info_item}>
              <b>주문번호:</b>
              <div>{`${searchParams.get("orderId")}`}</div>
            </div>
            <div className={styles.info_item}>
              <b>paymentKey:</b>
              <div id="paymentKey">{`${searchParams.get("paymentKey")}`}</div>
            </div>
          </div>
          <Button
            className={styles.button}
            onClick={handleConfirmPayment}
            disabled={isProcessing} // 중복 클릭 방지
          >
            확인하기
          </Button>
        </>
      ) : (
        <>
          <h1>승인 완료되었습니다</h1>
          <div className={styles.info_container}>
            <b>Response Data:</b>
            <div id="response">
              {responseData && (
                <pre>{JSON.stringify(responseData, null, 4)}</pre>
              )}
            </div>
          </div>
          <Button className={styles.button} onClick={handleClose}>
            닫기
          </Button>
        </>
      )}
    </div>
  );
}

export default SuccessPage;
