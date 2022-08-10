import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
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
          <li>
            <Link
              href={{
                pathname: "/login",
              }}
              passHref={true}
            >
              <a>Login</a>
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/register",
              }}
              passHref={true}
            >
              <a>Register</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
