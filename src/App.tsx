import { useState } from "react";
import { emailService } from "./lib/emailService";

function App() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await emailService.addEmail(email);
      setMessage("Thank you! We'll be in touch soon.");
      setEmail("");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-[#FF1B8D]">Financial Literacy </span>
            <span className="text-gray-900">without the jargon</span>
          </h1>
        </div>

        <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl mx-auto">
          Simple, actionable guides to go from confused to confident with your
          money.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full px-6 py-4 rounded-full border-2 border-pink-200 focus:border-[#FF1B8D] focus:outline-none text-gray-700 text-lg disabled:opacity-50"
          />
        </form>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-[#FF1B8D] hover:bg-[#E0177D] text-white font-semibold px-8 py-4 rounded-full text-lg transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Start Your Free Journey →"}
        </button>

        {message && (
          <p
            className={`mt-4 text-lg ${
              message.includes("Thank you") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
