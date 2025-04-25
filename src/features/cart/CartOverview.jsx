import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalCartQuantity, getTotalCartPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers.js";

function CartOverview() {
  const totaCartQuantity = useSelector(getTotalCartQuantity);
  const totaCartPrice = useSelector(getTotalCartPrice);

  if (!totaCartQuantity) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totaCartQuantity} pizzas</span>
        <span>{formatCurrency(totaCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
