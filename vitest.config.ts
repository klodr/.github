import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["dist/**", "node_modules/**"],
    // `default` keeps vitest's standard human-readable console output;
    // `junit` emits a `test-results.junit.xml` that Codecov's Test
    // Analytics dashboard consumes (flaky-test detection, slowest-test
    // report, per-test failure history). Gitignored, never committed.
    reporters: ["default", ["junit", { outputFile: "test-results.junit.xml" }]],
    coverage: {
      provider: "v8",
      // `lcov` for codecov-action's primary upload; `json` (v8 native)
      // carries the full branch + statement detail Codecov needs to
      // compute indirect-changes accurately. `text` keeps the
      // human-readable per-file summary in CI logs.
      reporter: ["text", "lcov", "json"],
      // Scripts under `.github/templates/scripts/` are shipped to every
      // klodr/* consumer repo as a copy-verbatim source-of-truth. They
      // live here, so they are tested here.
      include: [".github/templates/scripts/**/*.mjs"],
      exclude: [".github/templates/scripts/**/*.test.mjs"],
    },
  },
});
