import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
const Navbar = () => {
  const { logout } = useLogout();

  const handleClick = () => {
    // usuwa token z global storage i zmienia nasz stan gloablny
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          <div>
            {/* osobny div żeby przełaczać to co user widzi - tylko zalogowany ma widizeć przycisk logout */}
            <button onClick={handleClick}>Log out</button>
          </div>
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
