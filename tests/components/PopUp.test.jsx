import { render, screen } from '@testing-library/react';
import PopUp from '../../src/components/PopUp';
import { FavoritesProvider } from '../../src/contexts/FavoritesContext';
import { describe } from 'vitest';
import { vi } from 'vitest';

vi.mock('react-leaflet', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    Popup: ({ children }) => <div>{children}</div>,
    useMap: () => ({
      setView: vi.fn(),
      getZoom: () => 13
    })
  };
});

describe('PopUp Component', () => {
  it('should render the popup with correct information', () => {
    const props = {
      id: '1',
      name: 'Test',
      coordinates: [52.2297, 21.0122],
      placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
      isWorking: 'yes',
      isAccessible: 'no'
    };

    render(
      <FavoritesProvider>
        <PopUp {...props} />
      </FavoritesProvider>
    );

    const nameElement = screen.getByText('Test');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toBeVisible();

    const workingStatus = screen.getByText('Punkt jest czynny');
    expect(workingStatus).toBeInTheDocument();
    expect(workingStatus).toBeVisible();

    const accessibilityStatus = screen.getByText(
      'Punkt niedostosowany dla osób z niepełnosprawnością'
    );
    expect(accessibilityStatus).toBeInTheDocument();
    expect(accessibilityStatus).toBeVisible();

    const googleMapsLink = screen.getByRole('link', {
      name: /google map/i
    });
    expect(googleMapsLink).toBeInTheDocument();
    expect(googleMapsLink).toBeVisible();
    expect(googleMapsLink).toHaveAttribute(
      'href',
      expect.stringContaining(
        'https://www.google.com/maps/dir/?api=1&destination=21.0122%2C52.2297&destination_place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&dir_action=navigate'
      )
    );
  });
});
