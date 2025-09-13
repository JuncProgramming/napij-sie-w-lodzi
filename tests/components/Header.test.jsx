import { render, screen } from '@testing-library/react';
import Header from '../../src/components/Header';
import { ThemeProvider } from '../../src/contexts/ThemeContext';
import { expect } from 'vitest';

describe('Header Component', () => {
  it('should render the header with logo and theme switch', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toBeVisible();

    const logo = screen.getByRole('img');
    expect(header).toContainElement(logo);

    const themeSwitch = screen.getByRole('switch');
    expect(header).toContainElement(themeSwitch);
  });
});
