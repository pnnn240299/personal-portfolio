'use client'

// Chakra Imports
// Custom Icons
import * as React from "react";

import { RiMoonFill, RiSunFill } from "react-icons/ri";
export default function FixedPlugin(props: { [s: string]: any }) {
  const { ...rest } = props;
  const [darkmode, setDarkmode] = React.useState(
    typeof window !== 'undefined' ? document.body.classList.contains("dark") : false
  );

  return (
    <button
      className="border-px fixed bottom-[30px] right-[35px] !z-[99] flex h-[60px] w-[60px] items-center justify-center rounded-full border-[#6a53ff] bg-gradient-to-br from-brandLinear to-blueSecondary p-0"
      onClick={() => {
        if (typeof window !== 'undefined') {
          if (darkmode) {
            document.body.classList.remove("dark");
            setDarkmode(false);
          } else {
            document.body.classList.add("dark");
            setDarkmode(true);
          }
        }
      }}
      {...rest}
    >
      <div className="cursor-pointer text-gray-600">
        {darkmode ? (
          <RiSunFill className="h-4 w-4 text-white" />
        ) : (
          <RiMoonFill className="h-4 w-4 text-white" />
        )}
      </div>
    </button>
  );
}
