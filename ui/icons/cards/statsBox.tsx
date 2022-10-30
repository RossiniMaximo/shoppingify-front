import styled from "styled-components";
import styles from "./statsBox.module.css";

type statsBoxType = {
  value: number;
  max: number;
  label: string;
  color?: string;
  width?: string;
};

const Container = styled.div`
  progress {
    margin-right: 8px;
  }
  progress[value] {
    width: ${(props) => props.width};
    -webkit-appearance: none;
    appearance: none;
  }
  progress[value]::-webkit-progress-bar {
    height: 10px;
    border-radius: 20px;
    background-color: #ccc;
  }
  progress[value]::-webkit-progress-value {
    height: 10px;
    border-radius: 20px;
    background-color: ${(props) => props.color};
  }
`;

export function StatsBox(props: statsBoxType) {
  if (props.max < 10) {
    props.max = 100;
  }

  return (
    <Container color={props.color || "red"} width={props.width || "250px"}>
      <div className={styles.top_content}>
        <p className={styles.label}>{props.label}</p>
        <span className={styles.label}>{(props.value / props.max) * 100}%</span>
      </div>
      <progress value={props.value} max={props.max} />
    </Container>
  );
}
