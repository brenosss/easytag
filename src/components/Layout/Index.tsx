import Header from './Header'
import type { ReactElement } from 'react'


export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}