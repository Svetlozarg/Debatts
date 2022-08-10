export default function Login() {
  return (
    // Login Page
    <main className="login-page">
      <h1>Login Page</h1>

      <form action="">
        {/* Email Address */}
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          placeholder="example@google.com"
          required
        />
        {/* Password */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          required
        />
        {/* Submit Button */}
        <button>Login</button>
      </form>
    </main>
  );
}
