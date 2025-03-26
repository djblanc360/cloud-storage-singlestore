/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import path from "path";

/** @type {import("next").NextConfig} */
const config = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@app": path.resolve(__dirname, "./src/app"),
            "@lib": path.resolve(__dirname, "./src/lib"),
            "@server": path.resolve(__dirname, "./src/server"),
            "@styles": path.resolve(__dirname, "./src/styles"),
        };
        return config;
    },
};

export default config;