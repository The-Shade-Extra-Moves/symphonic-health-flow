
import { useState } from "react";
import { AuthForm } from "@/components/auth/auth-form";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  return <AuthForm mode={mode} onModeChange={setMode} />;
};

export default Auth;
