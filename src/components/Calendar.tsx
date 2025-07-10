import  { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  parseISO,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ShiftDetailsModal from "./ShiftModal";

const Calendar = ({ shifts }: { shifts: any }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = (shifts.results || []).map((shift: any) => ({
    ...shift,
    dateObj: parseISO(shift.date),
  }));

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4 px-4">
      <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
      <div className="flex gap-2">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          <ChevronLeft />
        </button>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const date = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          key={i}
          className="text-sm font-semibold text-center text-gray-500"
        >
          {date[i]}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2 px-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;

        const dayEvents = events.filter((e: any) => isSameDay(e.dateObj, day));

        days.push(
          <div
            className={`border p-2 min-h-[80px] text-sm cursor-pointer transition-all ${
              isSameMonth(day, monthStart) ? "bg-white" : "bg-gray-100"
            } ${
              isSameDay(day, selectedDate ?? new Date(0))
                ? "border-black"
                : "border-gray-200"
            }`}
            key={day.toString()}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <div className="text-xs text-gray-700">{formattedDate}</div>
            {dayEvents.map((event: any) => (
              <div
                key={event.id}
                className="mt-1 p-1 bg-gray-200 rounded text-[11px] cursor-pointer hover:bg-purple-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(event);
                  setModalOpen(true);
                }}
              >
                <div>
                  ⏰ {event.start} - {event.end}
                </div>
                <div>📍 {event.siteInfo?.name ?? ""}</div>
                {event.siteInfo?.postcode && (
                  <div>🏷️ {event.siteInfo.postcode}</div>
                )}
              </div>
            ))}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="px-2">{rows}</div>;
  };

  return (
    <div className="mx-auto p-6 bg-gray-50 rounded-lg shadow">
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      <ShiftDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        shift={selectedEvent}
      />
    </div>
  );
};

export default Calendar;
