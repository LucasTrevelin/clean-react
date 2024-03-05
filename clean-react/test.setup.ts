import '@testing-library/jest-dom'
import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { noop } from 'lodash'
import { afterEach, vi } from 'vitest'

vi.mock('react-router-dom', async (importOriginal) => ({
  ...((await importOriginal()) as object),
  unstable_useBlocker: () => ({
    state: '',
    reset: noop
  })
}))

afterEach(() => {
  cleanup()
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})

const { getComputedStyle } = window
window.getComputedStyle = (elt) => getComputedStyle(elt)

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

vi.stubGlobal('ResizeObserver', ResizeObserverMock)
