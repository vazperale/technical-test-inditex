import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // habilitar las funciones globales como `describe`, `it`, `expect`
    environment: 'jsdom', // necesario para pruebas en el DOM
    include: ['**/*.test.*'],
  },
});