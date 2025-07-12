import React from "react";
import { Link } from "react-router";
import { useUser } from "../context/UserContext";
import LogoutButton from "./LogoutButton";

const NavigationBar = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  const user = useUser();
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Attendance</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            {isLoggedIn ? (
              <li>
                <details>
                  <summary>{user.name}</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li>
                      <a>Dashboard</a>
                    </li>
                    <LogoutButton />
                  </ul>
                </details>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
