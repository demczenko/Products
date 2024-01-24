import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { HTMLInputTypeAttribute } from "react";

type TFormField = {
  id: string,
  name: string,
  title: string,
  isRequired: boolean
  type: HTMLInputTypeAttribute
  placeholder: string
};

const FormField = ({
  id,
  isRequired,
  name,
  title,
  type,
  placeholder
}: TFormField) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id}>
        {title} {isRequired && <span className="text-red-300">*</span>}
      </Label>
      <Input name={name} type={type} id={id} placeholder={placeholder} />
    </div>
  );
};

export default FormField;