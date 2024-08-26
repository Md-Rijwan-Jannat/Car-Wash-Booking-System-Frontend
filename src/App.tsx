import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";

type TAppProps = object;

const App: FC<TAppProps> = () => {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
