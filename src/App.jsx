import { useState } from "react";
import "./App.css";
import arrow from "./images/icon-arrow.svg";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });
  const [errors, setErrors] = useState({ day: "", month: "", year: "", date: "" });


  const isInputValid = (day, month, year) => {
    const today = new Date();
    const dayValid = day >= 1 && day <= 31;
    const monthValid = month >= 1 && month <= 12;
    const yearValid = year > 0 && year < today.getFullYear();

    setErrors({
      day: dayValid ? "" : "Must be a valid day",
      month: monthValid ? "" : "Must be a valid month",
      year: yearValid ? "" : "Must be in the past.",
      date: "",
    });

    return dayValid && monthValid && yearValid;
  };

  
  const isDateValid = (day, month, year) => {
    const date = new Date(`${year}-${month}-${day}`);
    const valid =
      date.getDate() === parseInt(day, 10) &&
      date.getMonth() + 1 === parseInt(month, 10) &&
      date.getFullYear() === parseInt(year, 10);

    if (!valid) {
      setErrors((prev) => ({
        ...prev,
        date: "Must be a valid date.",
      }));
    }

    return valid;
  };

  const calculateAge = () => {
    const dayInt = parseInt(day, 10);
    const monthInt = parseInt(month, 10);
    const yearInt = parseInt(year, 10);

  
    if (!isInputValid(dayInt, monthInt, yearInt)) return;
    if (!isDateValid(dayInt, monthInt, yearInt)) return;

    const inputDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    let years = today.getFullYear() - inputDate.getFullYear();
    let months = today.getMonth() - inputDate.getMonth();
    let days = today.getDate() - inputDate.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    setAge({ years, months, days });
    setErrors({ day: "", month: "", year: "", date: "" }); // Clear errors
  };

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <div className="w-[80%] h-[60%] tablet:w-[60%] tablet:h-[65%] laptop:w-[40%] flex flex-col px-5 py-10 bg-white rounded-t-2xl rounded-bl-2xl rounded-br-[100px]">
        <div className="w-[100%] flex flex-row gap-4 tablet:gap-6">
          {/* Day Input */}
          <div className="w-[29%] tablet:w-[20%] font-Poppins">
            <label className={`text-[12px] font-bold uppercase tracking-widest ${errors.day ? "text-red-500" : "text-SmokeyGrey"}`}>
              Day
            </label>
            <input
              className={`w-[100%] h-[6vh] border-2 rounded-md p-3 focus:outline-none ${
                errors.day ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") calculateAge();
              }}
            />
            {errors.day && <p className="w-[100%] text-[10px] mt-1 italic text-red-500">{errors.day}</p>}
            {errors.date && <p className="w-[100%] text-[10px] mt-1 italic text-red-500">{errors.date}</p>}
          </div>

          {/* Month Input */}
          <div className="w-[29%] tablet:w-[20%] font-Poppins">
            <label className={`text-[12px] font-bold uppercase tracking-widest ${errors.month ? "text-red-500" : "text-SmokeyGrey"}`}>
              Month
            </label>
            <input
              className={`w-[100%] h-[6vh] border-2 rounded-md p-3 focus:outline-none ${
                errors.month ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") calculateAge();
              }}
            />
            {errors.month && <p className="w-[100%] text-[10px] mt-1 italic text-red-500">{errors.month}</p>}
          </div>

          {/* Year Input */}
          <div className="w-[29%] tablet:w-[20%] font-Poppins">
            <label className={`text-[12px] font-bold uppercase tracking-widest ${errors.year ? "text-red-500" : "text-SmokeyGrey"}`}>
              Year
            </label>
            <input
              className={`w-[100%] h-[6vh] border-2 rounded-md p-3 focus:outline-none ${
                errors.year ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") calculateAge();
              }}
            />
            {errors.year && <p className="w-[100%] text-[10px] mt-1 italic text-red-500">{errors.year}</p>}
          </div>
        </div>

        {/* Arrow Button */}
        <div className="flex items-center my-6 font-Poppins">
          <div className="w-[90%] h-[0px] border-t-[1px] border"></div>
          <div
            className="w-[20%] tablet:w-[55px] aspect-square bg-Purple rounded-full flex justify-center items-center cursor-pointer"
            onClick={calculateAge}
          >
            <img className="size-6" src={arrow} alt="Calculate" />
          </div>
          <div className="w-[40%] tablet:w-[0px] h-[0px] border-t-[1px] border"></div>
        </div>

        {/* Age Display */}
        <div className="text-[40px] tablet:text-[50px] italic font-bold font-PoppinsExtraBold">
          <div>
            <span className="text-Purple">{age.years}</span> years
          </div>
          <div>
            <span className="text-Purple">{age.months}</span> months
          </div>
          <div>
            <span className="text-Purple">{age.days}</span> days
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

