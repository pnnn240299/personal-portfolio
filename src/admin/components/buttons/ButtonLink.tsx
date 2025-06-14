import * as React from "react";
import { Link, LinkProps } from "react-router-dom";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/frontend/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow hover:bg-primary/90",
        secondary: "bg-secondary text-white shadow-sm hover:bg-secondary/80",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        // ✅ Custom color variants
        green: "bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-500",
        yellow: "bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-500",
        blue: "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500",
        red: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500",
        gray: "bg-gray-500 text-white hover:bg-gray-600 focus-visible:ring-gray-500",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);


export interface ButtonLinkProps
  extends LinkProps,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  className?: string;
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ to, className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : Link;

    return (
      <Comp
        to={to}
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);

ButtonLink.displayName = "ButtonLink";

export { ButtonLink, buttonVariants };
