import Button from "../../ui/Button.jsx";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "./cartSlice.js";

function UpdateItemQuantity({ id }) {
  const dispatch = useDispatch();
  return (
    <div className="flex gap-1 items-center md:gap-3">
      <Button type="round" onClick={() => dispatch(decreaseQuantity(id))}>
        -
      </Button>
      <Button type="round" onClick={() => dispatch(increaseQuantity(id))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
