# klodr/.github

Meta-repo for the `klodr/*` projects. Hosts:

- **Profile README** rendered on `https://github.com/klodr` (`profile/README.md`).
- **Default community health files** (`CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `SUPPORT.md`, `FUNDING.yml`, `ISSUE_TEMPLATE/`) — auto-propagated by GitHub to any `klodr/*` repo without its own version.
- **Reusable workflows** under `.github/workflows/reusable-*.yml`.
- **Composite actions** under `.github/actions/*/action.yml`.

Reusable workflows + composite actions are consumed by the 5 klodr/* repos via `uses: klodr/.github/.github/{workflows,actions}/<name>@<sha>`. Pin to a commit SHA, not `@main`, for reproducible builds.

## Caveats

- Repo must stay public — GitHub requires a public `.github` repo for community health file propagation.
- A repo's own file always wins over the default here. To onboard an existing repo, delete the local file.
- `dependabot.yml`, `codecov.yml`, `.editorconfig`, `CODEOWNERS`, PR template are **not** in GitHub's auto-propagated set — copy per-repo if needed.

## License

MIT — see [LICENSE](./LICENSE).
