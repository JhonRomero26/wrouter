import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { beforeEach, describe, expect, it, Mock, vi } from "vitest"
import { Link } from "./Link"
import { Route } from "./Route"
import { Router } from "./Router"
import { getCurrentPath } from "./utils"

vi.mock("./utils.ts", () => ({
  getCurrentPath: vi.fn()
}))
const getCurrentPathMocked = getCurrentPath as Mock

describe("Router Componente", () => {
  beforeEach(() => {
    cleanup()
  })

  it("should render without problems", () => {
    render(<Router routes={[]} />)
    expect(Router).toBeDefined()
  })

  it("should render 404 if no routes match", () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
    expect(screen.getByText("404")).toBeTruthy()
  })

  it("should render the component of the first route that matches", () => {
    getCurrentPathMocked.mockReturnValue("/about")

    const routes = [
      {
        path: "/",
        Component: () => <h1>Home</h1>
      },
      {
        path: "/about",
        Component: () => <h1>About</h1>
      }
    ]

    render(<Router routes={routes} />)
    expect(screen.getByText("About")).toBeTruthy()
  })

  it("should change page with Link component", async () => {
    getCurrentPathMocked.mockReturnValueOnce("/")

    render(<Router>
      <Route path="/" Component={() => (
        <main>
          <h1>Home</h1>
          <Link href="/about">Go to About</Link>
        </main>
      )} />
      <Route path="/about" Component={() => (
        <main>
          <h1>About</h1>
        </main>
      )} />
    </Router>)

    const link = screen.getByText(/Go to About/)
    fireEvent.click(link)
    const aboutTitle = await screen.findByText("About")

    expect(aboutTitle).toBeTruthy()
  })
})
