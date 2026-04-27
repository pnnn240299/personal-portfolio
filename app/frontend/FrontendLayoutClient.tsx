'use client'

import React, { useEffect, useState } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import Navbar from '@/frontend/components/Navbar'
import { ResumeActions } from '@/frontend/components/common/ResumeActions'

export default function FrontendLayoutClient({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]') as HTMLElement,
      smooth: true,
    })

    return () => scroll.destroy()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      let currentSection = ''

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY
        const sectionHeight = rect.height

        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
          const sectionId = section.getAttribute('id')
          if (sectionId) {
            currentSection = sectionId
          }
        }
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Navbar activeSection={activeSection} />
      <div data-scroll-container>{children}</div>
      <ResumeActions />
    </>
  )
}
