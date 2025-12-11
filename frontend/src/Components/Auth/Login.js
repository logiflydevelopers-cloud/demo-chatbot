import { useForm } from "react-hook-form";
import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", reValidateMode: "onBlur" });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://backend-demo-chatbot.vercel.app/api/auth/login",
        data,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { accessToken, user } = response.data;

        // Save user + token
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        // Set user globally
        setUser(user);

        // ⭐ FIXED REDIRECT: always include userId in URL
        navigate(`/dashboard/${user._id}/train`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.authTitle}>Login to your account</h2>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            className={styles.input}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <div className={styles.error}>{errors.email.message}</div>}
        </div>

        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            className={styles.input}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <div className={styles.error}>{errors.password.message}</div>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>Login</button>

        <p className={styles.toggleText}>
          <Link to="/forgot-password" className={styles.toggleLink}>
            Forgot Password?
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Login;
