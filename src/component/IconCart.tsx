import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import { useRecoilState } from "recoil";
import { cartState } from "../recoil/atoms/recoilState";
import { useRouter } from "next/navigation";

export default function IconCart() {
  const router = useRouter();
  const [cart] = useRecoilState(cartState);

  const company = localStorage.getItem("user_company");
  const handleCartClick = () => {
    router.push(`/${company}/cart`);
  };
  return (
    <IconButton className="p-3 relative" size="small" onClick={handleCartClick}>
      <ShoppingCartIcon />
      {cart && (
        <div className="bg-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-sm text-white absolute top-0 right-0">
          {cart.length}
        </div>
      )}
    </IconButton>
  );
}
