import React from "react";
import { format, parseISO } from "date-fns";
import {
  Calendar as CalendarIcon,
  MapPin as MapPinIcon,
  User as UserIcon,
  FileText as FileTextIcon,
  Mail as MailIcon,
} from "lucide-react";

interface SiteInfo {
  name?: string | null;
  postcode?: string | null;
}

interface ClientInfo {
  name?: string | null;
  email?: string | null;
}

interface ShiftDetails {
  date: string;
  start: string;
  end: string;
  timezone?: string | null;
  chargeRate?: number | string | null;
  payRate?: number | string | null;
  siteInfo?: SiteInfo;
  clientInfo?: ClientInfo;
  notes?: string | null;
  internalNote?: string | null;
}

interface ShiftDetailsModalProps {
  open: boolean;
  onClose: () => void;
  shift?: ShiftDetails | null;
}

const ShiftModal: React.FC<ShiftDetailsModalProps> = ({
  open,
  onClose,
  shift,
}) => {
  if (!open || !shift) return null;

  const {
    date,
    start,
    end,
    timezone,
    chargeRate,
    payRate,
    siteInfo,
    clientInfo,
    notes,
    internalNote,
  } = shift;

  const parsedDate: string = date
    ? format(typeof date === "string" ? parseISO(date) : date, "M/d/yyyy")
    : "-";
  const timeSlot: string = start && end ? `${start} - ${end}` : "-";

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="relative bg-white rounded-xl p-8 max-w-lg w-full shadow-xl">
        <button
          className="absolute right-5 top-5 text-gray-500 hover:text-black"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6">Shift Details</h2>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 font-semibold mb-2">
                <CalendarIcon size={18} />
                Schedule
              </div>
              <div className="text-sm">
                <div>
                  <span className="font-medium">Date:</span> {parsedDate}
                </div>
                <div>
                  <span className="font-medium">Time:</span> {timeSlot}
                </div>
                <div>
                  <span className="font-medium">Timezone:</span>{" "}
                  {timezone || "-"}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="font-semibold mb-2">Rates</div>
              <div className="text-sm">
                <div>
                  <span className="font-bold">Charge Rate:</span>{" "}
                  {chargeRate ? `£${chargeRate}/hour` : "-"}
                </div>
                <div>
                  <span className="font-bold">Pay Rate:</span>{" "}
                  {payRate ? `£${payRate}/hour` : "-"}
                </div>
              </div>
            </div>
          </div>

          {/* Site Info */}
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <MapPinIcon size={18} />
              Site Information
            </div>
            <div className="text-sm">
              <div>
                <span className="font-medium">Name:</span>{" "}
                {siteInfo?.name || "-"}
              </div>
              <div>
                <span className="font-medium">Postcode:</span>{" "}
                {siteInfo?.postcode || "-"}
              </div>
            </div>
          </div>

          {/* Client Info */}
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <UserIcon size={18} />
              Client Information
            </div>
            <div className="text-sm">
              <div>
                <span className="font-medium">Name:</span>{" "}
                {clientInfo?.name || "-"}
              </div>
              <div className="flex items-center gap-2">
                <MailIcon size={14} />
                <span>{clientInfo?.email || "-"}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center gap-2 font-semibold mb-2">
              <FileTextIcon size={18} />
              Notes
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">Public Notes:</div>
              <div className="bg-gray-100 rounded px-3 py-2 text-sm mb-2">
                {notes || "-"}
              </div>
              <div className="text-xs text-gray-500 mb-1">Internal note:</div>
              <div className="bg-gray-100 rounded px-3 py-2 text-sm">
                {internalNote || "-"}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            className="px-4 py-2 bg-black text-white rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShiftModal;
