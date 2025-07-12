import { useState } from "react";
import { Link } from "react-router";
import NavigationBar from "../../components/NavigationBar";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <NavigationBar />
      <div className="flex flex-col gap-y-10 justify-center items-center">
        <h1 className="text-5xl font-bold text-center">Login Page</h1>
        <form className="flex flex-col gap-y-2 justify-center items-center md:w-200">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="johndoe@gmail.com"
            className="input rounded-3xl p-7 w-full"
            required
          />
          <label htmlFor="email" className="label">
            Password
          </label>
          <div className="flex flex-row w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="********"
              className="input rounded-3xl p-7 w-full"
              required
            />
            <button
              className="btn btn-primary rounded-3xl p-7 ml-2"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <p>
            Dont have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 underline hover:text-blue-600"
            >
              Create One
            </Link>
          </p>
          <button
            type="submit"
            className="btn btn-primary rounded-3xl p-7 w-full mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
