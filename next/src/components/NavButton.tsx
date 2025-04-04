// NavButton.tsx
import { Button } from "@mui/material";
import Link from "next/link";

// 定義按鈕組件，接受 href 和 children 作為參數
const NavButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Button variant="contained" color="secondary" component={Link} href={href} size="large">
    {children}
  </Button>
);

export default NavButton;
