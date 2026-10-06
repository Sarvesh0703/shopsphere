import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Store } from "lucide-react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartCount } = useCart();

  const navClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "text-indigo-600 font-semibold"
        : "text-slate-600 hover:text-indigo-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-xl bg-indigo-600 p-2 text-white">
            <Store size={20} />
          </div>

          <span className="text-xl font-bold text-slate-900">
            Shop<span className="text-indigo-600">Sphere</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>
        </nav>

        <Link
          to="/cart"
          className="relative rounded-xl bg-slate-100 p-3 hover:bg-slate-200"
        >
          <ShoppingCart size={21} />

          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;