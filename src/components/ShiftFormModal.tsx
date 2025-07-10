import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { ShiftDetails } from "../types/shift";
import axiosClient from "../lib/axiosClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  onClose: () => void;
  onCreated: () => void;
}

const TIMEZONE_OPTIONS = [
  { label: "UTC", value: "UTC" },
  { label: "Europe/London", value: "Europe/London" },
  { label: "Europe/Paris", value: "Europe/Paris" },
  { label: "America/New_York", value: "America/New_York" },
  { label: "Asia/Kolkata", value: "Asia/Kolkata" },
  // Add more timezones as needed
];

export default function ShiftFormModal({ onClose, onCreated }: Props) {
  const { register, handleSubmit, setValue, watch } = useForm<ShiftDetails>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      site: { name: "", postcode: "" },
      client: { name: "", email: "" },
      timezone: "UTC",
      checkCalls: false,
    },
  });

  const timezone = watch("timezone");

  async function onSubmit(data: ShiftDetails) {
    const payload = [{ jobDetails: data }];
    await axiosClient.post("/api/rota/integration/add-new-job/", payload);
    onClose();
    onCreated();
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Add New Shift</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex gap-2 items-end">
            <Input id="date" type="date" {...register("date")} required />

            <Input
              id="startTime"
              type="time"
              {...register("startTime")}
              required
            />

            <Input id="endTime" type="time" {...register("endTime")} required />
          </div>

          <Select
            value={timezone}
            onValueChange={(val) => setValue("timezone", val)}
          >
            <SelectTrigger id="timezone" className="w-full">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {TIMEZONE_OPTIONS.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Input
              id="chargeRate"
              placeholder="Charge Rate"
              type="number"
              step="0.01"
              {...register("chargeRate", { valueAsNumber: true })}
              required
            />

            <Input
              id="payRate"
              placeholder="Pay Rate"
              type="number"
              step="0.01"
              {...register("payRate", { valueAsNumber: true })}
              required
            />
          </div>

          <div>
            <p className="font-semibold mb-2">Site Information</p>
            <div className="flex gap-2">
              <Input
                id="siteName"
                placeholder="Site Name"
                {...register("site.name")}
                required
              />

              <Input
                id="sitePostcode"
                placeholder="Post Code"
                {...register("site.postcode")}
                required
              />
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Client Information</p>
            <div className="flex gap-2">
              <Input
                id="clientName"
                placeholder="Client Name"
                {...register("client.name")}
                required
              />

              <Input
                id="clientEmail"
                placeholder="Client Email"
                type="email"
                {...register("client.email")}
                required
              />
            </div>
          </div>

          <Textarea
            id="notes"
            placeholder="Notes"
            {...register("notes")}
            required
          />

          <Textarea
            id="internalNote"
            placeholder="Internal Note"
            {...register("internalNote")}
            required
          />

          <div className="flex items-start gap-3">
            <Checkbox id="checkCalls" {...register("checkCalls")} />
            <Label htmlFor="checkCalls">Check Calls Required</Label>
          </div>

          <div className="w-full max-w-full flex justify-evenly gap-3">
            <Button type="submit" className="flex-1 bg-black text-white">
              Add Shift
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 border border-black text-black cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
