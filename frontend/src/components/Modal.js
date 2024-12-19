import CloseButton from "./CloseButton";

const Modal = ({ child, onClose, title }) => {
  return (
    <div style={styles.modal}>
      <div style={styles.background} onClick={onClose}></div>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1>{title}</h1>
          <CloseButton onClick={onClose} />
        </div>
        {child}
      </div>
    </div>
  );
};

const styles = {
  modal: {
    position: "relative",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100%",
    backgroundColor: "gray",
    opacity: 0.6,
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItmes: "center",
  },
  content: {
    width: "500px",
    backgroundColor: "white",
  },
};

export default Modal;
