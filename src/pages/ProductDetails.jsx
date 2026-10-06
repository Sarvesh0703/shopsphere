import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";

import Loader from "../components/Loader";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://dummyjson.com/products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();

        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <Link
        to="/products"
        className="mb-8 inline-flex items-center gap-2 text-indigo-600"
      >
        <ArrowLeft size={18} />
        Back to Products
      </Link>

      <div className="grid gap-10 rounded-3xl border bg-white p-6 md:grid-cols-2 md:p-10">
        <div className="flex min-h-[450px] items-center justify-center rounded-2xl bg-slate-50 p-8">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-h-[420px] object-contain"
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="font-semibold uppercase text-indigo-600">
            {product.category}
          </p>

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            {product.title}
          </h1>

          <div className="mt-4 flex gap-4">
            <span className="rounded-full bg-yellow-50 px-3 py-1 text-sm text-yellow-600">
              ★ {product.rating}
            </span>

            <span className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-600">
              {product.stock} in stock
            </span>
          </div>

          <p className="mt-6 leading-7 text-slate-500">
            {product.description}
          </p>

          <div className="mt-8 text-4xl font-extrabold">
            ${product.price}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-bold text-white hover:bg-indigo-700"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;