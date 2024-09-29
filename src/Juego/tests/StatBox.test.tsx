import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatBox from '../components/StatBox';
import type { Combatiente } from '../interfaces/Combatiente';

describe('StatBox', () => {
  const defaultProps: Pick<Combatiente, 'attack' | 'defense' | 'health' | 'maxHealth'> = {
    attack: 10,
    defense: 5,
    health: 80,
    maxHealth: 100
  };

  it('renders without crashing', () => {
    render(<StatBox {...defaultProps} />);
    expect(screen.getByText('ATK:')).toBeInTheDocument();
  });

});