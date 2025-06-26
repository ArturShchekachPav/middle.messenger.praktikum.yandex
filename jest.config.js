import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

export default {
  testEnvironment: "jest-enviroment-node",
  transform: {
    ...tsJestTransformCfg,
  },
};
