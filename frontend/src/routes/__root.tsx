import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface MyRouterContext {
  queryClient: QueryClient;
}

// Use the routerContext to create your root route
export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
});

function NavBar() {
  return (
    <div className="flex p-2 gap-2 max-w-2xl m-auto">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/about" className="[&.active]:font-bold">
        about
      </Link>
      <Link to="/expenses" className="[&.active]:font-bold">
        Expenses
      </Link>
      <Link to="/create-expense" className="[&.active]:font-bold">
        Create
      </Link>
      <Link to="/profile" className="[&.active]:font-bold">
        Profile
      </Link>
    </div>
  );
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <div className="p-2 flex gap-2 max-w-2xl m-auto">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
