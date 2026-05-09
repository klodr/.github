# Security Policy

Security policy for this repository.

## Reporting a vulnerability

Open a [private security advisory](/security/advisories/new) on this
repository.

**Do not open a public issue** for a security finding.

## Response

- Acknowledgment within 48 hours.
- Fix or mitigation plan within 7 days for High / Critical severity.
- Medium / Low: bundled into the next regular release.

## Security baseline

This repository ships with a serious security baseline:

- Releases keyless-signed via Sigstore.
- SBOM and provenance attached to every published artifact.
- Automated scans on every commit (CodeQL, OSV, gitleaks, lockfile-lint).
- GitHub Actions pinned by commit SHA.
- Branch protection on `main` with signed commits and required reviews.
