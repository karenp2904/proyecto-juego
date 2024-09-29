// server.ts
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { Combatiente, GameState } from '../interfaces/Combatiente';


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

interface Game {
  id: string;
  players: string[];
  gameState: GameState;
}

const games: { [key: string]: Game } = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('createGame', (playerId: string) => {
    const gameId = uuidv4();
    games[gameId] = {
      id: gameId,
      players: [playerId],
      gameState: initializeGameState(playerId)
    };
    socket.join(gameId);
    console.log(`Game created: ${gameId}`);
    socket.emit('gameCreated', gameId);
  });

  socket.on('joinGame', (gameId: string, playerId: string) => {
    console.log(`Attempting to join game: ${gameId}`);
    const game = games[gameId];
    if (game && game.players.length < 2) {
      game.players.push(playerId);
      socket.join(gameId);
      console.log(`Player ${playerId} joined game ${gameId}`);
      socket.emit('gameJoined', gameId);
      if (game.players.length === 2) {
        game.gameState = initializeGameState(game.players[0], game.players[1]);
        io.to(gameId).emit('gameStart', game.gameState);
        console.log(`Game ${gameId} started`);
      }
    } else {
      console.log(`Failed to join game: ${gameId}`);
      socket.emit('joinError', 'Game not found or full');
    }
  });

  socket.on('action', (gameId: string, playerId: string, action: string) => {
    console.log(`Action received: ${action} from player ${playerId} in game ${gameId}`);
    const game = games[gameId];
    if (game && game.gameState.currentTurn === playerId) {
      game.gameState = processAction(game.gameState, playerId, action);
      io.to(gameId).emit('gameStateUpdate', game.gameState);
      console.log(`Game state updated for game ${gameId}`);
    }
  });

  socket.on('actionMessage', (gameId: string, message: string) => {
    const game = games[gameId];
    if (game) {
      game.gameState.actionMessage = message;
      io.to(gameId).emit('gameStateUpdate', game.gameState);
      console.log(`Action message sent in game ${gameId}: ${message}`);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    // Handle player disconnection
  });
});

function initializeGameState(player1Id: string, player2Id?: string): GameState {
  const defaultCombatiente: Combatiente = {
    _id: '',
    name: 'Default Fighter',
    type: 'Default',
    level: 1,
    powerPoints: 10,
    powerPointsLeft: 10,
    health: 100,
    maxHealth: 100,
    defense: 10,
    attack: 10,
    damage: 5,
    experience: 0,
    inventory: [],
    equippedWeapons: [],
    equippedArmor: [],
    abilities: ['Basic Attack']
  };

  return {
    jugador: { ...defaultCombatiente, _id: player1Id, name: 'Player 1' },
    enemigo: { ...defaultCombatiente, _id: player2Id || 'ai', name: 'Player 2' },
    currentTurn: player1Id,
    isOpponentSelected: false,
    actionMessage: null
  };
}

function processAction(gameState: GameState, playerId: string, action: string): GameState {
  const newState = { ...gameState };

  switch (action) {
    case 'attack':
      // Implement attack logic
      if (playerId === newState.jugador._id) {
        newState.enemigo.health = Math.max(0, newState.enemigo.health - 10);
      } else {
        newState.jugador.health = Math.max(0, newState.jugador.health - 10);
      }
      break;
    case 'selectOpponent':
      newState.isOpponentSelected = true;
      break;
    case 'endTurn':
      newState.currentTurn = newState.currentTurn === newState.jugador._id ? newState.enemigo._id : newState.jugador._id;
      break;
    default:
      if (action.startsWith('setJugador:')) {
        newState.jugador = JSON.parse(action.split(':')[1]);
      } else if (action.startsWith('setEnemigo:')) {
        newState.enemigo = JSON.parse(action.split(':')[1]);
      }
  }

  return newState;
}

server.listen(3000, () => {
  console.log('Server running on port 3000');
});