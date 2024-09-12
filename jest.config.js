// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  /*
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy', // Mapea los archivos CSS a un módulo de prueba
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mapea archivos de imagen a un mock
  },
  */
};

