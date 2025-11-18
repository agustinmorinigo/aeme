import type { ReactNode } from "react"
import type { FieldValues, Path } from "react-hook-form"

interface FormFieldProps<T extends FieldValues> {
  name?: Path<T>
  label?: string
  error?: string
  children: ReactNode
}

export function FormField<T extends FieldValues>({
  name,
  label,
  error,
  children,
}: FormFieldProps<T>) {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm">
          {label}
        </label>
      )}

      {children}

      {error && (
        <span role="alert" className="text-xs text-destructive">
          {error}
        </span>
      )}
    </div>
  )
}
