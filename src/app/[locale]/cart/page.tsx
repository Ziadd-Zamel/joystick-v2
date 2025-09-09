import { getAllCart } from "@/lib/api/cart";

export default async function Page() {
  const cartItems = await getAllCart();
  console.log(cartItems);
  return (
    <>
      <div>asdasdas</div>
    </>
  );
}
