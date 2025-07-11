import { useState } from "react";
import { Link } from "react-router";
import NavigationBar from "../../components/NavigationBar";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const newError = {};
    if (!form.username) {
      newError.username = "Username is required";
    }
    if (!form.email) {
      newError.email = "Email is required";
    }
    if (!form.password) {
      newError.password = "Password is required";
    }
    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    if (form.password !== form.confirmPassword) {
      return (newError.confirmPassword = "Passwords do not match");
    }

    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.username,
        email: form.email,
        password: form.password,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      alert("Registration successful");
      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setError("");
    } else {
      setError(data.message || "Registration failed");
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="flex flex-col gap-y-10 justify-center items-center">
        <h1 className="text-5xl font-bold text-center">Register Page</h1>
        <div className="flex flex-col gap-y-2 justify-center items-center md:w-200">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={form.username}
            placeholder="John Doe"
            className="input rounded-3xl p-7 w-full"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
          {error.username && (
            <p className="text-red-500 text-sm">{error.username}</p>
          )}
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="text"
            id="email"
            value={form.email}
            placeholder="johndoe@gmail.com"
            className="input rounded-3xl p-7 w-full"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
          <label htmlFor="password" className="label">
            Password
          </label>
          <div className="flex flex-row w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={form.password}
              placeholder="********"
              className="input rounded-3xl p-7 w-full"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              className="btn btn-primary rounded-3xl p-7 ml-2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error.password && (
            <p className="text-red-500 text-sm">{error.password}</p>
          )}
          <label htmlFor="confirm-password" className="label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            value={form.confirmPassword}
            placeholder="********"
            className="input rounded-3xl p-7 w-full"
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
          />
          <Link
            className="btn btn-primary rounded-3xl p-7 w-full mt-2"
            to="/register"
            onClick={handleRegister}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
