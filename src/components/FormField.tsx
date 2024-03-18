import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";

type TFormField = {
  id: string;
  name: string;
  title: string;
  isRequired: boolean;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  value?: string;
  defaultValue?: string;
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
};

const FormField = ({
  id,
  isRequired,
  name,
  title,
  type,
  placeholder,
  value,
  defaultValue,
  onChange,
}: TFormField) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id}>
        {title} {isRequired && <span className="text-red-300">*</span>}
      </Label>

      <Input
        value={value}
        name={name}
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default FormField;
