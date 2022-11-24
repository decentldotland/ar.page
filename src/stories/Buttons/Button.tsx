import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactElement, forwardRef } from 'react';

import { Spinner } from '../Spinner';

const variants = {
  primary: ['bg-pri-900', 'text-ter-900 font-semibold', 'border-pri-900', 'hover:bg-pri-100'],
  secondary: ['bg-white', 'text-black', 'border-gainsboro', 'hover:bg-indigo-300'],
  pinksheet: ['bg-pinksheet-900', 'text-white', 'border-pinksheet-900', 'hover:bg-pinksheet-100'],
  textPinksheet: ['bg-none', 'text-pinksheet-900 font-semibold', 'border-transparent', 'hover:border-pinksheet-900'],
  bluechip: ['bg-bluechip-900', 'text-white', 'border-bluechip-900', 'hover:bg-bluechip-100'],
  textBluechip: ['bg-none', 'text-white font-semibold', 'border-transparent', 'hover:border-white'],
  custom: [],
}

type IconProps =
  | { startIcon: ReactElement | undefined; endIcon?: never }
  | { endIcon: ReactElement | undefined; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined };

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  fitContentWidth?: boolean;
  isLoading?: boolean;
} & IconProps;

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
      fitContentWidth = true,
      isLoading = false,
      disabled,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    const [background, text, border, hover] = variants[variant];
    const variantClasses = `h-[40px] lg:h-[50px] text-sm lg:text-lg px-4 lg:px-8 ${background} ${text} border ${border} hover:text-white hover:shadow-md ${hover} active:shadow-none active:scale-[0.98] disabled:active:scale-1 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200 disabled:hover:shadow-none`
    const isCustomVariant = variant === 'custom';

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          'whitespace-nowrap hover:transition duration-200 ease-in-out flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed rounded-xl focus:outline-none',
          !isCustomVariant && variantClasses,
          !fitContentWidth && 'w-full',
          className,
        )}
        disabled={isDisabled}
        {...props}
      >
        {isLoading && <Spinner size="custom" className="text-current w-4 h-4 lg:w-6 lg:h-6" />}
        {!isLoading && startIcon}
        <span className={clsx(isLoading && 'ml-2', startIcon && 'ml-2', endIcon && 'mr-2')}>{props.children}</span>
        {!isLoading && endIcon}
      </button >
    );
  }
);

Button.displayName = 'Button';
