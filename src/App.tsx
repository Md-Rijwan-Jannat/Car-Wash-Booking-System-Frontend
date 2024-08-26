// src/App.tsx
import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { useRouter } from "./hooks/useRoutes";

type TAppProps = object;

const App: FC<TAppProps> = () => {
  const router = useRouter();

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
