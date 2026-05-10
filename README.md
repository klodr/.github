# klodr/.github

Meta-repository for the `klodr/*` projects on GitHub. Hosts:

- **Profile README** — visible on https://github.com/klodr (`profile/README.md`).
- **Default community health files** — `CONTRIBUTING.md`, `SECURITY.md`,
  `CODE_OF_CONDUCT.md`, `SUPPORT.md`, `FUNDING.yml`, `ISSUE_TEMPLATE/`.
  GitHub auto-applies these to every `klodr/*` repository that does not
  carry its own version of the same file.
  See [the GitHub docs](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)
  for the propagation rules.
- **Reusable workflows** — under `.github/workflows/reusable-*.yml`,
  consumed by each MCP's CI via `uses: klodr/.github/.github/workflows/reusable-<name>.yml@<sha>`.
  Goal: single source of truth for CI / release / security pipelines so
  a workflow change is one PR here rather than four parallel PRs.

  Available reusable workflows:
  - `reusable-node-ci.yml` — lint + typecheck + test for Node/TS repos
    (npm/pnpm/yarn, configurable steps, working-directory)
  - `reusable-gitleaks.yml` — gitleaks secret scanning
    (optional `GITLEAKS_LICENSE` secret for Pro features)

  Pin to a commit SHA, not `@main`, for reproducible builds.

- **Composite actions** — under `.github/actions/<name>/action.yml`,
  consumed by each MCP's CI via
  `uses: klodr/.github/.github/actions/<name>@<sha>`. Used when the
  caller needs to keep its own job names (e.g. status-check names that
  branch protection rules pin) but still wants to factor out repeated
  steps. Composite-action steps run inline in the caller job, so the
  caller — not the composite — owns the job display name.

  Available composite actions:
  - `setup-node-mcp` — checkout + `actions/setup-node` (cache enabled)
    + install dependencies via npm/pnpm/yarn. Inputs: `node-version`
    (default `"22"`), `package-manager` (default `npm`).
  - `lint-format` — `<pm> run lint` + (optional) `<pm> run format:check`.
    Inputs: `package-manager` (default `npm`), `run-format-check`
    (default `"true"`).
  - `codecov-upload` — pre-trust the Codecov GPG signing key, then
    upload coverage via `codecov-action` with OIDC. Inputs: `slug`
    (default `${{ github.repository }}`), `files` (default
    `./coverage/lcov.info,./coverage/coverage-final.json`),
    `fail-on-error` (default `"true"`), `disable-search` (default
    `"true"`). Caller must grant `id-token: write` on the consuming
    job for OIDC.
  - `codecov-test-analytics` — upload a JUnit XML report to Codecov
    Test Analytics via OIDC. Inputs: `slug`
    (default `${{ github.repository }}`), `files` (default
    `./test-results.junit.xml`), `fail-on-error` (default `"true"`),
    `disable-search` (default `"true"`). Caller is expected to wrap
    this in `if: always() && !cancelled()` so failed test runs still
    upload their report.

  Pin to a commit SHA, not `@main`, for reproducible builds.

## Why this exists

The four MCP repos (`gmail-mcp`, `mercury-invoicing-mcp`, `faxdrop-mcp`,
`relayfi-mcp`) share the same hardening posture: signed releases, codecov,
CodeQL, gitleaks, OSV-Scanner, dependency-review, lockfile-lint,
editorconfig-check, dual Qodo Merge reviewers, etc. Without this repo
each pipeline change had to be cherry-picked across four sibling repos.
With this repo, the per-MCP `.github/workflows/*.yml` files become thin
wrappers calling the reusable workflows here.

## Caveats

- This repo **must stay public**. Per GitHub:
  *"Private `.github` repositories are not supported"* for default
  community health file propagation.
- A repo's **own** file always wins over the default in this repo.
  To onboard an existing repo to the default, delete the local file.
- `dependabot.yml`, `codecov.yml`, `.editorconfig`, `CODEOWNERS`, and the
  PR template are **not** in GitHub's auto-propagated set — they have
  to be copied per-repo (or factored into a bootstrap script).

## License

MIT — see [LICENSE](./LICENSE).
