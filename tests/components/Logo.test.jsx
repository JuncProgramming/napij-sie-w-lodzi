import { render, screen } from '@testing-library/react';
import Logo from '../../src/components/Logo';
import ThemeProvider from '../../src/contexts/ThemeContext';

describe('Logo Component', () => {
  it('should render the logo image', () => {
    render(
      <ThemeProvider>
        <Logo />
      </ThemeProvider>
    );

    const logo = screen.getByRole('img', { name: /Logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toBeVisible();
  });
});
