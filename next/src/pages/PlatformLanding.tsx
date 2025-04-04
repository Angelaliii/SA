"use client"; // 表示此程式碼僅在客戶端執行

import { useEffect, useState } from "react"; // 引入 React 的狀態管理與副作用處理
import styles from "../assets/Plat.module.css"; // 引入自定義樣式
import Navbar from "../components/Navbar"; // 引入導航欄組件
import { getAllPosts, PostData } from "../firebase/services/post-service"; // 從 Firebase 服務中獲取文章資料

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material"; // 引入 MUI 組件

export default function PlatformLanding() {
  // 狀態管理
  const [searchTerm, setSearchTerm] = useState(""); // 儲存搜尋關鍵字
  const [selectedTag, setSelectedTag] = useState<string | null>("全部"); // 儲存選擇的標籤
  const [posts, setPosts] = useState<PostData[]>([]); // 儲存從 Firebase 獲取的文章資料
  const [loading, setLoading] = useState(true); // 控制是否正在加載資料
  const [availableTags, setAvailableTags] = useState<string[]>(["全部"]); // 儲存可用的標籤，初始為 "全部"

  // 使用副作用來獲取文章資料
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // 開始加載
      try {
        const postsData = await getAllPosts(); // 從 Firebase 獲取所有文章
        setPosts(postsData); // 將文章資料設置到狀態

        // 提取所有文章的標籤
        const tags = postsData.flatMap((post) => post.tags);
        const uniqueTags = ["全部", ...Array.from(new Set(tags))]; // 創建唯一標籤
        setAvailableTags(uniqueTags); // 更新可用的標籤
      } catch (error) {
        console.error("Error fetching posts:", error); // 捕獲並顯示錯誤
      } finally {
        setLoading(false); // 加載完成
      }
    };

    fetchPosts(); // 執行文章獲取
  }, []);

  // 根據搜尋和標籤篩選文章
  const filteredPosts = posts.filter((post) => {
    const matchSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchTag =
      selectedTag === "全部" ? true : post.tags.includes(selectedTag || "");

    return matchSearch && matchTag;
  });

  return (
    <Box className={styles.page}>
      {/* 顯示導航欄 */}
      <Navbar />

      {/* 主內容區 */}
      <main>
        {/* 搜尋框 */}
        <Container sx={{ my: 6 }}>
          <TextField
            fullWidth
            label="搜尋文章"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 當輸入改變時，更新搜尋關鍵字
          />
        </Container>

        {/* 顯示所有標籤 */}
        <Container sx={{ my: 0 }}>
          <Box sx={{ px: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {availableTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                color={selectedTag === tag ? "primary" : "default"} // 當前選中的標籤顯示為 primary 顏色
                onClick={() => setSelectedTag(tag)} // 點擊標籤時，更新選擇的標籤
                clickable
              />
            ))}
          </Box>
        </Container>

        {/* 顯示文章列表 */}
        <Container
          sx={{ my: 3, display: "flex", flexDirection: "column", gap: 2 }}
        >
          {loading ? (
            // 若正在加載，顯示加載動畫
            <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* 顯示符合條件的文章 */}
              {filteredPosts.map((post) => (
                <Card key={post.id} variant="outlined">
                  <CardContent>
                    {/* 顯示文章標題 */}
                    <Typography variant="h6" component="div">
                      {post.title}
                    </Typography>
                    {/* 顯示文章內容 */}
                    <Typography variant="body2" color="text.secondary">
                      {post.content}
                    </Typography>
                    {/* 顯示文章標籤 */}
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {post.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                    {/* 顯示文章位置 */}
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ mt: 1 }}
                    >
                      {post.location}
                    </Typography>
                  </CardContent>
                  {/* 顯示卡片操作按鈕 */}
                  <CardActions>
                    <Button size="small">閱讀更多</Button>
                  </CardActions>
                </Card>
              ))}
              {/* 若無符合的文章，顯示提示訊息 */}
              {filteredPosts.length === 0 && !loading && (
                <Typography variant="body1">找不到符合的文章</Typography>
              )}
            </>
          )}
        </Container>
      </main>
    </Box>
  );
}
