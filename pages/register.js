export default function Register() {
  return (
    // Register Page
    <main className="register-page">
      <h1>Register page</h1>

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
        <button>Register</button>
      </form>
    </main>
  );
}
