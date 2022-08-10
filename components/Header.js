import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  // Import user and logout function
  const { user, logout } = useAuth();
  // Use router
  const router = useRouter();

  return (
    // Header
    <header>
      {/* Logo */}
      <h1>Debatts</h1>
      {/* Navigation */}
      <nav>
        <ul>
          {/* Home */}
          <li>
            <Link
              href={{
                pathname: "/",
              }}
              passHref={true}
            >
              <a>Home</a>
            </Link>
          </li>
        </ul>
      </nav>

      {/* If user show logout else login, register */}
      {user ? (
        <div className="header-btns">
          {/* User email */}
          <p>{user.email}</p>
          {/* Logout */}
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            Logout
          </div>
        </div>
      ) : (
        <div className="header-btns">
          {/* Login */}
          <Link
            href={{
              pathname: "/login",
            }}
            passHref={true}
          >
            <a>Login</a>
          </Link>

          {/* Register */}
          <Link
            href={{
              pathname: "/register",
            }}
            passHref={true}
          >
            <a>Register</a>
          </Link>
        </div>
      )}
    </header>
  );
}
