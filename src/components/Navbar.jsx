import { Link, NavLink } from "react-router-dom";

import {
  ShoppingCart,
  Store,
  LogOut,
  User,
  Heart,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const { cartCount } = useCart();

  const { user, logout } = useAuth();

  const { wishlist } = useWishlist();

  const navClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "font-semibold text-indigo-600"
        : "text-slate-600 hover:text-indigo-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <div className="rounded-xl bg-indigo-600 p-2 text-white">
            <Store size={20} />
          </div>

          <span className="text-xl font-bold text-slate-900">
            Shop
            <span className="text-indigo-600">
              Sphere
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          <NavLink
            to="/"
            className={navClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={navClass}
          >
            Products
          </NavLink>

          {user && (
            <NavLink
              to="/wishlist"
              className={navClass}
            >
              Wishlist
            </NavLink>
          )}

        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* User */}
          {user ? (
            <div className="hidden items-center gap-2 sm:flex">

              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
              >
                <User size={17} />
                Hi, {user.name}
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
              >
                <LogOut size={17} />
                Logout
              </button>

            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">

              <Link
                to="/login"
                className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Register
              </Link>

            </div>
          )}

          {/* Wishlist Icon */}
          {user && (
            <Link
              to="/wishlist"
              className="relative rounded-xl bg-slate-100 p-3 hover:bg-slate-200"
            >
              <Heart size={21} />

              {wishlist.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
          )}

          {/* Cart */}
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
      </div>
    </header>
  );
};

export default Navbar;