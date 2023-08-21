import { useContext } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateContext } from "../Contexts/DateContext";
import dayjs from "dayjs";
export default function DateSelector() {
  const { selectedDate, setSelectedDate } = useContext(DateContext);
  function isBefore2021(date) {
    const targetDate = new Date("2021-01-01T00:00:00");
    return date < targetDate;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={"month and year"}
        views={["month", "year"]}
        value={selectedDate}
        defaultValue={dayjs(new Date())}
        date={selectedDate}
        onChange={(newDate) => setSelectedDate(newDate)}
        disableFuture
        shouldDisableDate={isBefore2021}
        slotProps={{
          textField: {
            size: "small",

            classes: {
              root: "monthAndYear",
            },
          },
        }}
      />
    </LocalizationProvider>
  );
}
