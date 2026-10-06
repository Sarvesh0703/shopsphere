import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://dummyjson.com/products?limit=100"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products);

        const uniqueCategories = [
          ...new Set(data.products.map((product) => product.category)),
        ];

        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

    if (category !== "all") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, search, category, sort]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Something went wrong
        </h2>
        <p className="mt-2 text-slate-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8">
        <p className="font-semibold text-indigo-600">OUR COLLECTION</p>

        <h1 className="mt-2 text-4xl font-extrabold text-slate-900">
          Explore Products
        </h1>

        <p className="mt-2 text-slate-500">
          Search, filter and sort products using real API data.
        </p>
      </div>

      <div className="mb-8 grid gap-4 rounded-2xl border bg-white p-4 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
        >
          <option value="all">All Categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border px-4 py-3 outline-none focus:border-indigo-500"
        >
          <option value="default">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {filteredProducts.length} products found
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold">
            No products found
          </h2>

          <p className="mt-2 text-slate-500">
            Try another search or category.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Products;