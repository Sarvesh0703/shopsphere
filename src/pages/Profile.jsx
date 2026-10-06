import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="rounded-3xl border bg-white p-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <User size={35} />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {user?.name}
            </h1>

            <p className="mt-1 text-slate-500">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="mt-10 border-t pt-8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-red-50 px-5 py-3 font-semibold text-red-600 hover:bg-red-100"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </main>
  );
};

export default Profile;