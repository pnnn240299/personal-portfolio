import { useInView, motion } from "framer-motion";
import { useRef } from "react";

import html from '@/frontend/assets/skills/html.svg'
import css from '@/frontend/assets/skills/css.svg'
import js from '@/frontend/assets/skills/js.svg'
import react from '@/frontend/assets/skills/react.svg'
import express from '@/frontend/assets/skills/express.svg'
import figma from '@/frontend/assets/skills/figma.svg'
import framer from '@/frontend/assets/skills/framer.svg'
import github from '@/frontend/assets/skills/github.svg'
import mongo from '@/frontend/assets/skills/mongo.svg'
import mysql from '@/frontend/assets/skills/mysql.svg'
import next from '@/frontend/assets/skills/next.svg'
import node from '@/frontend/assets/skills/node.svg'
import npm from '@/frontend/assets/skills/npm.svg'
import postgresql from '@/frontend/assets/skills/postgresql.svg'
import postman from '@/frontend/assets/skills/postman.svg'
import redux from '@/frontend/assets/skills/redux.svg'
import tailwind from '@/frontend/assets/skills/tailwind.svg'
import typescript from '@/frontend/assets/skills/typescript.svg'

const logos = [
     {
          name: 'HTML',
          url: html,
     },
     {
          name: 'CSS',
          url: css,
     },
     {
          name: 'JS',
          url: js,
     },
     {
          name: 'React',
          url: react,
     },
     {
          name: 'Express',
          url: express,
     },
     {
          name: 'Figma',
          url: figma,
     },
     {
          name: 'Framer',
          url: framer,
     },
     {
          name: 'Github',
          url: github,
     },
     {
          name: 'Mongo',
          url: mongo,
     },
     {
          name: 'MySQL',
          url: mysql,
     },
     {
          name: 'Next',
          url: next,
     },
     {
          name: 'Node',
          url: node,
     },
     {
          name: 'NPM',
          url: npm,
     },
     {
          name: 'PostgreSQL',
          url: postgresql,
     },
     {
          name: 'Postman',
          url: postman,
     },
     {
          name: 'Redux',
          url: redux,
     },
     {
          name: 'Tailwind',
          url: tailwind,
     },
     {
          name: 'Typescript',
          url: typescript,
     },
]

export default function Skills() {
     const sectionRef = useRef(null);
     const isInView = useInView(sectionRef, { once: false, margin: "-100px" })

     const containerVariants = {
          hidden: { opacity: 0 },
          visible: {
               opacity: 1,
               transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.2
               }
          }
     }


     const headerVariants = {
          hidden: { opacity: 0, y: 20 },
          visible: {
               opacity: 1,
               y: 0,
               transition: {
                    duration: 0.6,
                    ease: [0.4, 0.02, 0.2, 0.97]
               }
          }
     }


     return (
          <>
               <motion.section ref={sectionRef} initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="w-full mx-auto min-h-screen bg-[#0F1012]  rounded-t-[80px] flex items-center justify-center flex-col overflow-hidden">
                    <div className="flex justify-center items-center h-full px-14">
                         <div className="grid gap-8 w-full mx-auto">
                              <motion.div variants={headerVariants} className="space-y-2 text-center">
                                   <p className="text-4xl font-bold text-green-300">🎉 SUPERPOWER 🎉</p>
                                   <p className="text-sm font-bold text-[#bababb]">which I have</p>
                              </motion.div>
                              <motion.h1 variants={headerVariants} className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight lg:leading-[1.2]  text-white text-center">
                                   Turning ideas into functional, user-friendly web experiences with a blend of logic, creativity, and innovation
                              </motion.h1>
                         </div>
                    </div>

                    <div
                         className="group relative mt-16 flex gap-6 overflow-hidden p-2"
                         style={{
                              maskImage:
                                   'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
                         }}
                    >
                         {Array(5)
                              .fill(null)
                              .map((index) => (
                                   <div
                                        key={index}
                                        className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
                                   >
                                        {logos.map((logo, key) => (
                                             <img
                                                  key={key}
                                                  src={logo.url}
                                                  className="h-10 w-28 px-2 "
                                                  alt={`${logo.name}`}
                                             />
                                        ))}
                                   </div>
                              ))}
                    </div>
               </motion.section>
          </>
     );
}
