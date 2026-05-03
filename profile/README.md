# klodr

Solo-built **Model Context Protocol (MCP) servers** with a strong supply-chain
posture: every release is Sigstore-signed via GitHub OIDC, ships an SLSA in-toto
attestation, npm provenance, and SPDX + CycloneDX SBOMs.

## MCPs

| Repository | Purpose | npm |
|---|---|---|
| [gmail-mcp](https://github.com/klodr/gmail-mcp) | Gmail read/send/draft/label/filter/thread automation | [`@klodr/gmail-mcp`](https://www.npmjs.com/package/@klodr/gmail-mcp) |
| [mercury-invoicing-mcp](https://github.com/klodr/mercury-invoicing-mcp) | Mercury Bank treasury, invoicing, customers, money movement | [`@klodr/mercury-invoicing-mcp`](https://www.npmjs.com/package/@klodr/mercury-invoicing-mcp) |
| [faxdrop-mcp](https://github.com/klodr/faxdrop-mcp) | Send faxes via FaxDrop with paired-recipient SSRF defense | [`@klodr/faxdrop-mcp`](https://www.npmjs.com/package/@klodr/faxdrop-mcp) |

## Hardening baseline (every MCP)

- **Recipient-pairing allowlist gate** on every outbound write surface that
  reaches a third-party recipient (email, fax, money transfer).
- **Per-tool OAuth / API scope filter** at registration time — the tool list
  the LLM sees is intersected with the credentials actually granted.
- **Daily + monthly rate limits** on send / delete / modify buckets to cap
  the blast radius of a prompt-injected agent.
- **CRLF / control-char sanitization** on every header value before it is
  serialized into an outbound message.
- **`O_NOFOLLOW` jail** on every disk write (downloads, attachments) so a
  pre-existing symlink cannot escape the configured directory.
- **CodeQL Advanced + Snyk + Socket.dev + OSV-Scanner + gitleaks** on every
  commit, plus **CodeRabbit + Qodo Merge × 2 (DeepSeek R1 + Gemini 3.1 Pro)**
  on every PR for triangulated AI review.

## Verifying releases

Every release is keyless-signed via Sigstore (GitHub OIDC → Fulcio → Rekor).
Three independent verification paths per package — see each repo's
`SECURITY.md` for the exact commands (npm provenance, `gh attestation verify`,
`cosign verify-blob-attestation`).

## Reporting security issues

Use the per-repo private security advisory:
- https://github.com/klodr/gmail-mcp/security/advisories/new
- https://github.com/klodr/mercury-invoicing-mcp/security/advisories/new
- https://github.com/klodr/faxdrop-mcp/security/advisories/new

Acknowledgment within 48 hours; fix or mitigation plan within 7 days for
High / Critical severity.

## Defaults

This `.github` repository hosts the **default community health files** for
every `klodr/*` project. See [README](https://github.com/klodr/.github) for
the propagation rules and the planned reusable-workflow consolidation.
