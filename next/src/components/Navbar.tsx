"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState, useEffect } from "react";
import { authServices } from "../firebase/services"; // 假設 authServices 提供了登出功能

const pages = [
  { name: "首頁", path: "/PlatformLanding" },
  { name: "企業列表", path: "/CompanyList" },
  { name: "文章發布", path: "/Artical" },
];

const userOptions = [
  { name: "登入", path: "/LoginPage" },
  { name: "企業註冊", path: "/CompanyRegister" },
  { name: "社團註冊", path: "/ClubRegister" },
];

const userLoggedInOptions = [
  { name: "登出", path: "", icon: <LogoutIcon /> }, // 顯示登出選項
];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 用來判斷用戶是否登入

  // 開啟導航菜單
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  // 開啟用戶菜單
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // 關閉導航菜單
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // 關閉用戶菜單
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // 登出處理
  const handleLogout = async () => {
    await authServices.logout(); // 調用登出方法
    setIsLoggedIn(false); // 登出後設置為未登入
    handleCloseUserMenu(); // 關閉用戶菜單
  };

  // 檢查用戶是否登入
  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await authServices.getCurrentUser(); // 假設有一個方法來檢查用戶狀態
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            社團企業媒合平台
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                transition: "transform 0.3s ease-in-out", // 動畫效果
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={page.path}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            媒合平台
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                href={page.path}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  transition: "color 0.3s", // 動畫效果
                  "&:hover": {
                    color: "#f57c00", // 設定 hover 顏色
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              sx={{ mt: "45px", transition: "transform 0.3s ease-in-out" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isLoggedIn
                ? userLoggedInOptions.map((option) => (
                    <MenuItem
                      key={option.name}
                      onClick={handleLogout} // 登出處理
                    >
                      <Typography textAlign="center">{option.name}</Typography>
                    </MenuItem>
                  ))
                : userOptions.map((option) => (
                    <MenuItem
                      key={option.name}
                      onClick={handleCloseUserMenu}
                      component={Link}
                      href={option.path}
                    >
                      <Typography textAlign="center">{option.name}</Typography>
                    </MenuItem>
                  ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
