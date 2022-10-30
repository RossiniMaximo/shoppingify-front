import { StatisticsComponent } from "components/statistics";
import { Layout } from "components/layout";
import styles from "./stats.module.css";

export default function Statistics() {
  return (
    <div className={styles.container}>
      <Layout />
      <StatisticsComponent />
    </div>
  );
}
