import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="fixed z-10">
      <nav>
        <ul>
          <li>
            <Link to="/myElement3D" className="text-sm">myElement3D</Link>
          </li>
          <li>
            <Link to="/carShow" className="text-sm">carShow</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
