'use client'


import { cn } from '../../lib/utils';
import { useEffect, useState } from 'react'


export default function Meteors({ number = 20 }) {
     const [meteorStyles, setMeteorStyles] = useState(
          [],
     )

     useEffect(() => {
          const styles = [...new Array(number)].map(() => ({
               top: -5,
               left: `${Math.floor(Math.random() * window.innerWidth)}px`,
               animationDelay: `${Math.random() * 1 + 0.2}s`,
               animationDuration: `${Math.floor(Math.random() * 8 + 2)}s`,
          }))
          setMeteorStyles(styles)
     }, [number])

     return (
          <>
               {[...meteorStyles].map((style, idx) => (

                    <span
                         key={idx}
                         className={cn(
                              'pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-blue-500 shadow-[0_0_0_1px_#ffffff10]',
                         )}
                         style={style}
                    >
                         {/* Meteor Tail */}
                         <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-blue-500 to-transparent" />
                    </span>
               ))}
          </>
     )
}

