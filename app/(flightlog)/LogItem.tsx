function LogItem({ item }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
      }}
    >
      <div style={{ padding: "10px 12px" }}>
        {item.passengerName}
      </div>

      <div style={{ padding: "10px 12px" }}>
        {item.airport}
      </div>

      <div style={{ padding: "10px 12px" }}>
        {new Date(item.timestamp * 1000).toLocaleString()}
      </div>

      <div
        style={{
          padding: "10px 12px",
          textTransform: "capitalize",
          color: item.type === "departure" ? "#dc2626" : "#03bd00",
          fontWeight: "bold",
        }}
      >
        {item.type}
      </div>
    </div>
  );
}

export default LogItem;