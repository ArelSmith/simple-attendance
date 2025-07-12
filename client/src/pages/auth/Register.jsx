import { useState } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import NavigationBar from "../../components/NavigationBar";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      if (!res.ok) throw new Error("Failed to register");
      setSuccess(true);
      reset();
    } catch (err) {
      console.error("Registration error:", err.message);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="flex flex-col gap-y-10 justify-center items-center">
        <h1 className="text-5xl font-bold text-center">Register Page</h1>
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
            <span>Your account has been registered!</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2 justify-center items-center md:w-200"
        >
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="John Doe"
            className="input rounded-3xl p-7 w-full"
            {...register("username", {
              required: "Username should be filled.",
            })}
            required
          />
          {errors.username && (
            <span className="text-sm text-red-500">
              {errors.username.message}
            </span>
          )}

          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="johndoe@gmail.com"
            className="input rounded-3xl p-7 w-full"
            {...register("email", {
              required: "Email should be filled.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
              validate: async (value) => {
                try {
                  const res = await fetch(
                    `http://localhost:5000/auth/check-email?email=${value}`
                  );
                  const data = await res.json();
                  return data.available || "Email is already in use";
                } catch (err) {
                  console.error("Email check error:", err.message);
                  return "Failed to validate email";
                }
              },
            })}
            required
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}

          <label htmlFor="password" className="label">
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
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
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
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}

          <label htmlFor="confirm-password" className="label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="********"
            className="input rounded-3xl p-7 w-full"
            {...register("confirmPassword", {
              validate: (value) =>
                value === passwordValue || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}

          <button
            type="submit"
            className="btn btn-primary rounded-3xl p-7 w-full mt-2"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
