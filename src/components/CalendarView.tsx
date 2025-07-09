import { useState, useEffect } from "react";
import AddShiftButton from "./AddShiftButton";
import ShiftFormModal from "./ShiftFormModal";
import type { ShiftDetails } from "../types/shift";
import axiosClient from "../lib/axiosClient";
import Calendar from "./Calendar";
import { StatsCards } from "./StatsCards";

interface ShiftApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ShiftDetails[];
}

export default function CalendarView() {
  const [showForm, setShowForm] = useState(false);
  const [shifts, setShifts] = useState<ShiftApiResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  // Fetch shifts data
  const fetchShifts = async () => {
    try {
      const res = await axiosClient.get(
        `/api/rota/integration/company/${import.meta.env.VITE_COMPANY_ID}`
      );
      setShifts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, []);

  return (
    <div className="p-4 w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-bold">Shift Management</h2>
          <h2 className="text-md ">Manage and view your security shifts</h2>
        </div>
        <AddShiftButton onClick={() => setShowForm(true)} />
      </div>

      <Calendar shifts={shifts} />

      <StatsCards
        totalShifts={shifts.count || 0}
        thisMonth={
          shifts.results.filter((shift) =>
            shift.date.includes(new Date().getMonth())
          ).length || 0
        }
        totalRevenue={
          // Replace with proper calculation if available
          shifts.results.reduce(
            (sum, shift) =>
              sum +
              (typeof shift.chargeRate === "number" ? shift.chargeRate : 0),
            0
          )
        }
      />

      {showForm && (
        <ShiftFormModal
          onClose={() => setShowForm(false)}
          onCreated={fetchShifts}
        />
      )}
    </div>
  );
}
