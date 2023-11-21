import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import styles from './Nav.module.css';

function BrandNavLink({ children, ...props }) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        clsx(styles.navLink, { [styles.active]: isActive })
      }
    >
      {children}
    </NavLink>
  );
  // React.createElement(NavLink, {...props, className: ({ isActive }) => isActive && styles.active}, children);
}

export function Nav() {
  return (
    <nav className={styles.mainMenu}>
      <menu>
        <li>
          <BrandNavLink to="/">Home</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="counter">Counter</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="todos">Todos</BrandNavLink>
        </li>

        <li className={styles.pushRight}>
          <BrandNavLink to="login">Login</BrandNavLink>
        </li>
        <li>
          <BrandNavLink to="register">Register</BrandNavLink>
        </li>
      </menu>
    </nav>
  );
}
