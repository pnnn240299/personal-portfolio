import type { ReactNode } from 'react'
import FrontendLayoutClient from './FrontendLayoutClient'

export default function FrontendLayout({ children }: { children: ReactNode }) {
  return <FrontendLayoutClient>{children}</FrontendLayoutClient>
}
