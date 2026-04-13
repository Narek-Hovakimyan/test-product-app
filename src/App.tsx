import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
console.log("ENV:", import.meta.env.VITE_API_URL);
function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Չհաջողվեց բեռնել ապրանքները");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <h1 className="text-3xl font-bold">Products App</h1>
          <p className="mt-2 text-sm text-indigo-100">
            React + Docker + Express
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {loading && (
          <div className="rounded-2xl bg-white p-8 text-center shadow">
            <p className="text-lg font-medium text-gray-600">Բեռնվում է...</p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow">
            <p className="font-semibold text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                Available Products
              </h2>
              <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
                {products.length} products
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-xl font-bold text-indigo-600">
                    {product.name.charAt(0)}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    High quality product from our collection
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-2xl font-bold text-indigo-600">
                      {product.price.toLocaleString()} դրամ
                    </span>

                    <button className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;