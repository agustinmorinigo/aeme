/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

export type ButtonType = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'medium' | 'large';
export interface ButtonStyles {
  base: string;
  variants: Record<ButtonType, string>;
  sizes: Record<ButtonSize, string>;
}

export function Button({ label, onClick, variant = 'primary', size = 'medium' }: ButtonProps) {
  const baseStyles = 'rounded font-semibold transition-colors';

  const variantStyles = {
    primary: 'bg-neutral-600 text-white hover:bg-blue-600',
    secondary: 'bg-gray-700 text-gray-800 hover:bg-gray-300',
  };

  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    // <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`} onClick={onClick}>
    <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`} onClick={onClick}>
      {label}
    </button>
  );
}
