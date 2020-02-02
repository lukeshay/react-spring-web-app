module.exports = {
  collectCoverageFrom: [
    "**/src/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/*.d.ts",
    "!**/types/**",
    "!**/__mocks__/**",
    "!**/__tests__/**"
  ],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 60,
      lines: 70
    }
  },
  transform: {
    "^.+.(ts|tsx)$": "ts-jest",
    "^.+.(js|jsx)$": "babel-jest"
  },
  coverageReporters: ["lcov"],
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
    "\\.(svg)$": "<rootDir>/src/__mocks__/svgSpriteMock.ts"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  reporters: ["default", "jest-junit"],
  testRegex: "__tests__/.*(js|ts|tsx)$",
  setupFiles: ["./configs/setupEnzyme.ts", "jest-localstorage-mock"],
  globals: {
    "ts-test": {
      tsConfigFile: "./jest.tsconfig.json"
    }
  }
};
