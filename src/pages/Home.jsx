import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, Zap } from "lucide-react";

const Home = () => {
  return (
    <main>
      <section className="bg-slate-900">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2">
          <div>
            <p className="mb-4 font-semibold text-indigo-400">
              MODERN SHOPPING EXPERIENCE
            </p>

            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Everything you need,
              <span className="text-indigo-400"> in one place.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Explore quality products with a clean, fast and responsive
              shopping experience powered by React.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="rounded-3xl bg-indigo-600 p-10">
            <div className="rounded-2xl bg-white p-8 shadow-2xl">
              <p className="text-sm font-semibold text-indigo-600">
                ShopSphere
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900">
                Simple. Fast. Responsive.
              </h2>

              <p className="mt-4 text-slate-500">
                Built with React, REST APIs and modern frontend practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-16 md:grid-cols-3">
        <Feature
          icon={<Truck />}
          title="Fast Delivery"
          text="Reliable delivery experience for every order."
        />

        <Feature
          icon={<ShieldCheck />}
          title="Secure Shopping"
          text="A clean and user-friendly shopping experience."
        />

        <Feature
          icon={<Zap />}
          title="Fast Experience"
          text="Optimized React interface with reusable components."
        />
      </section>
    </main>
  );
};

const Feature = ({ icon, title, text }) => (
  <div className="rounded-2xl border bg-white p-6">
    <div className="mb-4 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600">
      {icon}
    </div>

    <h3 className="text-lg font-bold">{title}</h3>

    <p className="mt-2 text-slate-500">{text}</p>
  </div>
);

export default Home;