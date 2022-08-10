import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  // Get user and register function
  const { user, register } = useAuth();
  // State for data
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // Handle register on submit
  const handleRegister = async (e) => {
    e.preventDefault();

    // Try register with email and password
    // Else error
    try {
      await register(data.email, data.password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // Register Page
    <main className="register-page">
      <h1>Register page</h1>

      <form onSubmit={handleRegister}>
        {/* Email Address */}
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="example@google.com"
          onChange={(e) => {
            setData({
              ...data,
              email: e.target.value,
            });
          }}
          required
        />
        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          onChange={(e) => {
            setData({
              ...data,
              password: e.target.value,
            });
          }}
          required
        />
        {/* Submit Button */}
        <button type="submit">Register</button>
      </form>
    </main>
  );
}
