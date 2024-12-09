import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "./App.css";
import "./react-datepicker.css";
import "./index.css";

function App() {
  let startDate = new Date();
  const [selectedDates, setSelectedDates] = useState([new Date()]);
  const onChange = (dates) => {
    setSelectedDates(dates);
  };

  return (
    <div className="mt-14 mx-auto max-w-[500px] flex flex-col font-gowun-dodum">
      <h1 className="text-[40px] font-bold mb-10">01 - Calendar</h1>
      <DatePicker
        selected={startDate}
        selectedDates={selectedDates}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        portalId="root-portal"
        locale={ko}
        selectsMultiple
        shouldCloseOnSelect={false}
        className="flex w-full h-[80px] bg-slate-100 text-center text-[30px] rounded-lg shadow-lg hover:cursor-pointer"
      />
    </div>
  );
}

export default App;
