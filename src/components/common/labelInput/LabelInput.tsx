import { ChangeEvent } from "react";
import Input from "@/components/common/input/input";
import ErrorMessage from "@/components/common/errorMessage/ErrorMessage";
import { ColorType } from "@/types";

// Q 질문 !! . input.Center에 props로 전달해주기 위해 input에 관련된 속성을 모두 interface에 작성해야 하는 지 궁금합니다.
// interface LabelInputProps extends HTMLAttributes<HTMLInputElement> 방법도 사용해 봤는데
// LabelInput 컴포넌트 사용하는 부분에서 interface에 작성하지 않은 속성을 작성할 경우 에러가 뜹니다.
// => 이런 식으로 컴포넌트를 조합해서 사용할 경우 사용하는 속성에 대한 interface 관리 방법이 궁금합니다.
interface LabelInputProps {
  label: string;
  name: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string | boolean;
  value?: string;
  type?: string;
  color?: ColorType;
  errorMessage?: string;
  require?: boolean;
  readOnly? : boolean;
  inputDisabled?: boolean;
}

export default function LabelInput({
  placeholder,
  label,
  error = false,
  require = false,
  name,
  type = "text",
  value,
  errorMessage,
  onChange,
  readOnly=false,
  inputDisabled = false,
}: LabelInputProps) {
  return (
    <Input>
      <Input.Label htmlFor={name} require={require}>
        {label}
      </Input.Label>
      <Input.Base error={!!error} disabled={inputDisabled}>
        <Input.Center
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
          readOnly={readOnly}
          disabled={inputDisabled}
        />
      </Input.Base>
      <ErrorMessage visible={!!error}>{error || errorMessage}</ErrorMessage>
    </Input>
  );
}
