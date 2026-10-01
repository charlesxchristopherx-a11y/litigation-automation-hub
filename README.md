# PLA Litigation Automation Hub

Versioned, provider-independent operating specification for Prisoner Legal Aid litigation, lead, deadline, and mailing tracking.

## Current architecture

- **Authoritative data:** one private Google Sheet identified at runtime by `PLA_MASTER_TRACKER_ID`.
- **Weekday operations:** ChatGPT automation, Monday–Friday at 8:00 a.m. America/New_York.
- **Weekly status:** ChatGPT automation, Sunday at 6:00 p.m. America/New_York.
- **Lead intake:** event-driven ChatGPT automation for approved Gmail sources.
- **Dashboard:** the native `DASHBOARD` tab in the authoritative Sheet.
- **Audit trail:** append-only Sheet logs plus automation run emails.
- **Legacy provider:** Zo is not an operational source, notification recipient, scheduler, or dashboard dependency.

## Security boundary

This repository is public. Never commit:

- client or lead information;
- court-work-product containing private facts;
- Google Sheet or Drive IDs;
- Gmail message content or IDs;
- passwords, API keys, tokens, cookies, private keys, or service-account JSON.

Runtime identifiers and credentials belong in private platform configuration. Commit only variable names, schemas, source code, and sanitized examples.

## Validation

```bash
node src/validate-config.mjs config/tracking.example.json
```

The validation workflow rejects configuration that omits required tabs or contains a Zo hostname.

## Recovery objective

A replacement operator must be able to restore the tracking workflow from:

1. this repository;
2. the private master Sheet;
3. the preserved private Drive migration bundle;
4. the configured ChatGPT automations; and
5. platform-managed credentials.

See [docs/CUTOVER.md](docs/CUTOVER.md).
