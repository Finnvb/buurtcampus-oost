import AuthForm from "components/auth/auth-form";
import Layout from "components/layout";
import { getSession } from "next-auth/react";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Layout>
      <AuthForm />;
    </Layout>
  );
}

export default AuthPage;
