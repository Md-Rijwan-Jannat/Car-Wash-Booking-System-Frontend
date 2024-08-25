import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";

type TAppProps = object;

const App: FC<TAppProps> = () => {
  return <RouterProvider router={router} />;
};

export default App;
