---
trigger: always_on
---


# 0. Foundational Principle

> "Process protects architecture from entropy."

If you don't define process, your CMS will degrade over time.

------------------------------------------------------------------------

# I. Product Definition Rules

## 1. Clear Layer Ownership

Every feature must clearly belong to one layer: - SDK - CMS Dashboard -
PocketBase - CLI

No cross-layer ambiguity.

## 2. Feature Contracts Before Code

Each feature must include: - Problem statement - Layer ownership - Data
impact - API impact - Security considerations - Migration impact

## 3. Define Non-Functional Requirements Early

Document: - Expected traffic - Number of projects - Sections per page -
SLA expectations - Data retention policies

------------------------------------------------------------------------

# II. System Design Rules

## 4. Backward Compatibility Mandatory

Never remove or rename fields without versioning.

## 5. Schema Migration Required

Maintain a `/migrations` directory. No manual production schema edits.

## 6. Public API Is a Stable Contract

No breaking changes once SDK depends on it. Deprecate gradually.

------------------------------------------------------------------------

# III. Development Rules

## 7. Git Strategy

-   main → production
-   develop → integration
-   feature/\* → isolated features

## 8. Isolated Feature Development

Each feature must include: - Tests - Migration scripts - Documentation
updates

## 9. Strict Code Ownership

Define ownership for: - SDK - Dashboard - Backend

## 10. Mandatory Code Review Checklist

-   Schema compatibility
-   Error handling
-   Edge cases
-   Security
-   Coupling concerns

------------------------------------------------------------------------

# IV. Testing Rules

## 11. Testing Layers

-   Unit Tests (SDK logic)
-   Integration Tests (PocketBase queries)
-   E2E Tests (CMS → Site)
-   Build-time Tests (SSG)

## 12. SDK Contract Testing

Test: - Missing section types - Invalid schema - Malformed JSON - Draft
vs published logic

## 13. Preview Security Testing

Test: - Missing token - Expired token - Unauthorized access

------------------------------------------------------------------------

# V. Environment Rules

## 14. Minimum 3 Environments

-   dev
-   staging
-   production

## 15. Production Data Is Sacred

-   No manual edits
-   No debug access
-   No test data

## 16. Staging Mirrors Production

Same: - Schema - Version - Deployment method

------------------------------------------------------------------------

# VI. CI/CD Rules

## 17. CI Required on Every PR

-   Lint
-   Tests
-   Build SDK
-   Build Vue SSG

## 18. Automated Deployment Only

Use: - Docker - Version tagging - Deployment scripts

## 19. Version Every Production Release

Use semantic versioning: - v1.0.0 - v1.1.0 - v1.2.0

Maintain CHANGELOG.md

------------------------------------------------------------------------

# VII. Security Rules

## 20. Principle of Least Privilege

Public → Read published only Authenticated → Limited access Admin → Full
access

## 21. Rotatable API Keys

-   Regeneratable
-   Environment-specific
-   Optional expiration

## 22. Rate Limiting Mandatory

Protect: - Public endpoints - Login endpoints

------------------------------------------------------------------------

# VIII. Observability Rules

## 23. Logging Required

Log: - Publish events - Preview failures - Schema mismatches - CLI sync
actions

## 24. Error Classification

-   User errors
-   System errors
-   Security violations
-   Data integrity issues

------------------------------------------------------------------------

# IX. Release Management Rules

## 25. Documentation Required Per Release

Include: - Changes - Migration steps - Breaking changes - Rollback
instructions

## 26. Rollback Strategy Required

Every deployment must have a 5-minute rollback plan.

------------------------------------------------------------------------

# X. Data Governance Rules

## 27. Automated Backups

-   Daily backup
-   Tested restore process

## 28. Publish Audit Trail

Track: - Who published - When - Version number

------------------------------------------------------------------------

# XI. Production Deployment Rules

## 29. Deployment Checklist

Before production: - Migrations applied - CI passing - Version tagged -
Backup created - Monitoring active

## 30. Post-Deployment Validation

Verify: - Homepage loads - Content fetch works - Preview works - Auth
works - Publish works

------------------------------------------------------------------------

# XII. Long-Term Maintenance Rules

## 31. Deprecation Policy

-   Mark deprecated
-   Maintain at least one release
-   Provide migration path

## 32. Technical Debt Log

Maintain `/docs/tech-debt.md`

## 33. Quarterly Architecture Review

Review: - SDK complexity - Schema growth - Coupling issues - CMS scope
drift

------------------------------------------------------------------------

# Final Principle

> Stability \> Speed\
> Clarity \> Cleverness\
> Structure \> Flexibility\
> Process \> Hero Coding

This rulebook ensures your CMS platform remains stable, scalable,
secure, and SaaS-ready.
