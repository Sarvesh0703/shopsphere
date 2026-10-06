import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "../context/CartContext";
import EmptyState from "../components/EmptyState";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return <EmptyState />;
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold">
          Shopping Cart
        </h1>

        <p className="mt-2 text-slate-500">
          Review your products before checkout.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-5 rounded-2xl border bg-white p-5 sm:flex-row sm:items-center"
            >
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-slate-50 p-3">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex-1">
                <h2 className="font-bold">{item.title}</h2>

                <p className="mt-1 text-sm text-slate-500">
                  ${item.price} each
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    className="rounded-lg border p-2"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="min-w-6 text-center font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="rounded-lg border p-2"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-5 sm:block">
                <p className="text-xl font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-3 flex items-center gap-2 text-red-500"
                >
                  <Trash2 size={17} />
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-sm font-semibold text-red-500"
          >
            Clear Cart
          </button>
        </div>

        <div className="h-fit rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-bold">
            Order Summary
          </h2>

          <div className="my-6 space-y-4 border-y py-6">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-slate-500">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>

          <button
            onClick={() => alert("Checkout feature coming soon!")}
            className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700"
          >
            Proceed to Checkout
          </button>

          <Link
            to="/products"
            className="mt-4 block text-center text-sm font-semibold text-indigo-600"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;