# Zo Cutover and Recovery Procedure

## Completion standard

Zo is disconnected from tracking only when all of the following are true:

1. The private PLA master Sheet is the sole authoritative tracker.
2. No current Sheet hyperlink or rule depends on a Zo hostname.
3. Weekday litigation operations, weekly case reporting, and lead capture are enabled under ChatGPT ownership.
4. New lead events write only to the unified master Sheet.
5. Every Sheet write is read back and recorded in the append-only sync log.
6. A non-destructive weekday continuity run succeeds.
7. A weekly report can be generated from the Sheet and preserved migration sources without Zo.
8. The legacy dashboard has a native-Sheet replacement.
9. The monthly backup has independent execution and inspectable evidence.
10. The Zo export is preserved for audit and disaster recovery.

## Safe sequence

1. Keep legacy jobs paused; do not delete them.
2. Export all legacy source, schemas, templates, and schedule definitions without secrets.
3. Store the export in the private Drive handoff folder with a manifest and checksum.
4. Verify the required Sheet tabs and replace legacy links.
5. Verify each ChatGPT automation points to the unified master Sheet.
6. Run the repository validation workflow.
7. Execute one non-destructive weekday continuity run and verify the run email, Sheet read-back, and sync-log entry.
8. Verify the next event-driven lead intake writes to the unified Sheet and deduplicates by Gmail message ID.
9. Verify the weekly report independently.
10. Confirm the backup workflow with a successful artifact in Drive.
11. Mark legacy jobs safe to retire. Preserve exports and audit evidence.

## Rollback

If a replacement check fails:

- leave the Zo jobs paused;
- do not write to retired Sheets;
- preserve every current row and audit record;
- record the exact failure in `EXCEPTIONS` and `SYNC LOG`;
- repair and repeat only the failed verification step.

Never restore Zo as the source of truth. A temporary manual check may be used while the independent replacement is repaired.
