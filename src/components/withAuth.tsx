// components/withAuth.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";

const withAuth = (WrappedComponent) => {
  return function WithAuthComponent(props) {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        // Redirect to login if not authenticated
        router.push("/login");
      }
    }, [user, loading, router]);

    if (loading) {
      return <p>Loading...</p>; // Show a loading state while checking auth
    }

    if (!user) {
      return null; // Prevent rendering until auth state is determined
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
