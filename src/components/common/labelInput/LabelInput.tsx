import Input from "@/components/common/input/input";
import ErrorMessage from "@/components/common/errorMessage/ErrorMessage";
interface LabelInputProps {
  label: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
}

export default function LabelInput({
  placeholder,
  label,
  error,
  errorMessage,
}: LabelInputProps) {
  return (
    <Input>
      <Input.Label>{label}</Input.Label>
      <Input.Base error={error}>
        <Input.Center placeholder={placeholder} />
      </Input.Base>
      <ErrorMessage visible={error}>{errorMessage}</ErrorMessage>
    </Input>
  );
}
