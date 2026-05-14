import { useState, useEffect } from "react";
import LogItem from "./LogItem";

function LogCard(props) {
  const { data } = props;
  const [logs, setLogs] = useState(data);

  useEffect(() => {
    setLogs(data);
  }, [data]);

  return (
    <div
      style={{
        width: "100%",
        border: "1px solid #e5e7eb",
        borderRadius: 8,
        overflow: "hidden",
        fontSize: 12,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          background: "#f8fafc",
          fontWeight: "bold",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <div style={{ padding: "10px 12px" }}>Passenger Name</div>
        <div style={{ padding: "10px 12px" }}>Airport</div>
        <div style={{ padding: "10px 12px" }}>Timestamp</div>
        <div style={{ padding: "10px 12px" }}>Type</div>
      </div>

      {/* Rows */}
      {logs.map((item, index) => (
        <div
          key={`${item.passengerName}-${item.type}-${index}`}
          style={{
            borderBottom:
              index !== logs.length - 1
                ? "1px solid #e5e7eb"
                : "none",
          }}
        >
          <LogItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default LogCard;