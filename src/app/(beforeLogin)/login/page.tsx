"use client";

import { useRouter } from "next/navigation";
import Main from "../_component/Main";

// import { redirect } from "next/navigation";

const Login = () => {
  const router = useRouter();
  router.replace("/i/flow/login");
  // redirect("/i/flow/login");
  return <Main />;
};

export default Login;
