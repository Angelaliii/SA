import { Box, Button, Container } from "@mui/material";
import Link from "next/link";
import RegisterComponent from "../components/Register";

export default function LoginPage() {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <RegisterComponent />
      </Box>
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
    </Container>
  );
}
