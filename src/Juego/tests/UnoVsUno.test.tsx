import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import UnoVsUno from '../components/UnoVsUno';

// Mock de los módulos
vi.mock('../data/combatiente.json', () => ({
  default: [
    { _id: "64d3402d681948532712a45b", name: "Jugador", level: 1, health: 100, maxHealth: 100, attack: 10, defense: 5, powerPoints: 10, powerPointsLeft: 10, type: "Tanque" },
    { _id: "64d3402d681948532712a45z", name: "Enemigo", level: 1, health: 100, maxHealth: 100, attack: 10, defense: 5, powerPoints: 10, powerPointsLeft: 10, type: "Tanque" }
  ]
}));

// Mock de PlayerContainer
const mockOnActionMessage = vi.fn();
const mockOnPlayerAttack = vi.fn();
const mockOnEnemyAttack = vi.fn();

vi.mock('../components/PlayerContainer', () => ({
  default: vi.fn(({ onActionMessage, onPlayerAttack, onEnemyAttack }) => {
    mockOnActionMessage.mockImplementation(onActionMessage);
    mockOnPlayerAttack.mockImplementation(onPlayerAttack);
    mockOnEnemyAttack.mockImplementation(onEnemyAttack);
    return (
      <div data-testid="player-container">
        <button onClick={onPlayerAttack}>Atacar</button>
        <button onClick={onEnemyAttack}>Ataque Enemigo</button>
        <button onClick={() => onActionMessage({ message: 'Mensaje de acción', defenderType: null })}>
          Enviar Mensaje
        </button>
      </div>
    );
  })
}));

// Mock de StatBox
vi.mock('../components/StatBox', () => ({
  default: vi.fn(() => <div data-testid="stat-box" />)
}));

// Mock de estilos CSS
vi.mock('../styles/UnoVsUno.module.css', () => ({
  default: {
    unovsuno: 'unovsuno',
    enemyContainer: 'enemyContainer',
    jugadorParent: 'jugadorParent',
    characterContainer: 'characterContainer',
    jugadorIcon: 'jugadorIcon',
    enemigoIcon: 'enemigoIcon',
    jugadorIconAttack: 'jugadorIconAttack',
    enemigoIconAttack: 'enemigoIconAttack',
    shieldEffect: 'shieldEffect',
    actionMessage: 'actionMessage'
  }
}));

describe('UnoVsUno', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<UnoVsUno />);
    expect(screen.getByTestId('player-container')).toBeInTheDocument();
  });

  it('renders player and enemy icons', () => {
    render(<UnoVsUno />);
    const icons = screen.getAllByAltText('');
    expect(icons).toHaveLength(2);
    expect(icons[0].className).toContain('jugadorIcon');
    expect(icons[1].className).toContain('enemigoIcon');
  });

  it('renders StatBox components', () => {
    render(<UnoVsUno />);
    const statBoxes = screen.getAllByTestId('stat-box');
    expect(statBoxes).toHaveLength(2);
  });

  it('handles player attack animation', () => {
    render(<UnoVsUno />);
    const attackButton = screen.getByText('Atacar');
    fireEvent.click(attackButton);
    const playerIcon = screen.getAllByAltText('')[0];
    expect(playerIcon.className).toContain('jugadorIconAttack');
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(playerIcon.className).not.toContain('jugadorIconAttack');
  });

  it('handles enemy attack animation', () => {
    render(<UnoVsUno />);
    const enemyAttackButton = screen.getByText('Ataque Enemigo');
    fireEvent.click(enemyAttackButton);
    const enemyIcon = screen.getAllByAltText('')[1];
    expect(enemyIcon.className).toContain('enemigoIconAttack');
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(enemyIcon.className).not.toContain('enemigoIconAttack');
  });

  it('displays and clears action message', () => {
    render(<UnoVsUno />);
    const messageButton = screen.getByText('Enviar Mensaje');
    fireEvent.click(messageButton);
    expect(screen.getByText('Mensaje de acción')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(screen.queryByText('Mensaje de acción')).not.toBeInTheDocument();
  });

  it('displays shield effect for player', () => {
    const { container } = render(<UnoVsUno />);
    act(() => {
      mockOnActionMessage({ message: 'Defensa del jugador', defenderType: 'player' });
    });
    
    const shieldElement = container.querySelector('.shieldEffect');
    expect(shieldElement).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(container.querySelector('.shieldEffect')).not.toBeInTheDocument();
  });

  it('displays shield effect for enemy', () => {
    const { container } = render(<UnoVsUno />);
    act(() => {
      mockOnActionMessage({ message: 'Defensa del enemigo', defenderType: 'enemy' });
    });
    
    const shieldElement = container.querySelector('.shieldEffect');
    expect(shieldElement).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(container.querySelector('.shieldEffect')).not.toBeInTheDocument();
  });
});