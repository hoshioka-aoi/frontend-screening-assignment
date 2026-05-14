import { useState, useCallback } from "react";

const emptyForm = {
  passengerName: "",
  airport: "",
  timestamp: "",
};

function LogForm(props) {
  const { type, onSubmit } = props;

  const [formData, setFormData] = useState(emptyForm);

  const handleSubmit = useCallback(() => {
    onSubmit({
      ...formData,
      timestamp: Math.floor(new Date(formData.timestamp).getTime() / 1000),
      type,
    });

    setFormData(emptyForm);
  }, [formData, type, onSubmit]);

  const handleChange = useCallback(({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.id]: target.value,
    }));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        columnGap: 8,
        fontSize: 12,
        alignItems: "flex-end",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          rowGap: 4,
        }}
      >
        <label
          htmlFor="passengerName"
          style={{ fontWeight: "bold", fontSize: 12 }}
        >
          Passenger Name:
        </label>

        <input
          type="text"
          id="passengerName"
          name="passengerName"
          value={formData.passengerName}
          onChange={handleChange}
          placeholder="Enter full passenger name"
          style={{
            fontSize: 12,
            padding: "4px 8px",
          }}
        />
      </div>

      <div
        style={{
          width: "25%",
          display: "flex",
          flexDirection: "column",
          rowGap: 4,
        }}
      >
        <label
          htmlFor="airport"
          style={{ fontWeight: "bold", fontSize: 12 }}
        >
          Airport:
        </label>

        <input
          type="text"
          id="airport"
          name="airport"
          value={formData.airport}
          onChange={handleChange}
          placeholder="Enter airport code or name"
          style={{
            fontSize: 12,
            padding: "4px 8px",
          }}
        />
      </div>

      <div
        style={{
          width: "25%",
          display: "flex",
          flexDirection: "column",
          rowGap: 4,
        }}
      >
        <label
          htmlFor="timestamp"
          style={{ fontWeight: "bold", fontSize: 12 }}
        >
          Timestamp:
        </label>

        <input
          type="text"
          id="timestamp"
          name="timestamp"
          value={formData.timestamp}
          onChange={handleChange}
          placeholder="9/1/2021, 7:00:00 AM"
          style={{
            fontSize: 12,
            padding: "4px 8px",
          }}
        />
      </div>

      <div
        style={{
          width: "20%",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <button
          onClick={handleSubmit}
          style={{
            fontSize: 12,
            padding: "6px 12px",
            cursor: "pointer",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 6,
            width: "100%",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default LogForm;