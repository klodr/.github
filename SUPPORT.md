# 🆘 Support

Default support guide that GitHub auto-applies to every `klodr/*`
repository that does not carry its own `SUPPORT.md`. Each MCP is
maintained by **@klodr** in spare time. The fastest way to a triage
decision is to open the issue with the right template and to include
the information below.

## 🐛 Bug reports

Open an issue using the **Bug report** template. Include:

- **Package version** of the MCP. For an npm-published MCP, run
  `npm ls -g @klodr/<mcp-name>` (or check the `version` line emitted
  by the server's debug output).
- **MCP client and version** (Claude Desktop / Claude Code / Cursor /
  OpenClaw / your custom client).
- **Failing tool call** — full tool name + arguments — and the resulting
  error (text + `isError: true` body if present).
- **If the MCP exposes an audit log**, attach the relevant JSONL entries
  with secrets scrubbed.

## ✨ Feature requests

Open an issue using the **Feature request** template. State the use case
first, then the proposed tool / option. Proposals are evaluated against
the per-MCP `docs/ROADMAP.md` (or `ROADMAP.md` at the repo root) — items
already scheduled or explicitly out-of-scope are listed there.

## 🔒 Security issues

**Do not open a public issue.** Follow the coordinated-disclosure
procedure in [`SECURITY.md`](SECURITY.md). Acknowledgement target:
**48 hours**. Critical-CVE patch target: **7 days**.

## ❓ Questions

Search the per-repo
[closed issues](https://github.com/klodr) first — most operational
questions (auth setup, scope mismatch, missing artifacts) are already
answered. If nothing matches, open a new issue with the **Bug report**
template and label it `question`.

## ⏱️ Response expectations

| Severity | Target |
|---|---|
| Security issue acknowledgement | 48 h (per `SECURITY.md`) |
| Critical CVE patch released | 7 days |
| Bug blocking normal usage | 48 h |
| Other issue / PR | 7 days |

Best-effort SLOs from a solo maintainer doing open-source on the side.
Sponsoring (see [`FUNDING.yml`](FUNDING.yml)) helps keep the lights on.
