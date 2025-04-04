// components/Login.tsx

"use client";

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { authServices } from "../firebase/services";

export default function Login() {
  const [email, setEmail] = useState(""); // 儲存用戶的電子郵件
  const [password, setPassword] = useState(""); // 儲存用戶的密碼
  const [loading, setLoading] = useState(false); // 控制是否正在加載
  const [error, setError] = useState(""); // 儲存錯誤訊息

  // 處理表單提交
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // 清除之前的錯誤訊息
    setLoading(true); // 開始加載

    try {
      const result = await authServices.login(email, password); // 調用登入服務

      if (result.success) {
        // 登入成功，跳轉到主頁
        window.location.href = "/"; // 或者使用 Next.js 的 router.push("/")
      } else {
        setError(result.error ?? "登入失敗"); // 顯示錯誤訊息
      }
    } catch (err) {
      console.error("登入過程發生錯誤", err);
      setError("登入過程中發生錯誤，請稍後再試"); // 顯示異常錯誤
    } finally {
      setLoading(false); // 完成後，設置為非加載狀態
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* 標題 */}
        <Typography variant="h4" align="center" gutterBottom>
          登入
        </Typography>

        {/* 顯示錯誤訊息 */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* 登入表單 */}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '80%' }}>
          {/* 電子郵件輸入框 */}
          <TextField
            label="電子郵件"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            autoFocus
            sx={{ 
              mb: 2,          // 設定下方間距
              height: 'px',  // 增加輸入框高度
              fontSize: '1.25rem', // 增加字體大小
            }}
          />

          {/* 密碼輸入框 */}
          <TextField
            label="密碼"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ mb: 2 }}
          />

          {/* 登入按鈕 */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading} // 禁用按鈕，直到請求完成
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "登入"}
          </Button>

          {/* 忘記密碼鏈接 */}
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Link href="/reset-password">
              <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
                忘記密碼？
              </Typography>
            </Link>
          </Box>
        </Box>

        {/* 註冊鏈接 */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2">
            還沒有帳號？{" "}
            <Link href="/register">
              <Typography component="span" color="primary" sx={{ cursor: "pointer" }}>
                註冊新帳號
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
