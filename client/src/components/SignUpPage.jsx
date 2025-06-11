import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useNavigate hook from react-router-dom to programmatically navigate
  const handleSubmit = async (e) => {
    e.preventDefault(); //Prevents the default browser form submission behavior which reloads the page.

    try {
      const response = await fetch("http://localhost:5000/auth/signup", {
        // Sends a POST request to the server to create a new user
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      setError(""); // Resets any previous error message
      setMessage(""); // Resets any previous success message
      const data = await response.json(); // Waits for the response and converts it to JSON. Data now holds the response from the server.
      if (response.ok) {
        setMessage("✅");
        localStorage.setItem("token", data.token); // Stores the token in localStorage for future authenticated requests
        setTimeout(() => {
          navigate("/main");
        }, 1000);
      } else {
        setError(data.error || "An error occurred. Please try again.");
        console.error(data.error, response.status);
      }
    } catch (error) {
      console.error("Error during signup:", error); // Logs any error that occurs during the fetch request
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block mb-2 font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {error ? (
          <p className="mt-4 text-center text-red-600 font-medium">{error}</p>
        ) : (
          <p className="mt-4 text-center text-green-600 font-medium">
            {message}
          </p>
        )}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpPage;
