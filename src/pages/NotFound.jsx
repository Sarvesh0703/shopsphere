import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">

        <h1 className="text-8xl font-extrabold text-indigo-600">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-500">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-7 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Back to Home
        </Link>

      </div>
    </main>
  );
};

export default NotFound;