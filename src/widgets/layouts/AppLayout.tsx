import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <>
      <header>Header</header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
