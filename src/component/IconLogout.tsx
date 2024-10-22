import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { Logout } from "@mui/icons-material";

export default function IconLogout() {
  const router = useRouter();
  const handleOnClick = () => {
    router.push(`/login`);
  };

  return (
    <IconButton className="p-3 relative" size="small" onClick={handleOnClick}>
      <Logout />
    </IconButton>
  );
}
