import type { LucideIcon } from "lucide-react"

interface RequirementItemProps {
  icon: LucideIcon
  iconClassName?: string
  title: string
  description: string
}

export default function RequirementItem({
  icon: Icon,
  iconClassName,
  title,
  description,
}: RequirementItemProps) {
  return (
    <div className="w-full flex flex-col gap-3 max-w-[420px]">
      <div className="flex items-center gap-2">
        <Icon size={16} className={iconClassName} />
        <p className="text-sm">{title}</p>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}