import React, { useRef, useState } from "react";
import Calendar from "./components/Calendar";

const App: React.FC = () => {
  const calendarRef = useRef<any>(null);
  const [dateValue, setDateValue] = useState<string>("");

  const handleDateChange = (selectDate: string) => {
    setDateValue(selectDate);
  };

  const handleClick = () => {
    console.log("dateValue:", dateValue);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Calendar
        ref={calendarRef}
        value={dateValue}
        onChange={handleDateChange}
      />
      <button
        onClick={handleClick}
        style={{ height: "30px", marginLeft: "10px" }}
      >
        获取选中日期
      </button>
    </div>
  );
};

export default App;
