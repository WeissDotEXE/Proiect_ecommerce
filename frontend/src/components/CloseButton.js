const CloseButton = ({ onClick }) => {
  return (
    <button onClick={onClick} style={styles.closeButton} aria-label="Close">
      ✖
    </button>
  );
};

const styles = {
  backgroundColor: "transparent",
  border: "none",
  color: "black",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  padding: "5px",
  borderRadius: "4px",
  outline: "none",
};

export default CloseButton;
