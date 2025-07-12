import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import NavigationBar from "../../components/NavigationBar";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();
      if (res.status === 401) {
        setLoginError("Invalid credentials");
        return;
      }
      if (!res.ok) throw new Error(result.message);

      localStorage.setItem("token", result.token);
      localStorage.setUser("user", JSON.stringify(result.user));
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err.message);
    }
  };
  return (
    <div>
      <NavigationBar />
      <div className="flex flex-col gap-y-10 justify-center items-center">
        <h1 className="text-5xl font-bold text-center">Login Page</h1>
        {success && (
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Login Success</span>
          </div>
        )}
        <form
          className="flex flex-col gap-y-2 justify-center items-center md:w-200"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="johndoe@gmail.com"
            className="input rounded-3xl p-7 w-full"
            required
            {...register("email", {
              required: "Email should be filled.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
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
              {...register("password", {
                required: "Password should be filled.",
              })}
            />
            <button
              className="btn btn-primary rounded-3xl p-7 ml-2"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          {loginError && (
            <span className="text-red-600 text-sm font-medium">
              {loginError}
            </span>
          )}
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
