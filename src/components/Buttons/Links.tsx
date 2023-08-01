import Link from 'next/link'

const className = 'rounded-lg py-2.5 px-4 text-base font-medium ring-offset-0 focus:outline-none bg-emerald-500 shadow text-white hover:bg-emerald-700'

export function PrimaryLink({ href, children }) {
    return <Link href={href} className={className}> {children} </Link>
}