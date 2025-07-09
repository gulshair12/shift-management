import { Button } from "@/components/ui/button";

export default function AddShiftButton({ onClick }: { onClick: () => void }) {
  return (
    <Button className="bg-black text-white cursor-pointer" onClick={onClick}>
      + Add Shift
    </Button>
  );
}
