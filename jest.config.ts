module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts', "**/*.test.ts"],
  moduleNameMapper: {
    "^@modules/(.*)$": "<rootDir>/Modules/$1"
  },
  moduleDirectories: ["./node_modules", "./App"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      tsconfig: "tsconfig.json"
    }],
  },
};
