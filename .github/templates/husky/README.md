# Husky template — klodr/* shared hooks

Source of truth for the husky hooks shipped across all klodr/* repos.

## Files

- `pre-push` — full-tree pre-push gate (signature, subject length,
  format/lint/typecheck/test if those scripts exist, pinact if
  installed, npm audit). Self-adapting: each step is gated on the
  matching `package.json` script existing, so a JS-only repo without
  `format:check` or `typecheck` skips them silently.

## Adoption

Each repo copies the file verbatim into its own `.husky/`. There is
**no automatic propagation** — drift is detected by a periodic
cross-repo diff sweep:

```sh
# Quick drift check (run from anywhere with all 5 repos cloned)
for r in eslint-plugin-security-mcp gmail-mcp faxdrop-mcp \
         mercury-invoicing-mcp relayfi-mcp; do
  diff -u .github/templates/husky/pre-push \
        ~/git/$r/.husky/pre-push >/dev/null \
    && echo "$r OK" \
    || echo "$r DRIFTED"
done
```

When the template changes, update each consumer manually (one PR per
repo), so each push runs through that repo's CI before the new hook
becomes the active gate.

## Why template, not composite action

A composite action would mean each consumer's `.husky/pre-push` is a
1-line invocation that pulls remote shell — opaque, harder to debug
locally, and depends on the network being up at every push. A template
keeps the actual shell visible per repo and the cost of "drift" is
small (5 repos, single file).
