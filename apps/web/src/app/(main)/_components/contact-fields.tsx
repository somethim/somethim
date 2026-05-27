"use client";

import {
  type FormEntries,
  field,
  type GenericForm,
} from "@zenncore/web/components/inferred-form";
import { z } from "zod";

type ContactFieldProps = {
  value?: string | null;
  onValueChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  type?: string;
  name?: string;
  disabled?: boolean;
};

const ContactInput = ({
  value,
  onValueChange,
  onBlur,
  placeholder,
  type = "text",
  name,
  disabled,
}: ContactFieldProps) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    disabled={disabled}
    value={value ?? ""}
    onChange={(event) => onValueChange?.(event.target.value)}
    onBlur={() => onBlur?.()}
    style={{ borderRadius: 16 }}
    className="w-full border border-white/10 bg-white/5 px-4.5 py-3.5 text-[15px] text-white outline-none transition-colors duration-200 placeholder:text-white/25 focus:border-white/30 focus:bg-white/[0.07]"
  />
);

const ContactTextarea = ({
  value,
  onValueChange,
  onBlur,
  placeholder,
  name,
  disabled,
}: Omit<ContactFieldProps, "type">) => (
  <textarea
    name={name}
    placeholder={placeholder}
    disabled={disabled}
    rows={5}
    value={value ?? ""}
    onChange={(event) => onValueChange?.(event.target.value)}
    onBlur={() => onBlur?.()}
    style={{ borderRadius: 16 }}
    className="w-full resize-none border border-white/10 bg-white/5 px-4.5 py-3.5 text-[15px] text-white outline-none transition-colors duration-200 placeholder:text-white/25 focus:border-white/30 focus:bg-white/[0.07]"
  />
);

const ContactEmailInput = (props: Omit<ContactFieldProps, "type">) => (
  <ContactInput {...props} type="email" />
);

export const contactConfig = {
  name: field({
    shape: "custom",
    validator: z.string().min(1),
    placeholder: "Name",
    Component: ContactInput,
    classList: {
      label: "hidden",
      field: "col-span-1",
      error: "mt-1 text-xs text-red-400",
    },
  }),
  email: field({
    shape: "custom",
    validator: z.email(),
    placeholder: "Email",
    Component: ContactEmailInput,
    classList: {
      label: "hidden",
      field: "col-span-1",
      error: "mt-1 text-xs text-red-400",
    },
  }),
  message: field({
    shape: "custom",
    validator: z.string().min(1),
    placeholder: "Tell me about your project...",
    Component: ContactTextarea,
    classList: {
      label: "hidden",
      field: "col-span-full",
      error: "mt-1 text-xs text-red-400",
    },
  }),
} satisfies GenericForm;

export type ContactFormData = FormEntries<typeof contactConfig>;
