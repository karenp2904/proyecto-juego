import Combatiente from "../interfaces/Combatiente";
import Acciones from "../interfaces/Acciones";

interface GameState {
  playerHealth: number;
  enemyHealth: number;
  playerAttack: number;
  playerDefense: number;
  enemyPowerPoints: number;
  actionTaken: number;
  reward: number;
}

class AIOpponent {
  private model: number[][];
  private learningRate: number;
  private gameHistory: GameState[];
  private epsilon: number; // For epsilon-greedy strategy

  constructor(inputSize: number, outputSize: number) {
    this.model = Array(inputSize).fill(0).map(() => Array(outputSize).fill(0).map(() => Math.random() - 0.5));
    this.learningRate = 0.1;
    this.gameHistory = [];
    this.epsilon = 0.1;
  }

  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }

  predict(input: number[]): number[] {
    return this.model.map(weights => 
      this.sigmoid(input.reduce((sum, value, i) => sum + value * weights[i], 0))
    );
  }

  train(input: number[], target: number[]): void {
    const prediction = this.predict(input);
    const error = target.map((t, i) => t - prediction[i]);

    for (let i = 0; i < this.model.length; i++) {
      for (let j = 0; j < this.model[i].length; j++) {
        this.model[i][j] += this.learningRate * error[j] * input[i] * prediction[j] * (1 - prediction[j]);
      }
    }
  }

  chooseAction(jugador: Combatiente, enemigo: Combatiente, acciones: Acciones[]): Acciones {
    const input = this.getStateVector(jugador, enemigo);

    if (Math.random() < this.epsilon) {
      // Explore: choose a random action
      return acciones[Math.floor(Math.random() * acciones.length)];
    } else {
      // Exploit: choose the best action according to the model
      const prediction = this.predict(input);
      const actionIndex = prediction.indexOf(Math.max(...prediction));
      return acciones[actionIndex];
    }
  }

  updateStrategy(jugador: Combatiente, enemigo: Combatiente, actionIndex: number, reward: number): void {
    const state = this.getStateVector(jugador, enemigo);
    
    this.gameHistory.push({
      playerHealth: jugador.health / jugador.maxHealth,
      enemyHealth: enemigo.health / enemigo.maxHealth,
      playerAttack: jugador.attack / 100,
      playerDefense: jugador.defense / 100,
      enemyPowerPoints: enemigo.powerPointsLeft / enemigo.powerPoints,
      actionTaken: actionIndex,
      reward: reward
    });

    const target = Array(this.model[0].length).fill(0);
    target[actionIndex] = reward;
    this.train(state, target);
  }

  private getStateVector(jugador: Combatiente, enemigo: Combatiente): number[] {
    return [
      jugador.health / jugador.maxHealth,
      enemigo.health / enemigo.maxHealth,
      jugador.attack / 100,
      jugador.defense / 100,
      enemigo.powerPointsLeft / enemigo.powerPoints
    ];
  }

  saveModel(): string {
    return JSON.stringify(this.model);
  }

  loadModel(modelString: string): void {
    this.model = JSON.parse(modelString);
  }

  getGameHistory(): GameState[] {
    return this.gameHistory;
  }

  clearGameHistory(): void {
    this.gameHistory = [];
  }
}

export default AIOpponent;