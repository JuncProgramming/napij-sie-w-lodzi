import { render, screen } from '@testing-library/react';
import ThemeSwitch from '../../src/components/ThemeSwitch';
import { ThemeProvider } from '../../src/contexts/ThemeContext';
import { expect } from 'vitest';

describe('ThemeSwitch Component', () => {
  it('should render the theme switch button', () => {
    render(
      <ThemeProvider>
        <ThemeSwitch />
      </ThemeProvider>
    );

    const themeSwitch = screen.getByRole('switch', {
      name: /przełącz motyw jasny|ciemny/i
    });
    expect(themeSwitch).toBeInTheDocument();
    expect(themeSwitch).toBeVisible();
    expect(themeSwitch).toBeEnabled();
  });
});
