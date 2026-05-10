# 🤝 Contributing

Default contributing guide that GitHub auto-applies to every `klodr/*`
repository that does not carry its own `CONTRIBUTING.md`. PRs welcome.
Please open an issue first for substantial changes (new tool, breaking
behavior change, or anything touching the auth / credentials flow).

## ✅ Before submitting a PR

1️⃣ `npm install` then `npm test` (all tests must stay green)

2️⃣ `npm run build` (must succeed — the published tarball is a
single-file `dist/index.js` produced by `tsup`)

3️⃣ `npm run lint` (must be clean)

4️⃣ `npm run format:check` (or run `npm run format` to reformat)

5️⃣ Update `CHANGELOG.md` under `[Unreleased]`

6️⃣ If you add or rename a tool, update the 🛠️ `Tools` section in the
README and the corresponding entry in `src/tools.ts` — including the
correct `scopes` and the `readOnlyHint` / `destructiveHint` /
`idempotentHint` annotations.

7️⃣ Any new file-path / network-target / outbound-recipient input must
be routed through the per-MCP allowlist / jail helpers (see
`src/utl.ts`, `src/safe-url.ts`, or the `requirePairedRecipients`
gate where applicable). No raw `fs.writeFileSync(userPath, …)` or
unguarded `fetch(userUrl)` against attacker-controlled values.

## ✍️ Developer Certificate of Origin

Every commit must carry a `Signed-off-by:` trailer to certify
compliance with [DCO 1.1](https://developercertificate.org/). The
trailer is added automatically by `git commit -s` or a
`prepare-commit-msg` hook.

## 🐰 CodeRabbit + Qodo Merge review policy

Every PR runs **three parallel AI reviewers**:

- **CodeRabbit** (the gate) — drives `reviewDecision`. Must pass
  CodeRabbit's assertive review and obtain a formal `APPROVED` review
  state before merge (see `.coderabbit.yaml`).
- **Qodo Merge — DeepSeek R1** (independent reviewer) — top-level
  comment with focus areas.
- **Qodo Merge — Gemini 3.1 Pro** (independent reviewer) — second
  triangulating model, separate top-level comment.

`@coderabbitai approve` is allowed only via the built-in auto-review
flow; do not click "Commit suggestion" on inline diffs — CodeRabbit-
authored commits deadlock branch protection on a solo-maintainer repo.

## 🚀 Releases (maintainers only)

Each MCP follows the same release pattern, summarised in the per-repo
`CONTRIBUTING.md` (when present) or in the `klodr/.github` README:

1. `npm version <X.Y.Z> --no-git-tag-version` (the `version` script
   syncs `server.json` + `src/server.ts:VERSION` automatically when the
   MCP carries the helper script).
2. Convert `CHANGELOG.md` `[Unreleased]` to `[<X.Y.Z>] - YYYY-MM-DD`.
3. Update the footer link map.
4. Open release PR; squash-merge after CodeRabbit + Qodo approve.
5. `git tag -s v<X.Y.Z> -m "v<X.Y.Z> — <short subject>"` from `main` HEAD.
6. `git push origin v<X.Y.Z>` → the release workflow signs the
   artifact with Sigstore, generates SPDX + CycloneDX SBOMs, and
   creates the GitHub Release. For npm-published MCPs the workflow
   then publishes to npm with provenance.
