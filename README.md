# klodr/.github

Meta-repository for the `klodr/*` projects on GitHub. Hosts:

- **Profile README** — visible on https://github.com/klodr (`profile/README.md`).
- **Default community health files** — `CONTRIBUTING.md`, `SECURITY.md`,
  `CODE_OF_CONDUCT.md`, `SUPPORT.md`, `FUNDING.yml`, `ISSUE_TEMPLATE/`.
  GitHub auto-applies these to every `klodr/*` repository that does not
  carry its own version of the same file.
  See [the GitHub docs](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file)
  for the propagation rules.
- **Reusable workflows** *(planned)* — under `.github/workflows/reusable-*.yml`,
  consumed by each MCP's CI via `uses: klodr/.github/.github/workflows/reusable-<name>.yml@<sha>`.
  Goal: single source of truth for CI / release / security pipelines so
  a workflow change is one PR here rather than four parallel PRs.

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
