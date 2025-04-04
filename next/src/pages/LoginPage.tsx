import { Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import styles from "../assets/globals.module.css";
import Login from "../components/Login";
import Navbar from "../components/Navbar";

export default function LoginPage() {
  return (
    <div className={styles.page}>
      
      {/* Container 最大寬度為 sm */}
      <Container maxWidth="sm">
        
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center', // 水平居中
            alignItems: 'center', // 垂直居中
            height: '100vh' // 讓容器佔滿整個視窗高度
          }}
        >
          <Box sx={{ textAlign: 'center', width: '100%' }}>


            <Typography variant="h3" component="h1" align="center" className={styles.pageTitle}>
              歡迎回來
            </Typography>
            <Typography color="textSecondary" align="center" className={styles.subtitle}>
              登入以使用所有功能
            </Typography>
            <Login />
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Button
                component={Link}
                href="/"
                variant="outlined"
                color="primary"
                sx={{ textDecoration: "none" }}
              >
                返回首頁
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
