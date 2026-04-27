'use client'

import * as PopoverPrimitive from "@radix-ui/react-popover";

const PopoverHorizon = (props: {
  trigger: JSX.Element;
  extra?: string;
  content: JSX.Element;
}) => {
  const { extra, trigger, content } = props;
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Content
        className={`w-max rounded-xl bg-white py-3 px-4 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none ${extra}`}
      >
        {content}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Root>
  );
};

export default PopoverHorizon;
