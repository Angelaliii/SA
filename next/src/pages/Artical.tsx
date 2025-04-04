"use client"; // 表示此程式碼僅在客戶端執行

import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material"; // 引入 Material-UI 組件
import { useRouter } from "next/router"; // 用於路由導航
import * as React from "react"; // 引入 React
import { auth } from "../firebase/config"; // 引入 Firebase 設定
import { postService } from "../firebase/services"; // 引入文章服務層

// 定義文章位置和標籤選項
const postLocations = ["企業版", "社團版"];
const tagOptions = ["教學", "科技", "活動"];

export default function PublishPage() {
  // 狀態管理
  const [location, setLocation] = React.useState(""); // 儲存發文位置
  const [title, setTitle] = React.useState(""); // 儲存標題
  const [content, setContent] = React.useState(""); // 儲存文章內容
  const [tags, setTags] = React.useState<string[]>([]); // 儲存選中的標籤
  const [loading, setLoading] = React.useState(false); // 儲存發文狀態（是否正在加載）
  const [openSnackbar, setOpenSnackbar] = React.useState(false); // 控制 Snackbar 顯示
  const [snackbarMessage, setSnackbarMessage] = React.useState(""); // Snackbar 顯示的訊息
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<"success" | "error">("success"); // Snackbar 顯示的類型（成功或錯誤）
  const router = useRouter(); // 用於導航

  // 發布文章的處理函數
  const handlePublish = async () => {
    // 表單驗證
    if (!location || !title || !content) {
      setSnackbarMessage("請填寫所有必填欄位"); // 若有空白欄位，顯示錯誤訊息
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    setLoading(true); // 設定為加載狀態
    try {
      const currentUser = auth.currentUser; // 獲取當前登入的用戶
      if (!currentUser) {
        setSnackbarMessage("請先登入"); // 若用戶未登入，提示用戶
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        setLoading(false);
        return;
      }

      // 呼叫 postService 發布文章
      const result = await postService.createPost({
        title,
        content,
        location,
        tags,
        authorId: currentUser.uid, // 使用當前用戶的 UID
      });

      if (result.success) {
        setSnackbarMessage("文章發布成功"); // 發布成功
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        // 重設表單
        setTitle("");
        setContent("");
        setLocation("");
        setTags([]);
        // 可選：導航到文章列表頁面
        setTimeout(() => {
          router.push("/"); // 2秒後導航到首頁
        }, 1500);
      } else {
        throw new Error("發布失敗"); // 若發布失敗，拋出錯誤
      }
    } catch (error) {
      console.error("發布文章時出錯:", error); // 捕獲錯誤並顯示錯誤訊息
      setSnackbarMessage("發布失敗，請稍後再試");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false); // 完成後設為非加載狀態
    }
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          {/* 標題 */}
          <Typography variant="h5" align="center" gutterBottom>
            發布文章
          </Typography>

          {/* 發布表單 */}
          <Stack spacing={2} mt={2}>
            {/* 發文位置選擇 */}
            <Select
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled hidden>
                請選擇發文位置
              </MenuItem>
              {postLocations.map((loc) => (
                <MenuItem key={loc} value={loc}>
                  {loc}
                </MenuItem>
              ))}
            </Select>

            {/* 標題輸入框 */}
            <TextField
              fullWidth
              label="標題"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* 內容輸入框 */}
            <TextField
              fullWidth
              label="文章內容"
              multiline
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="請輸入文章內容"
            />

            {/* 標籤選擇框 */}
            <Autocomplete
              multiple
              options={tagOptions}
              value={tags}
              onChange={(_, newValue) => setTags(newValue)}
              renderInput={(params) => <TextField {...params} label="標籤" />}
            />

            {/* 發布按鈕 */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePublish}
              disabled={loading}
            >
              {loading ? "發布中..." : "發文"} {/* 按鈕文字會根據加載狀態改變 */}
            </Button>
          </Stack>
        </Paper>
      </Container>

      {/* Snackbar 訊息 */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage} {/* 顯示 Snackbar 訊息 */}
        </Alert>
      </Snackbar>
    </Box>
  );
}
