import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useRouter } from "next/router";

import ButtonOutline from "../components/buttons/ButtonOutline";
import LargeContainer from "../components/containers/LargeContainer";
import TextInput from "../components/inputs/TextInput";
import Checkbox from "../components/inputs/Checkbox";

export default function Register() {
  const router = useRouter();
  // Get user and register function
  const { user, register } = useAuth();
  // State for data
  const [data, setData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    rpassword: "",
  });

  // Handle register on submit
  const handleRegister = async (e) => {
    e.preventDefault();

    // Try register with email and password
    // Else error
    try {
      if (data.password === data.rpassword) {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();

        await setDoc(doc(db, "Users", data.email), {
          fullName: data.fullName,
          userName: data.userName,
          email: data.email,
          role: "user",
          createdAt: (today = mm + "/" + dd + "/" + yyyy),
        });

        await register(data.email, data.password);

        router.push("/");
      } else {
        window.alert("Passwords do not match!");
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return (
      <main className="max-w-lg">
        <LargeContainer className="col-span-full">
          <h1 className="text-center underline decoration-secondary select-none">
            Register Page
          </h1>
          <form className="grid gap-6" onSubmit={handleRegister}>
            {/* Full Name */}
            <TextInput
              id="fullName"
              type="text"
              label="Full Name"
              onChange={(e) => {
                setData({
                  ...data,
                  fullName: e.target.value,
                });
              }}
              required
              placeholder="Full name"
            ></TextInput>

            {/* Username */}
            <TextInput
              id="username"
              type="text"
              label="Username"
              onChange={(e) => {
                setData({
                  ...data,
                  userName: e.target.value,
                });
              }}
              required
              placeholder="Username"
            ></TextInput>

            {/* Email Address */}
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

            {/* Repeat Password */}
            <TextInput
              id="rpassword"
              type="password"
              label="Repeat Password"
              onChange={(e) => {
                setData({
                  ...data,
                  rpassword: e.target.value,
                });
              }}
              placeholder="Repeat password"
              required
            ></TextInput>
            <Checkbox required id="TnCs">
              I agree with the terms and conditions
            </Checkbox>
            <ButtonOutline type="submit">Submit</ButtonOutline>
          </form>
        </LargeContainer>
        <div className="col-span-full flex flex-col justify-center items-center w-full">
          <span>Already have an account?</span>
          <Link
            href={{
              pathname: "/login",
            }}
            passHref={true}
          >
            <a>Go to login page</a>
          </Link>
        </div>
      </main>
    );
  } else {
    router.push("/");
  }
}
