import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";
import { useUser } from "../../../utils/UserContext";
import { saveTempPayment } from "../../../api/PaymentApi";
import styles from "./CheckoutPage.module.css";
import { Button } from "../../../components/StyledComponents";

const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;

export function CheckoutPage() {
  const [payment, setPayment] = useState(null);
  const [amount, setAmount] = useState({
    currency: "KRW",
    value: 0,
  });
  const { user } = useUser();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("CARD");

  useEffect(() => {
    // URL에서 amount 파라미터 추출
    const searchParams = new URLSearchParams(window.location.search);
    const value = parseInt(searchParams.get("amount") || "0", 10);

    setAmount({
      currency: "KRW",
      value,
    });
  }, []);

  function selectPaymentMethod(method) {
    setSelectedPaymentMethod(method);
  }

  useEffect(() => {
    async function fetchPayment() {
      try {
        // 결제창 초기화
        const tossPayments = await loadTossPayments(clientKey);

        // 회원 결제에 필요한 고유 customerKey 설정
        const customerKey = `USER_${user.userId}`;

        const payment = tossPayments.payment({
          customerKey,
        });

        setPayment(payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }

    fetchPayment();
  }, [user]);

  async function requestPayment() {
    if (!selectedPaymentMethod) {
      alert("결제 수단을 선택하세요.");
      return;
    }

    const orderId = `ORDER_${new Date().getTime()}`; // 고유 orderId 설정
    const orderName = `포인트 ${amount.value.toLocaleString()}원 충전`;
    const successUrl = `${window.location.origin}/payments/success`;
    const failUrl = `${window.location.origin}/payments/fail`;

    try {
      // 결제 임시 데이터 저장
      await handleSaveTempPayment(orderId, amount.value);

      // 결제창 오픈
      await payment.requestPayment({
        method: selectedPaymentMethod,
        amount,
        orderId,
        orderName,
        successUrl,
        failUrl,
        customerEmail: user.email,
        customerName: user.nickname,
        card: {
          useEscrow: false,
          flowMode: "DEFAULT",
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
    } catch (error) {
      console.error(error);
      alert("결제 요청 중 문제가 발생했습니다.");
    }
  }

  const handleSaveTempPayment = async (orderId, amount) => {
    try {
      await saveTempPayment(orderId, amount);
    } catch (error) {
      console.error("Failed to save temporary payment data:", error);
      throw error; // 결제 요청 중단
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>결제 방법</h1>
      <div id="payment-method" className={styles.payment_container}>
        <button
          className={`${styles.payment_button} ${
            selectedPaymentMethod === "CARD" ? styles.active : ""
          }`}
          onClick={() => selectPaymentMethod("CARD")}
        >
          카드·간편결제
        </button>
        <button
          className={`${styles.payment_button} ${
            selectedPaymentMethod === "TRANSFER" ? styles.active : ""
          }`}
          onClick={() => selectPaymentMethod("TRANSFER")}
        >
          계좌이체
        </button>
        <button
          className={`${styles.payment_button} ${
            selectedPaymentMethod === "VIRTUAL_ACCOUNT" ? styles.active : ""
          }`}
          onClick={() => selectPaymentMethod("VIRTUAL_ACCOUNT")}
        >
          가상계좌
        </button>
        <button
          className={`${styles.payment_button} ${
            selectedPaymentMethod === "MOBILE_PHONE" ? styles.active : ""
          }`}
          onClick={() => selectPaymentMethod("MOBILE_PHONE")}
        >
          휴대폰
        </button>
      </div>
      <Button className={styles.button} onClick={() => requestPayment()}>
        다음
      </Button>
    </div>
  );
}

export default CheckoutPage;
