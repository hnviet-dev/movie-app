import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import MovieDetail from "./page/MovieDetail/index.jsx";
import RootLayout from "./components/RootLayout/index.jsx";
import TvShowDetail from "./page/TvShowDetail/index.jsx";
import ModalProvider from "./context/ModalProvider/index.jsx";
import PropleDetail from "./page/PeopleDetail/index.jsx";
import SearchPage from "./page/SearchPage/index.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "/tv/:id",
        element: <TvShowDetail />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/people/:id",
        element: <PropleDetail />,
        loader: async ({ params }) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/person/${params.id}?append_to_response=combined_credits`,
            {
              method: "GET",

              headers: {
                accept: "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzA0OTc0ZTUzYThjNDljNmVkZjhlNDgxZTZkYzk1MiIsIm5iZiI6MTc0Mjg1MTY5Mi4xNzYsInN1YiI6IjY3ZTFjZTZjNDQwZjMxMWFjZTc1YzBhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.71hTyCz9haS-kSKIMhY1_IZAF0fXVLoxhx5lWee_lj0",
              },
            },
          );
          return res;
        },
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <ModalProvider>
    {/*Modal bọc lại tất cả những thằng này để  cho những thằng con này đều là children  */}
    <RouterProvider router={router}>{/* <App/> */}</RouterProvider>
  </ModalProvider>,
);
