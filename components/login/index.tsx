import { login } from "api";
import { setTokenInLocalStorage, setUserIdStoraged } from "lib";
import styles from "./login.module.css";
import { useRouter } from "next/router";
import { useUserId } from "lib/hooks";

export function LoginForm() {
  const router = useRouter();
  const [userId, setUserId] = useUserId();
  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const fullname = e.target.fullname.value;
    const password = e.target.password.value;
    const res = await login({ fullname, email, password });
    if (res) {
      setTokenInLocalStorage(res.token);
      setUserIdStoraged(res.userId);
      setUserId(res.userId);
      router.push("/home");
      return true;
    }
  }

  return (
    <div className={styles.form_container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fields_container}>
          <label className={styles.label}>
            <p className={styles.title}>Email</p>
            <input className={styles.input} type="email" name="email" />
          </label>
          <label className={styles.label}>
            <p className={styles.title}>Fullname</p>
            <input className={styles.input} type="text" name="fullname" />
          </label>
          <label className={styles.label}>
            <p className={styles.title}>Password</p>
            <input className={styles.input} type="password" name="password" />
          </label>
          <div className={styles.btn_container}>
            <button className={styles.btn}>Send</button>
          </div>
        </div>
      </form>
    </div>
  );
}
