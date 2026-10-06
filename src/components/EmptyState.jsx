import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <div className="mb-4 text-6xl">🛒</div>

      <h2 className="text-2xl font-bold text-slate-900">
        Your cart is empty
      </h2>

      <p className="mt-2 text-slate-500">
        Add some products to your cart and come back here.
      </p>

      <Link
        to="/products"
        className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        Browse Products
      </Link>
    </div>
  );
};

export default EmptyState;