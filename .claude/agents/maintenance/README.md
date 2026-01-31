# Maintenance Agent

An automated agent for detecting and maintaining skills documentation in the AEME project.

## What It Does

The maintenance agent:
- **Detects** when code changes might affect skills
- **Analyzes** the impact of changes on documentation
- **Recommends** specific updates to keep skills accurate
- **Generates** reports for PRs, commits, or periodic reviews

## How It Works

### 1. Detection
Monitors changes in:
- Source code files (`apps/`, `packages/`)
- Configuration files (`package.json`, `tsconfig.json`, etc.)
- Dependencies (version bumps in package.json)

### 2. Matching
Compares changed files against:
- `monitorPaths` in each skill's metadata
- `monitorDependencies` for package updates

### 3. Analysis
Determines impact level:
- **🔴 CRITICAL**: HIGH priority skills, breaking changes
- **🟡 IMPORTANT**: MEDIUM priority skills, new features
- **🟢 INFORMATIONAL**: LOW priority skills, minor changes

### 4. Reporting
Generates detailed reports with:
- List of affected skills
- Specific files/changes that triggered
- Recommendations for updates
- Sample version bumps and CHANGELOG entries

## Usage

### From CLI (Manual)

```bash
# Check current changes
pnpm run skills:check

# Or invoke the agent directly (if integrated with Claude CLI)
/maintenance analyze-changes
```

### From GitHub Actions (Automatic)

The agent runs automatically on PRs via `.github/workflows/skills-maintenance-check.yml`.

Comments on PRs with detected issues:

```markdown
## 🤖 Skills Maintenance Check

### ⚠️ Critical - Requires Update
- **frontend-conventions** (v1.2.0)
  - Reason: React updated to 19.1
  - Action: Review and update dependency version
```

### Scheduled Reviews (Monthly)

Can be configured to run monthly audits of all skills.

## Configuration

Edit `config.yml` to customize:

```yaml
triggers:
  manual: true          # Allow manual invocation
  scheduled: true       # Enable scheduled runs
  pr_comment: true      # Enable PR comments

config:
  max_concurrent_analyses: 5
  auto_comment_on_pr: true
  notify_on_critical: true
```

## Integration Points

### With GitHub Actions
- Receives PR context
- Posts comments on PRs
- Sets check status

### With Claude CLI
- Can be invoked via `/maintenance`
- Interactive recommendations
- Direct skill updates (with approval)

### With Local Scripts
- Called by `pnpm run skills:check`
- Terminal output with colors
- Exit codes for CI/CD

## Commands

The agent understands these commands:

```
# Analyze a specific PR
Analyze PR #123 for skills maintenance

# Check specific changes
Analyze changes in apps/unovision-frontend/src

# Review a skill
Review frontend-conventions skill for accuracy

# Full audit
Audit all HIGH priority skills

# Monthly review
Perform monthly skills review
```

## Report Formats

### PR Comment (Short)
```markdown
## 🤖 Skills Maintenance Check

### ⚠️ Critical (2)
- frontend-conventions
- backend-conventions

### 📝 Important (1)
- ui-package-conventions
```

### Detailed Report
Full analysis with:
- Executive summary
- Affected skills grouped by priority
- Specific recommendations
- Sample updates

### Audit Report
Monthly review with:
- Skills status summary
- Overdue reviews
- Prioritized action items

## Files

```
.claude/agents/maintenance/
├── README.md           # This file
├── config.yml          # Agent configuration
├── AGENT.md            # Agent prompt and behavior
└── reports/            # Generated reports (gitignored)
```

## Workflow

### On PR Creation

1. GitHub Action triggers
2. Runs `.github/scripts/check-skills.js`
3. Script invokes maintenance
4. Agent analyzes changes
5. Agent generates report
6. GitHub Action posts comment

### On Manual Invocation

1. Developer runs `pnpm run skills:check`
2. Script gets local changes
3. Agent analyzes changes
4. Agent outputs terminal report
5. Developer reviews and updates skills

### On Scheduled Run (Monthly)

1. GitHub Action triggers on schedule
2. Agent audits all skills
3. Agent checks `lastReviewed` dates
4. Agent generates audit report
5. Creates GitHub issue with findings

## Success Metrics

The agent is successful when:
- **Detection Rate**: 95%+ of relevant changes detected
- **False Positive Rate**: <20% of alerts are unnecessary
- **Response Time**: Alerts within 5 minutes of PR
- **Accuracy**: Recommendations are specific and correct

## Limitations

The agent **cannot**:
- Automatically update skills (requires approval)
- Understand context without code access
- Detect semantic changes without analyzing diffs
- Resolve ambiguous situations

The agent **should not**:
- Modify skills without explicit approval
- Skip checking related skills
- Make assumptions about breaking changes

## Best Practices

### For Developers

1. **Run locally first**: Use `pnpm run skills:check` before pushing
2. **Review recommendations**: Don't blindly accept
3. **Update thoughtfully**: Consider impact on users
4. **Document triggers**: Always note what caused the update in CHANGELOG

### For Maintainers

1. **Monitor false positives**: Adjust `monitorPaths` if too noisy
2. **Review reports**: Check if recommendations are helpful
3. **Update agent**: Improve detection logic based on misses
4. **Calibrate priorities**: Adjust if certain skills get too many/few alerts

## Troubleshooting

### Agent not detecting changes

Check:
- Are `monitorPaths` correct in skill metadata?
- Are paths using correct glob patterns?
- Is the workflow triggering (check Actions tab)?

### Too many false positives

Solution:
- Narrow `monitorPaths` to be more specific
- Exclude noisy directories
- Adjust priority levels

### Missing critical updates

Solution:
- Expand `monitorPaths` to cover more files
- Add missing skills to the system
- Review related skills configuration

## Future Enhancements

Potential improvements:
- Semantic analysis of code changes
- Auto-generate update suggestions
- Integration with LLM for draft updates
- Trend analysis (which skills change most)
- Predictive maintenance (detect drift before it's critical)

## Related Documentation

- [skills-maintenance skill](../../skills/skills-maintenance/SKILL.md)
- [Skills README](../../skills/README.md)
- [CHANGELOG](../../skills/CHANGELOG.md)

## Support

For issues or questions:
1. Check [skills-maintenance skill](../../skills/skills-maintenance/SKILL.md)
2. Review this README
3. Check [GitHub Actions logs](.github/workflows/)
4. Create an issue in the repository
