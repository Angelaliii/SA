import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseconfig";
import { toast } from "react-toastify";


function Login(){
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      toast.success("登入成功！", {
        position: "top-center",
      });
      window.location.href = "./PlatformLanding"; // 可改為 useNavigate()
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>登入</h3>

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="請輸入 Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </div>

      <div className="mb-3">
        <label>密碼</label>
        <input
          type="password"
          className="form-control"
          placeholder="請輸入密碼"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          登入
        </button>
      </div>

      <p className="forgot-password text-right">
        新用戶？<a href="./RegisterPage">點此註冊</a>
      </p>
    </form>
  );
}

export default Login;
