import { render, screen } from '@testing-library/react';
import HangmanGame from './HangmanGame';

test('renders game title', () => {
  render(<HangmanGame />);
  const titleElement = screen.getByText(/Journei's React Hangman 2.0/i);
  expect(titleElement).toBeInTheDocument();
});
