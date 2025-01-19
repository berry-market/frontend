import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, checkIdDuplicate } from "../../api/UserApi";
import styles from "./Signup.module.css";
import { Button, Input, ErrorMessage } from "../../components/StyledComponents";

// 이미지
import { ReactComponent as EyeIcon } from "../login/images/eye_icon.svg";
import { ReactComponent as CloseEyeIcon } from "../login/images/close_eye_icon.svg";

const SignupPage = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [errorNickname, setErrorNickname] = useState("");
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(null);
  const [isNicknameValid, setIsNicknameValid] = useState(null);

  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [seePasswordConfirm, setSeePasswordConfirm] = useState(false);
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (isNicknameDuplicate === null) {
      alert("아이디 중복확인을 해주세요");
      return;
    }

    if (
      !nickname || // 닉네임 입력이 비었는지 확인
      !email || // 이메일 입력이 비었는지 확인
      !password || // 비밀번호 입력이 비었는지 확인
      errorNickname !== "" || // 닉네임 에러 메시지가 존재하는지 확인
      errorEmail !== "" || // 이메일 에러 메시지가 존재하는지 확인
      errorPassword !== "" || // 비밀번호 에러 메시지가 존재하는지 확인
      errorPasswordConfirm !== ""
    ) {
      alert("입력 정보를 다시 확인해주세요.");
      return;
    }

    try {
      const member = {
        nickname,
        email,
        password,
      };

      await signup(member);
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("회원가입 중 오류가 발생했습니다:", error);
      alert("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleNickname = (e) => {
    setNickname(e.target.value);

    if (validateNickname(e.target.value)) {
      setIsNicknameValid(true);
      setErrorNickname("");
    } else {
      setIsNicknameValid(false);
      setErrorNickname(
        "아이디는 영소문자, 숫자를 포함하여 5~20자로 입력해주세요."
      );
    }
    setIsNicknameDuplicate(null);
  };

  const validateNickname = (nickname) => {
    const regex = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{5,20}$/;
    return regex.test(nickname);
  };

  const handleNicknameDuplicate = async (e) => {
    e.preventDefault();

    if (!isNicknameValid) {
      setErrorNickname("유효하지 않은 아이디 입니다.");
      return;
    }
    try {
      const isDuplicate = await checkIdDuplicate(nickname);
      if (isDuplicate.data) {
        setIsNicknameDuplicate(true);
        alert("이미 사용 중인 아이디입니다.");
      } else {
        setIsNicknameDuplicate(false);
        alert("사용 가능한 아이디입니다.");
      }
    } catch (error) {
      alert("중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.log(error);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const isValid = validateEmail(e.target.value);
    if (!isValid) {
      setErrorEmail("이메일 형식이 올바르지 않습니다.");
    } else {
      setErrorEmail("");
    }
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    const isValid = vaildatePassword(e.target.value);
    if (!isValid) {
      setErrorPassword(
        "비밀번호는 영문자, 숫자, 특수문자를 포함하여 8~50자로 입력해주세요."
      );
    } else {
      setErrorPassword("");
    }
  };

  const vaildatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
    return regex.test(password);
  };

  const seePasswordHandler = () => {
    setSeePassword(!seePassword);
  };

  const handlePasswordConfirm = (e) => {
    if (e.target.value !== password) {
      setErrorPasswordConfirm("비밀번호가 맞지 않습니다.");
    } else {
      setErrorPasswordConfirm("");
    }
  };

  const seePasswordConfirmHandler = () => {
    setSeePasswordConfirm(!seePasswordConfirm);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.signup_container}>
        <h1 className={styles.title}>회원가입</h1>
        <div className={styles.form}>
          <form onSubmit={handleSignup}>
            <div className={styles.form_item}>
              <label htmlFor="nickname">아이디</label>
              <div className={styles.id_container}>
                <Input
                  type="text"
                  placeholder="영소문자, 숫자 포함 5자 이상"
                  value={nickname}
                  onChange={handleNickname}
                />
                <Button onClick={handleNicknameDuplicate}>중복 확인</Button>
              </div>
              <div className="error_container">
                <ErrorMessage>{errorNickname}</ErrorMessage>
              </div>
            </div>
            <div className={styles.form_item}>
              <label htmlFor="email">이메일</label>
              <Input
                type="text"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={handleEmail}
              />
              <div className="error_container">
                <ErrorMessage>{errorEmail}</ErrorMessage>
              </div>
            </div>
            <div className={styles.form_item}>
              <label htmlFor="password">비밀번호</label>
              <div className={styles.password_container}>
                <Input
                  type={seePassword ? "text" : "password"}
                  placeholder="영문자, 숫자, 특수문자를 포함하여 8자 이상"
                  value={password}
                  onChange={handlePassword}
                />
                <button
                  type="button"
                  onClick={seePasswordHandler}
                  className={styles.see_pw_button}
                  aria-label={seePassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                >
                  {seePassword ? (
                    <EyeIcon className={styles.eye_icon} />
                  ) : (
                    <CloseEyeIcon className={styles.eye_icon} />
                  )}
                </button>
              </div>
              <div className="error_container">
                <ErrorMessage>{errorPassword}</ErrorMessage>
              </div>
            </div>
            <div className={styles.form_item}>
              <label htmlFor="password">비밀번호 확인</label>
              <div className={styles.password_container}>
                <Input
                  type={seePasswordConfirm ? "text" : "password"}
                  placeholder="비밀번호를 재입력하세요"
                  onChange={handlePasswordConfirm}
                />
                <button
                  type="button"
                  onClick={seePasswordConfirmHandler}
                  className={styles.see_pw_button}
                  aria-label={
                    seePasswordConfirm ? "비밀번호 숨기기" : "비밀번호 보기"
                  }
                >
                  {seePasswordConfirm ? (
                    <EyeIcon className={styles.eye_icon} />
                  ) : (
                    <CloseEyeIcon className={styles.eye_icon} />
                  )}
                </button>
              </div>
              <div className="error_container">
                <ErrorMessage>{errorPasswordConfirm}</ErrorMessage>
              </div>
            </div>
            <div className={styles.signup_button}>
              <Button type="submit">가입하기</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
