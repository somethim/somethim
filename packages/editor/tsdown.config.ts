import { createTsdownConfig, type TsdownConfig } from "@zenncore/config/tsdown";

export default createTsdownConfig({
  entry: ["./src/index.ts"],
  outputOptions: { preserveModules: true },
}) as TsdownConfig;
