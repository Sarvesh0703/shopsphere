import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-center">
        <Heart
          size={55}
          className="mx-auto text-slate-300"
        />

        <h1 className="mt-5 text-3xl font-bold">
          Your Wishlist is Empty
        </h1>

        <p className="mt-2 text-slate-500">
          Save products you love and find them here later.
        </p>

        <Link
          to="/products"
          className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white"
        >
          Explore Products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">

      <div className="mb-8">
        <h1 className="text-4xl font-extrabold">
          My Wishlist
        </h1>

        <p className="mt-2 text-slate-500">
          {wishlist.length} saved product
          {wishlist.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="overflow-hidden rounded-2xl border bg-white"
          >
            <Link to={`/products/${product.id}`}>
              <div className="flex h-52 items-center justify-center bg-slate-50 p-6">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>
            </Link>

            <div className="p-5">
              <h2 className="line-clamp-2 min-h-12 font-bold">
                {product.title}
              </h2>

              <p className="mt-3 text-xl font-bold">
                ${product.price}
              </p>

              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
              >
                Add to Cart
              </button>

              <button
                onClick={() =>
                  removeFromWishlist(product.id)
                }
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 font-semibold text-red-600"
              >
                <Trash2 size={17} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Wishlist;