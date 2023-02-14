import { Outlet, Link } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/archive">Archive</Link>
          </li>
          <li>
            <Link to="/jobcreator">Job Creator</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};
