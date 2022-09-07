import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import ButtonOutline from "../components/buttons/ButtonOutline";
import LargeContainer from "../components/containers/LargeContainer";
import TextInput from "../components/inputs/TextInput";
import Head from "next/head";
import ModalError from "../components/modals/ModalError";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  // User router
  const router = useRouter();
  // Get user and login function
  const { user, login, logout } = useAuth();
  // State for data
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // error modal
  const [errorToShow, setErrorToShow] = useState("");
  const [isErrorShowing, setIsErrorShowing] = useState(false);

  // Handle login on submit
  const handleLogin = async (e) => {
    e.preventDefault();

    // Try login with email and password
    // Else error
    try {
      await login(data.email, data.password);
      router.push("/");
    } catch (e) {
      setErrorToShow(e);
      setIsErrorShowing(true);
    }
  };

  if (!user) {
    return (
      <main className="max-w-lg">
        <Head>
          <title>Debatts · Login</title>
        </Head>
        <LargeContainer className="col-span-full">
          <h1 className="text-center underline decoration-secondary select-none">
            Login Page
          </h1>
          {/* Login Form */}
          <form className="grid gap-6" onSubmit={handleLogin}>
            {/* Email */}
            <TextInput
              id="email"
              type="email"
              label="Email"
              onChange={(e) => {
                setData({
                  ...data,
                  email: e.target.value,
                });
              }}
              required
              placeholder="email@example.com"
            ></TextInput>

            {/* Password */}
            <TextInput
              id="password"
              type="password"
              label="Password"
              onChange={(e) => {
                setData({
                  ...data,
                  password: e.target.value,
                });
              }}
              placeholder="password"
              required
            ></TextInput>
            <ButtonOutline type="submit">Submit</ButtonOutline>
          </form>
        </LargeContainer>
        <div className="col-span-full flex flex-col justify-center items-center w-full">
          <span>Don&apos;t have an account yet?</span>
          <Link
            href={{
              pathname: "/register",
            }}
            passHref={true}
          >
            <a>Create an account</a>
          </Link>
        </div>
        <ModalError
          isOpen={isErrorShowing}
          onClose={() => {
            setErrorToShow("");
            setIsErrorShowing(false);
          }}
          error={errorToShow}
        />
      </main>
    );
  } else {
    router.push("/");
  }
}
