import { Offcanvas, Stack } from "react-bootstrap";
import { CartItem } from ".";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/items.json";

type Props = {
  isOpen: boolean;
};
export const ShoppingCart = ({ isOpen }: Props) => {
  const { cartClose, cartItems } = useShoppingCart();
  return (
    <Offcanvas show={isOpen} onHide={cartClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((item) => item.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
