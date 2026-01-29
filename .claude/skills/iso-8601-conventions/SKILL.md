---
name: iso-8601-conventions
description: ISO 8601 date and time format conventions. Use when working with dates, times, timestamps, or any temporal data across the application.
version: 1.0.0
model: sonnet
lastUpdated: 2024-01-31
lastReviewed: 2024-01-31
maintenancePriority: LOW
monitorPaths:
  - packages/contracts/src/schemas/**
  - apps/unovision-backend/supabase/migrations/**
monitorDependencies:
  - zod: "^4"
  - date-fns: "^4"
relatedSkills:
  - contracts-package-conventions
  - backend-conventions
  - frontend-conventions
---
This skill defines the ISO 8601 standard conventions used throughout the AEME project for all date and time representations.

# Why ISO 8601?
ISO 8601 is an international standard for representing dates and times. Using this standard ensures:
- Consistency across frontend, backend, and database
- Unambiguous date/time interpretation
- Easy parsing and comparison
- Compatibility with APIs and external systems

# Standard Formats

## Date Format
- **Format:** `YYYY-MM-DD`
- **Example:** `2024-03-15`
- **Validation:** Use `z.iso().date()` in Zod schemas

## Time Formats
- **Short format:** `HH:MM`
- **Long format:** `HH:MM:SS`
- **Examples:** `14:30`, `14:30:45`
- **Validation:** Use `z.iso().time()` in Zod schemas

## DateTime Format
- **Format:** `YYYY-MM-DDTHH:MM:SS` or `YYYY-MM-DDTHH:MM:SS.sssZ`
- **Example:** `2024-03-15T14:30:00`, `2024-03-15T14:30:00.000Z`
- **Note:** The `T` separates date and time, `Z` indicates UTC timezone

# Numeric Representations

## Months
- Months are represented numerically from **1 to 12**
- January = 1, December = 12
- Always use two digits: `01` for January, `12` for December

## Days of Week
- Days are represented numerically from **1 to 7**
- **1 = Monday** (start of week)
- **7 = Sunday** (end of week)
- This follows the ISO 8601 week date system

# Usage in the Project

## Database
- Store all dates as `DATE` type in PostgreSQL
- Store all times as `TIME` type
- Store timestamps as `TIMESTAMP WITH TIME ZONE`
- PostgreSQL natively supports ISO 8601 formats

## Backend (Edge Functions)
- Always parse incoming dates/times as ISO 8601 strings
- Return dates/times in ISO 8601 format from APIs
- Use Zod schemas with `.date()` and `.time()` validators

## Frontend
- Parse ISO 8601 strings when receiving from API
- Format for display using date libraries (date-fns, Intl.DateTimeFormat)
- Send dates/times to API in ISO 8601 format
- Use Zod schemas with `.date()` and `.time()` validators in forms

# Examples

## Storing a Date
```typescript
// Backend - Creating a record
const attendanceRecord = {
  date: '2024-03-15',  // ISO 8601 date
  checkIn: '09:00:00', // ISO 8601 time
  checkOut: '17:30:00'
};
```

## Validating with Zod
```typescript
// In schemas
const attendanceSchema = z.object({
  date: z.iso().date(), // Validates YYYY-MM-DD
  checkIn: z.iso().time(), // Validates HH:MM:SS
  checkOut: z.iso().time({ precision: -1 }) // Validates HH:MM
});
```

## Frontend Display
```typescript
// Receiving from API
const attendance = {
  date: '2024-03-15',
  checkIn: '09:00:00'
};

// Format for user display (Spanish locale)
const displayDate = new Date(attendance.date).toLocaleDateString('es-AR');
// Result: "15/3/2024" or formatted as needed
```

# Important Notes
- Never use ambiguous formats like `MM/DD/YYYY` or `DD/MM/YYYY`
- Always store in ISO 8601, format only for display
- When working with timezones, always use `TIMESTAMP WITH TIME ZONE` in database
- JavaScript `Date.toISOString()` returns ISO 8601 format
- For date calculations and formatting, use libraries like date-fns that support ISO 8601

# Related Skills
- contracts-package-conventions (for Zod validation schemas)
- backend-conventions (for database and API patterns)
- frontend-conventions (for date formatting and display)
