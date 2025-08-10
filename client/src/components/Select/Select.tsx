import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDownIcon, CheckIcon } from "@radix-ui/react-icons";
import "./Select.css";

interface Option {
  value: string;
  label: string;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder,
}: Props) {
  return (
    <RadixSelect.Root value={value} onValueChange={onChange}>
      <RadixSelect.Trigger className="select-trigger">
        <RadixSelect.Value placeholder={placeholder || "Selecciona..."} />
        <RadixSelect.Icon>
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Content className="select-content">
        <RadixSelect.Viewport>
          {options.map((opt) => (
            <RadixSelect.Item
              key={opt.value}
              value={opt.value}
              className="select-item"
            >
              <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
              <RadixSelect.ItemIndicator>
                <CheckIcon />
              </RadixSelect.ItemIndicator>
            </RadixSelect.Item>
          ))}
        </RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Root>
  );
}
