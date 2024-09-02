// src/App.tsx
import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { useRouter } from "./hooks/useRoutes";
import ScrollButton from "./components/WebsiteReview/ScrollButton";

type TAppProps = object;

const App: FC<TAppProps> = () => {
  const router = useRouter();

  return (
    <main>
      <RouterProvider router={router} />
      <ScrollButton />
    </main>
  );
};

export default App;
