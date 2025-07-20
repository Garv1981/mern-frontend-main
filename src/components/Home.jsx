import { useState } from "react";

export default function Home() {
  const [wicket, setWicket] = useState(0);
  const [run, setRun] = useState(0);
  const [message, setMessage] = useState("");
  const [showProduct, setShowProduct] = useState(false);

  const incrementRun = () => {
    if (wicket < 10) {
      setRun(run + 1);
      setMessage("🏏 Well Done!");
    }
  };

  const incrementWicket = () => {
    if (wicket < 10) {
      setWicket(wicket + 1);
      setMessage("😢 Better Luck Next Time");
    } else {
      setMessage("💀 Game Over");
    }
  };

  const handleAddToCart = () => {
    setShowProduct(true);
    setMessage("🛒 Product added to cart!");
  };

  return (
    <div className="font-sans p-8 text-center bg-slate-100 rounded-2xl max-w-xl mx-auto shadow-lg">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">🏏 Cricket Scoreboard</h2>

      <button
        onClick={incrementRun}
        className="px-6 py-2 bg-cyan-500 text-white font-semibold rounded-lg m-2 hover:bg-cyan-600"
      >
        ➕ Run
      </button>
      <h3 className="text-xl font-medium text-gray-800 mb-4">Runs: {run}</h3>

      <button
        onClick={incrementWicket}
        className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg m-2 hover:bg-red-700"
      >
        ❌ Wicket
      </button>
      <h3 className="text-xl font-medium text-gray-800 mb-6">Wickets: {wicket}</h3>

      <hr className="my-4 border-gray-400" />

      <h4 className="text-lg font-medium text-gray-700 mb-4">{message}</h4>

      <button
        onClick={handleAddToCart}
        className="px-8 py-3 bg-emerald-500 text-white font-bold text-lg rounded-xl mt-4 hover:bg-emerald-600"
      >
        🛒 Add to Cart
      </button>

      {showProduct && (
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md text-left">
          <h3 className="text-xl font-semibold mb-2">🪵 Wooden Clock</h3>
          <p className="text-gray-800 font-medium mb-1">Price: ₹499</p>
          <p className="text-sm text-gray-600">
            A beautifully handcrafted wooden wall clock for your room.
          </p>
        </div>
      )}
    </div>
  );
}
