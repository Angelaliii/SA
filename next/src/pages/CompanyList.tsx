"use client"; // 表示此程式碼僅在客戶端執行

// 引入必要的 MUI 組件和服務
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"; // MUI 組件
import Link from "next/link"; // 用於 Next.js 路由導航
import { useEffect, useState } from "react"; // React hooks
import styles from "../assets/globals.module.css"; // 自定義樣式
import { companyServices } from "../firebase/services"; // 公司服務層，用於從 Firebase 獲取公司資料
import type { Company } from "../firebase/services/company-service"; // 引入公司資料類型

export default function CompanyList() {
  // 初始化狀態
  const [companies, setCompanies] = useState<Company[]>([]); // 儲存公司資料
  const [loading, setLoading] = useState<boolean>(true); // 儲存加載狀態
  const [error, setError] = useState<string | null>(null); // 儲存錯誤訊息
  const [firebaseStatus, setFirebaseStatus] = useState<{ status: string }>({
    status: "連線中...",
  }); // 儲存 Firebase 連線狀態

  // 使用 useEffect 在組件掛載時獲取公司資料
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true); // 開始加載
        console.log("從 Firebase 獲取公司資料...");

        // 檢查 Firebase 連線狀態
        try {
          // 增加延遲以確保頁面完全載入且 Firebase 初始化
          await new Promise((resolve) => setTimeout(resolve, 500));

          // 從 Firebase 獲取公司資料
          const companiesData = await companyServices.getAllCompanies();
          console.log("獲取的公司數量:", companiesData.length);
          setCompanies(companiesData); // 更新公司資料
          setFirebaseStatus({
            status: "連線正常", // 連線正常
          });
        } catch (fetchErr) {
          console.error("Firebase 資料獲取失敗:", fetchErr);
          setFirebaseStatus({
            status: "連線失敗", // 連線失敗
          });

          // 顯示錯誤信息
          let errorMessage = "無法從 Firebase 獲取資料";
          if (fetchErr instanceof Error) {
            errorMessage = `Firebase 錯誤: ${fetchErr.message}`;
          }
          setError(errorMessage);
          // 如果是權限錯誤，顯示具體的錯誤提示
          if (
            fetchErr instanceof Error &&
            fetchErr.message.includes("permission-denied")
          ) {
            setError(
              "您沒有訪問此數據的權限。請確保您已登入並有權訪問公司數據。"
            );
          }
        }
      } catch (err) {
        console.error("獲取公司資料時發生錯誤:", err);

        let errorMessage = "資料載入失敗";
        if (err instanceof Error) {
          errorMessage = `資料載入失敗: ${err.message}`;
        }
        setError(errorMessage);
      } finally {
        setLoading(false); // 加載完成
      }
    };

    // 設定延遲以保證頁面完全掛載
    const timer = setTimeout(() => {
      fetchCompanies(); // 獲取公司資料
    }, 300);

    return () => clearTimeout(timer); // 清除延遲
  }, []);

  // 格式化日期
  const formatDate = (timestamp: string | null | undefined) => {
    if (!timestamp) return "N/A";

    try {
      // 解析 ISO 格式的日期字符串
      return new Date(timestamp).toLocaleDateString("zh-TW");
    } catch (err) {
      return "無效日期"; // 處理無效日期
    }
  };

  return (
    <div className={styles.page}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}>
          {/* 頁面標題和返回首頁按鈕 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h4">公司列表</Typography>
            <Button variant="contained" component={Link} href="/">
              返回首頁
            </Button>
          </Box>

          {/* Firebase 連線狀態顯示 */}
          <Divider sx={{ mb: 3 }} />
          <Alert
            severity={firebaseStatus.status === "連線正常" ? "info" : "warning"}
            sx={{ mb: 2 }}
          >
            Firebase 狀態: {firebaseStatus.status}
          </Alert>

          {/* 如果資料正在加載，顯示 CircularProgress 加載動畫 */}
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            // 如果有錯誤，顯示錯誤訊息
            <Box sx={{ textAlign: "center", my: 5 }}>
              <Alert severity="error">{error}</Alert>
            </Box>
          ) : companies.length === 0 ? (
            // 如果沒有公司資料，顯示提示訊息
            <Box sx={{ textAlign: "center", my: 5 }}>
              <Typography>目前沒有公司資料</Typography>
            </Box>
          ) : (
            // 如果有公司資料，顯示表格
            <>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>公司名稱</TableCell>
                      <TableCell>統一編號</TableCell>
                      <TableCell>產業類型</TableCell>
                      <TableCell>聯絡人</TableCell>
                      <TableCell>狀態</TableCell>
                      <TableCell>註冊日期</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {companies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell>{company.companyName}</TableCell>
                        <TableCell>{company.businessId}</TableCell>
                        <TableCell>{company.industryType}</TableCell>
                        <TableCell>{company.contactName}</TableCell>
                        <TableCell>
                          {/* 根據公司狀態顯示不同顏色的標籤 */}
                          <Box
                            sx={{
                              display: "inline-block",
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              backgroundColor:
                                company.status === "approved"
                                  ? "#e6f7e6"
                                  : company.status === "rejected"
                                  ? "#ffebee"
                                  : "#fff8e1",
                              color:
                                company.status === "approved"
                                  ? "#388e3c"
                                  : company.status === "rejected"
                                  ? "#d32f2f"
                                  : "#f57c00",
                            }}
                          >
                            {company.status === "approved"
                              ? "已核准"
                              : company.status === "rejected"
                              ? "已拒絕"
                              : "審核中"}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {formatDate(company.registrationDate)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* 顯示公司詳細資料 */}
              <Typography variant="subtitle2" sx={{ mt: 4, mb: 2 }}>
                詳細資訊
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {companies.map((company) => (
                  <Card key={company.id} variant="outlined">
                    <CardContent>
                      <Typography variant="h6">
                        {company.companyName}
                      </Typography>
                      <Divider sx={{ my: 1 }} />

                      {/* 顯示公司詳細資料 */}
                      <Box
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            統一編號
                          </Typography>
                          <Typography variant="body1">
                            {company.businessId}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            產業類型
                          </Typography>
                          <Typography variant="body1">
                            {company.industryType}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            聯絡人
                          </Typography>
                          <Typography variant="body1">
                            {company.contactName}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            聯絡電話
                          </Typography>
                          <Typography variant="body1">
                            {company.contactPhone}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            電子郵件
                          </Typography>
                          <Typography variant="body1">
                            {company.email}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            狀態
                          </Typography>
                          <Box
                            sx={{
                              display: "inline-block",
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              backgroundColor:
                                company.status === "approved"
                                  ? "#e6f7e6"
                                  : company.status === "rejected"
                                  ? "#ffebee"
                                  : "#fff8e1",
                              color:
                                company.status === "approved"
                                  ? "#388e3c"
                                  : company.status === "rejected"
                                  ? "#d32f2f"
                                  : "#f57c00",
                            }}
                          >
                            {company.status === "approved"
                              ? "已核准"
                              : company.status === "rejected"
                              ? "已拒絕"
                              : "審核中"}
                          </Box>
                        </Box>
                      </Box>

                      {/* 顯示公司簡介 */}
                      {company.companyDescription && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            公司簡介
                          </Typography>
                          <Typography variant="body1">
                            {company.companyDescription}
                          </Typography>
                        </Box>
                      )}

                      {/* 顯示公司標誌和營業證明文件 */}
                      <Box sx={{ display: "flex", gap: 2 }}>
                        {company.logoURL && (
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              公司標誌
                            </Typography>
                            <Box sx={{ mt: 1, maxWidth: "100px" }}>
                              <img
                                src={company.logoURL}
                                alt={`${company.companyName} 標誌`}
                                style={{ maxWidth: "100%" }}
                              />
                            </Box>
                          </Box>
                        )}

                        {company.businessCertificateURL && (
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              營業證明文件
                            </Typography>
                            <Button
                              size="small"
                              variant="outlined"
                              sx={{ mt: 1 }}
                              href={company.businessCertificateURL}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              檢視文件
                            </Button>
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
}
