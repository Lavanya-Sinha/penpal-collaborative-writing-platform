import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/components/Navbar.css";
import colors from "../constants/Colors";
import { BsList } from "react-icons/bs";
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem, Avatar } from "@fluentui/react-components";
import { signout } from "../utils/auth";
import { useNavigate } from "react-router";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.value);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!currentUser);
  }, [currentUser, navigation]);

  const handleSignOut = () => {
    signout();
  };

  return (
    <nav className="navbar" style={{ backgroundColor: colors.secondaryColor }}>
      <div className="navbarContainer">
        <a href="/" className="navbarLogo">
          <img className="logo" src="assets/pen-m.png" alt="Logo" />
          <h1 className="branding">PenPal</h1>
        </a>
        <button
          className="navbarHamburger"
          aria-label="Open menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <BsList size={28} color="#fff" />
        </button>
        <section className={`accountSection${menuOpen ? " open" : ""}`}>
          <ul className="navbarLinks">
            <li key="home">
              <a href="https://github.com/Lavanya-Sinha/penpal-client">
                Made with 🤍 by Lavanya Sinha
              </a>
            </li>
          </ul>
          {isLoggedIn && (
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <div className="profile" tabIndex={0} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar
                    name={currentUser?.fullname || "User"}
                    image={{ src: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-women-cartoon-avatar-in-flat-style-png-image_6110776.png" }}
                    size={32}
                  />
                  <div className="profileName">{currentUser?.fullname}</div>
                </div>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem onClick={() => window.location.href = "/profile"}>Your Profile</MenuItem>
                  <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          )}
          {!isLoggedIn && (
            <>
              <a className="login" href="/login">
                <button className="loginButton">Login</button>
              </a>
              <a className="signup" href="/signup">
                <button
                  className="signupButton"
                  style={{ backgroundColor: colors.primaryColor }}
                >
                  Sign Up
                </button>
              </a>
            </>
          )}
        </section>
      </div>
      {menuOpen && (
        <div className="navbarOverlay" onClick={() => setMenuOpen(false)} />
      )}
    </nav>
  );
}
