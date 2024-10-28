import styles from "./Contact.module.css";

function Contact() {
  return (
    <div className={styles.contactContainer}>
      <h1>Contacto</h1>
      <p>Información de contacto:</p>
      <ul>
        <li>Correo electrónico: info@example.com</li>
        <li>Número de teléfono: (123) 456-7890</li>
      </ul>
    </div>
  );
}

export default Contact;
