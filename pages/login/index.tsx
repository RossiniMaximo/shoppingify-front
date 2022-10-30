import { LoginForm } from "components/login";
import styles from "./login.module.css";
const background = require("/public/shop.webp");

export default function Login() {
  return (
    <div
      style={{
        backgroundImage: `url(${background.default.src})`,
      }}
      className={styles.container}
    >
      <LoginForm />
    </div>
  );
}
