import { HTMLAttributes } from "react"
import { EVENTS } from "./consts"

export type LinkProps = {
  target?: string
  href: string
} & Omit<HTMLAttributes<HTMLAnchorElement>, "href">

function navigate(href: string) {
  window.history.pushState({}, "", href)
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link({ target, href, children, ...props }: LinkProps) {
  const handleClick = (e: React.MouseEvent) => {

    const isMainEvent = e.button === 0
    const isModifiedEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey
    const isManageableEvent = target === undefined || target === "_self"

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      e.preventDefault()
      navigate(href)
    }
  }

  return (
    <a onClick={handleClick} href={href} target={target} {...props}>{children}</a>
  )
}
