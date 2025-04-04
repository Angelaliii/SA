// Home.tsx
import { Box, Container, Paper, Typography } from "@mui/material";
import NavButton from "../components/NavButton"; // 引入自定義的按鈕組件

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography variant="h3" component="h1" align="center" gutterBottom>
            社團企業媒合平台
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            align="center"
            color="text.secondary"
            gutterBottom
          >
            歡迎使用我們的平台
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              mt: 3,
              flexDirection: { xs: "column", sm: "row" }, // 響應式設計：小螢幕時按鈕會排成一列，大螢幕時排成一行
            }}
          >
            {/* 使用 NavButton 組件，傳入 href 和顯示文字 */}
            <NavButton href="/LoginPage">帳號登入</NavButton>
            <NavButton href="/CompanyRegister">企業註冊</NavButton>
            <NavButton href="/ClubRegister">社團註冊</NavButton>
            <NavButton href="/PlatformLanding">主頁</NavButton>
            <NavButton href="/Artical">文章發布</NavButton>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
