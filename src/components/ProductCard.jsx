import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const wishlistActive = isInWishlist(product.id);

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={`absolute right-3 top-3 z-10 rounded-full p-2 shadow-sm transition ${
          wishlistActive
            ? "bg-red-50 text-red-500"
            : "bg-white text-slate-500 hover:text-red-500"
        }`}
        aria-label="Add to wishlist"
      >
        <Heart
          size={19}
          fill={wishlistActive ? "currentColor" : "none"}
        />
      </button>

      {/* Product Image */}
      <Link to={`/products/${product.id}`}>
        <div className="flex h-56 items-center justify-center bg-slate-50 p-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-5">

        <p className="mb-2 text-xs font-semibold uppercase text-indigo-600">
          {product.category}
        </p>

        <Link to={`/products/${product.id}`}>
          <h3 className="line-clamp-2 min-h-12 font-bold text-slate-900 hover:text-indigo-600">
            {product.title}
          </h3>
        </Link>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">
            ${product.price}
          </span>

          <span className="text-sm text-yellow-500">
            ★ {product.rating}
          </span>
        </div>

        {/* Add Cart */}
        <button
          onClick={handleAddToCart}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;