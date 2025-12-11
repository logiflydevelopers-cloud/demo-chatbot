import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `https://backend-demo-chatbot.vercel.app/api/auth/reset-password/${token}`,
        data
      );

      alert(res.data.message || "Password reset successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.authTitle}>Reset Password</h2>

        <div className={styles.inputGroup}>
          <label>New Password</label>
          <input
            type="password"
            className={styles.input}
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <div className={styles.error}>{errors.password.message}</div>}
        </div>

        <button type="submit" className={styles.submitButton}>
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
