import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerContainer from '../components/PlayerContainer';
import { Combatiente } from '../interfaces/Combatiente';
import { Acciones } from '../interfaces/Acciones';

// Mock de los módulos
vi.mock('../data/combatiente.json', () => ({
  default: [
    { _id: "64d3402d681948532712a45b", name: "Jugador", level: 1, health: 100, maxHealth: 100, attack: 10, defense: 5, powerPoints: 10, powerPointsLeft: 10, type: "Tanque" },
    { _id: "64d3402d681948532712a45z", name: "Enemigo", level: 1, health: 100, maxHealth: 100, attack: 10, defense: 5, powerPoints: 10, powerPointsLeft: 10, type: "Tanque" }
  ]
}));

vi.mock('../data/acciones.json', () => ({
  default: [
    { _id: "1", name: "Ataque Fuerte", powerCost: 3, heroType: "Tanque", minLevel: 1, effects: { increaseAttack: 5 } }
  ]
}));

vi.mock('../data/Efectosheroe.json', () => ({
  default: {
    Tanque: {
      efectos: ["causar daño", "causar daño crítico"],
      efectos_daño: ["100%", "150-200%"],
      cantidad_filas: [3, 1]
    }
  }
}));

describe('PlayerContainer', () => {
  const mockProps = {
    onActionMessage: vi.fn(),
    onPlayerAttack: vi.fn(),
    onEnemyAttack: vi.fn(),
    jugador: null as Combatiente | null,
    enemigo: null as Combatiente | null,
    setJugador: vi.fn(),
    setEnemigo: vi.fn()
  };

  beforeEach(() => {
    vi.useFakeTimers();
    mockProps.jugador = { _id: "64d3402d681948532712a45b", name: "Jugador", level: 1, health: 100, maxHealth: 100, attack: 10, defense: 5, powerPoints: 10, powerPointsLeft: 10, type: "Tanque" } as Combatiente;
    mockProps.enemigo = { _id: "64d3402d681948532712a45z", name: "Enemigo", level: 1, health: 100, maxHealth: 100, attack: 10, defense: 5, powerPoints: 10, powerPointsLeft: 10, type: "Tanque" } as Combatiente;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<PlayerContainer {...mockProps} />);
    expect(screen.getByText(/Atacar/i)).toBeInTheDocument();
  });

  it('displays player and enemy names when data is loaded', () => {
    render(<PlayerContainer {...mockProps} />);
    expect(screen.getByText(/Jugador lvl. 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Enemigo lvl. 1/i)).toBeInTheDocument();
  });

  it('handles attack button click', () => {
    render(<PlayerContainer {...mockProps} />);
    fireEvent.click(screen.getByText(/Atacar/i));
    expect(mockProps.onPlayerAttack).toHaveBeenCalled();
  });

  it('displays skills when "Acciones" button is clicked', () => {
    render(<PlayerContainer {...mockProps} />);
    fireEvent.click(screen.getByText(/Acciones/i));
    expect(screen.getByText(/Ataque Fuerte/i)).toBeInTheDocument();
  });

  it('handles skill selection', () => {
    render(<PlayerContainer {...mockProps} />);
    fireEvent.click(screen.getByText(/Acciones/i));
    fireEvent.click(screen.getByText(/Ataque Fuerte/i));
    expect(mockProps.onActionMessage).toHaveBeenCalled();
  });

  it('updates timer during player turn', () => {
    render(<PlayerContainer {...mockProps} />);
    expect(screen.getByText('120')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText('119')).toBeInTheDocument();
  });

  it('ends turn when timer reaches 0', () => {
    render(<PlayerContainer {...mockProps} />);
    act(() => {
      vi.advanceTimersByTime(120000);
    });
    expect(mockProps.onActionMessage).toHaveBeenCalledWith(expect.objectContaining({
      message: "¡Se acabó el tiempo! Turno del enemigo."
    }));
  });

  it('displays correct power points', () => {
    render(<PlayerContainer {...mockProps} />);
    expect(screen.getByText('10 / 10 Puntos de Poder')).toBeInTheDocument();
  });

  it('updates health bar styles based on health percentage', () => {
    mockProps.jugador!.health = 30; // Set health to 30%
    render(<PlayerContainer {...mockProps} />);
    const healthBar = screen.getByText('30%').closest('button');
    expect(healthBar).toHaveStyle('background-color: red');
  });

  it('disables attack button when it is not player turn', () => {
    render(<PlayerContainer {...mockProps} />);
    act(() => {
      vi.advanceTimersByTime(120000); // End player turn
    });
    expect(screen.getByText(/Atacar/i)).toBeDisabled();
  });

  it('shows game over message when player health reaches 0', () => {
    mockProps.jugador!.health = 0;
    render(<PlayerContainer {...mockProps} />);
    expect(screen.getByText('¡Has perdido la batalla!')).toBeInTheDocument();
  });
});