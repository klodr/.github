# klodr/.github

Meta-repo for the `klodr/*` projects. Hosts:

- **Profile README** rendered on `https://github.com/klodr` (`profile/README.md`).
- **Default community health files** (`CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `SUPPORT.md`, `FUNDING.yml`, `ISSUE_TEMPLATE/`) — auto-propagated by GitHub to any `klodr/*` repo without its own version.
- **Reusable workflows** under `.github/workflows/reusable-*.yml`.
- **Composite actions** under `.github/actions/*/action.yml`.

Reusable workflows + composite actions are consumed by klodr/* repos via `uses: klodr/.github/.github/{workflows,actions}/<name>@<sha>`. Pin to a commit SHA, not `@main`, for reproducible builds.

## License

MIT — see [LICENSE](./LICENSE).
