import { useRouter } from "next/router";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  // User router
  const router = useRouter();
  // Get user and login function
  const { user, login } = useAuth();
  // State for data
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // Handle login on submit
  const handleLogin = async (e) => {
    e.preventDefault();

    // Try login with email and password
    // Else error
    try {
      await login(data.email, data.password);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // Login Page
    <main className="login-page">
      <h1>Login Page</h1>
      <p>Email Test: admin@admin.com</p>
      <p style={{ marginBottom: "2rem" }}>Password Test: admin1234</p>

      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
