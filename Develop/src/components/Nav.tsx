import { NavLink } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages - candidate search and saved candidates
  return (
    <nav className="nav">
      <li className="nav-item">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Home
        </NavLink>
      </li>
      <li className="nav-item">
          <NavLink to="/saved-candidates" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          Potential Candidates
          </NavLink>
      </li>
    </nav>
  );
};

export default Nav;
