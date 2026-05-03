# Security Policy

This is the **default security policy** that GitHub auto-applies to every
`klodr/*` repository that does not carry its own `SECURITY.md`. A repo's
own policy always wins (the production MCPs publish more specific
threat-model and verification details).

## Reporting a vulnerability

Open a **private security advisory** on the affected repository:

- https://github.com/klodr/gmail-mcp/security/advisories/new
- https://github.com/klodr/mercury-invoicing-mcp/security/advisories/new
- https://github.com/klodr/faxdrop-mcp/security/advisories/new
- For other repos: `https://github.com/klodr/<repo>/security/advisories/new`

**Do not open a public issue** for security findings. Public disclosure
before a fix is shipped puts every user of the affected MCP at risk.

## Response targets

- **Acknowledgment within 48 hours** of advisory submission.
- **Fix or mitigation plan within 7 days** for High / Critical severity.
- For Medium / Low severity, batched into the next regular release.

## Common security model (klodr/* MCPs)

Every published MCP carries the same hardening floor:

- Recipient-pairing allowlist gate on every outbound write surface.
- Per-tool OAuth / API scope filter at registration time.
- Daily + monthly rate limits on send / delete / modify buckets.
- CRLF / control-char sanitization on every header value.
- `O_NOFOLLOW` jail on every disk write.
- `0o600` mode on every credential file at rest.
- CodeQL Advanced + Snyk + Socket.dev + OSV-Scanner + gitleaks scanning
  on every commit.
- CodeRabbit + Qodo Merge × 2 (DeepSeek R1 + Gemini 3.1 Pro) reviewing
  every PR.

See the per-repo `SECURITY.md` for the threat model specific to each MCP
and the exact verify-release commands (npm provenance, `gh attestation
verify`, `cosign verify-blob-attestation`).

## Verifying releases

Every klodr/* release is keyless-signed via Sigstore (GitHub OIDC →
Fulcio → Rekor) and ships SPDX + CycloneDX SBOMs. The per-repo
`SECURITY.md` carries the exact `npm view`, `gh attestation verify`,
and `cosign` commands. A failure on any of those means the artifact
you have is not the one that came out of the release workflow at the
tag you asked for.

## Supply-chain posture

- Every release artifact is Sigstore-signed (keyless, GitHub OIDC).
- Every release ships an SLSA in-toto attestation (`*.intoto.jsonl`).
- Every npm publish carries provenance (`npm view ... .dist.attestations`).
- Every published version ships SPDX 2.3 and CycloneDX 1.6 SBOMs of
  the runtime dependency tree, both signed with Sigstore.
- All GitHub Actions in `.github/workflows/` are pinned by full commit
  SHA (no floating tags).
- Branch protection rules require signed commits on `main` and a passing
  CodeRabbit + Qodo + Snyk + Socket + CodeQL + Build & Test matrix.
