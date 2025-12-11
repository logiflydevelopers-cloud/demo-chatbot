import { useForm } from "react-hook-form";
import styles from "./Auth.module.css";
import axios from "axios";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "https://backend-demo-chatbot.vercel.app/api/auth/forgot-password",
        data
      );

      alert(res.data.message || "Password reset link sent to your email!");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.authTitle}>Forgot Password</h2>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            className={styles.input}
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <div className={styles.error}>{errors.email.message}</div>}
        </div>

        <button type="submit" className={styles.submitButton}>
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
