import Link from 'next/link'
import { clsx } from "clsx";

const defaultStyle = 'rounded-lg py-2.5 px-4 text-base font-medium ring-offset-0 focus:outline-none bg-emerald-500 shadow text-white hover:bg-emerald-700'

export function PrimaryLink({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
    return <Link href={href} className={clsx(defaultStyle, className)}> {children} </Link>
}