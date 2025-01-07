import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../utils/UserContext";
import { Input, Button, ErrorMessage } from "../../components/StyledComponents";
import { login } from "../../api/AuthApi";
import styles from "./Login.module.css";

// 이미지
import { ReactComponent as EyeIcon } from "./images/eye_icon.svg";
import { ReactComponent as CloseEyeIcon } from "./images/close_eye_icon.svg";

const Login = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [error, setError] = useState({});
  const { loginContext } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // 비밀번호 공개 여부 표시
  const seePasswordHandler = () => {
    setSeePassword(!seePassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationError = {};
    if (!nickname) validationError.nickname = "아이디를 입력하세요.";
    if (!password) validationError.password = "비밀번호를 입력하세요.";

    setError(validationError);

    if (Object.keys(validationError).length > 0) {
      return;
    }

    const data = {
      nickname,
      password,
    };

    try {
      const response = await login(data);
      const { accessToken, userId, nickname, role } = response.data.data;

      // 로컬스토리지에 토큰 저장
      localStorage.setItem("Authorization", `Bearer ${accessToken}`);

      // UserContext에 사용자 정보 저장
      loginContext({ userId, nickname, role });

      // 로그인 후 페이지 이동
      const defaultPath = role === "ADMIN" ? "/admin/users" : "/";
      const redirectTo = location.state?.from?.pathname || defaultPath;
      window.location.href = redirectTo;
    } catch (error) {
      console.error("Login failed:", error);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.login_container}>
        <h1 className={styles.title}>로그인</h1>
        <div className={styles.form}>
          <form onSubmit={handleLogin}>
            <div className={styles.form_item}>
              <label htmlFor="nickname">아이디</label>
              <Input
                type="text"
                id="nickname"
                placeholder="아이디를 입력하세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <div className="error_container">
                {error.nickname && (
                  <ErrorMessage>{error.nickname}</ErrorMessage>
                )}
              </div>
            </div>
            <div className={styles.form_item}>
              <label htmlFor="password">비밀번호</label>
              <div className={styles.password_container}>
                <Input
                  type={seePassword ? "text" : "password"}
                  id="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                {error.password && (
                  <ErrorMessage>{error.password}</ErrorMessage>
                )}
              </div>
            </div>
            <div className={styles.login_button}>
              <Button type="submit">로그인</Button>
            </div>
          </form>
        </div>
        <div className={styles.signup}>
          <p>계정이 없으신가요?</p>
          <button onClick={() => navigate("/signup")}>회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
