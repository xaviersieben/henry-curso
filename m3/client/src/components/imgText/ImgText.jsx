import schedule from "../../assets/schedule.jpeg";
import styles from "./ImgText.module.css";

function ImgText() {
  return (
    <div className={styles.imgtextContainer}>
      <img src={schedule} alt="schedule" />
      <div>
        <h1>Consultorio Medico</h1>
      </div>
    </div>
  );
}

export default ImgText;
