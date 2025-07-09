import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />)
  })

  test('displays Vite and React logos', () => {
    render(<App />)
    
    const viteLogo = screen.getByAltText('Vite logo')
    const reactLogo = screen.getByAltText('React logo')
    
    expect(viteLogo).toBeInTheDocument()
    expect(reactLogo).toBeInTheDocument()
  })

  test('displays initial count as 0', () => {
    render(<App />)
    
    const countButton = screen.getByRole('button', { name: /count is 0/i })
    expect(countButton).toBeInTheDocument()
  })

  test('increments count when button is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const countButton = screen.getByRole('button', { name: /count is 0/i })
    
    await user.click(countButton)
    
    expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
  })

  test('increments count multiple times', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    const countButton = screen.getByRole('button', { name: /count is 0/i })
    
    await user.click(countButton)
    await user.click(countButton)
    await user.click(countButton)
    
    expect(screen.getByRole('button', { name: /count is 3/i })).toBeInTheDocument()
  })

})