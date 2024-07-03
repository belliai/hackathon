
import { Input } from "@/components/ui/input";

interface SpotRateLabelAndInputProps {
  label: string;
  type?: string;
  defaultValue?: string;
  className?: string;
  required?: boolean;
}

const SpotRateLabelAndInput = ({
  label,
  type = "text",
  defaultValue = "",
  className = "",
  required = false
}: SpotRateLabelAndInputProps) => {
  return (
    <div className="flex items-center gap-2">
      <label className={`whitespace-nowrap`}>{label} {required && "*"}</label>
      <Input type={type} defaultValue={defaultValue} className={className} />
    </div>
  );
};

export default SpotRateLabelAndInput;
