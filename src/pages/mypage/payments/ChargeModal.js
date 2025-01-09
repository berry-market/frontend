import { useState } from "react";
import styles from "./ChargeModal.module.css";
import {
  ModalOverlay,
  Modal,
  Button,
  Input,
  ErrorMessage,
} from "../../../components/StyledComponents";

const ChargeModal = ({ onClose, onConfirm }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!amount || isNaN(amount) || amount < 100) {
      setError("충전 금액은 최소 100포인트 이상이어야 합니다.");
      return;
    }
    setError("");
    onConfirm(Number(amount));
  };

  const handleInputChange = (e) => {
    setAmount(e.target.value);
    if (e.target.value >= 100) {
      setError("");
    }
  };

  return (
    <ModalOverlay>
      <Modal>
        <h2>포인트 충전</h2>
        <Input
          type="number"
          value={amount}
          onChange={handleInputChange}
          placeholder="충전할 포인트 금액을 입력하세요"
          className={styles.input}
        />
        <div className="error_container">
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
        <div className={styles.actions}>
          <Button onClick={onClose} className={styles.cancel_button}>
            취소
          </Button>
          <Button onClick={handleConfirm} className={styles.confirm_button}>
            결제하기
          </Button>
        </div>
      </Modal>
    </ModalOverlay>
  );
};

export default ChargeModal;
