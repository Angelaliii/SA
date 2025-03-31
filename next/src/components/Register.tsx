import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebaseconfig";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // 開始載入
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user; // 從 userCredential 取得 user 資料
      console.log(user);

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          Name: name,
        });
        console.log("User Registered Successfully!!");
        toast.success("User Registered Successfully!!", {
          position: "top-center",
          autoClose: 3000, // 顯示時間3秒
        });
      }
    } catch (error: any) {
      console.log(error.message);
      // 更具體的錯誤處理
      const errorMessage = error.code === "auth/email-already-in-use"
        ? "該 Email 已被註冊"
        : error.message;
      toast.error(errorMessage, {
        position: "bottom-center",
        autoClose: 3000, // 顯示時間3秒
      });
    } finally {
      setLoading(false); // 完成註冊後，關閉 loading
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3>註冊</h3>

      <div className="mb-3">
        <label>名字</label>
        <input
          type="text"
          className="form-control"
          placeholder="名字"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          required
        />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          required
        />
      </div>

      <div className="mb-3">
        <label>密碼</label>
        <input
          type="password"
          className="form-control"
          placeholder="密碼"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "註冊中..." : "註冊"}
        </button>
      </div>
      <p className="forgot-password text-right">
        已經註冊過了？<a href="./LoginPage">登入</a>
      </p>
    </form>
  );
}

export default Register;
