module.exports = {
    preset: 'ts-jest',                // jest自動編譯ts
    testEnvironment: 'node',          // 測試環境
    transform: { 
		  // "^.+\\.(ts|tsx)$": "ts-jest",   // 凡遇到.ts, .tsx檔案，就用ts-jest編譯，引用測試的tsconfig.json
      "^.+\\.(ts|tsx)$": ['ts-jest', { tsconfig: '<rootDir>/autoGenApi/test/tsconfig.json' }],
    },
	  rootDir: '../../',
    moduleNameMapper: { 
		  '^@/(.*)$': '<rootDir>/src/$1', // 凡遇到@，就映設到src/
    },
    extensionsToTreatAsEsm: [".ts"],  // .ts檔案視為ECMAScript Module，才能使用import/export
    setupFiles: [                     // Jest執行前的初始化邏輯
      "<rootDir>/autoGenApi/test/jest.setup.ts"
    ],
};