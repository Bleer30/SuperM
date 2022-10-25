import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        SuperM
      </NavLink>
      <ul>
        <li className="nav-item">
          <NavLink to="/home">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about">About us</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/cart" className="nav-item nav-cart btn btn-accent">
            Cart
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
