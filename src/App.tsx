// src/App.tsx
import { FC, useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useRouter } from "./hooks/useRoutes";
import ScrollButton from "./components/WebsiteReview/ScrollButton";
import Loader from "./components/Loader/loader";

type TAppProps = object;

const App: FC<TAppProps> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoading = () => setLoading(false);

    // Listen for the router to finish loading
    window.addEventListener("load", handleLoading);

    return () => {
      window.removeEventListener("load", handleLoading);
    };
  }, []);

  return (
    <main>
      {!loading && <Loader />}
      <RouterProvider router={router} />
      <ScrollButton />
    </main>
  );
};

export default App;
