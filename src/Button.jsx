export function Button({ label="guardar", variant = "primary" }) {
  const styles = {
    primary: {
      background: "#111827",
      color: "white",
    },
    secondary: {
      background: "#E5E7EB",
      color: "#111827",
    },
  };

  return (
    <button
      style={{
        ...styles[variant],
        border: "none",
        padding: "12px 20px",
        borderRadius: "12px",
        fontSize: "14px",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}