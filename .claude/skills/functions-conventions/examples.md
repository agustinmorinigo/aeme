```typescript
// Good: Early return pattern
function getUserName(user: User | null): string {
  if (!user) return 'Anonymous';
  if (!user.name) return 'Unknown';
  return user.name;
}

// Bad: Nested conditions
function getUserName(user: User | null): string {
  if (user) {
    if (user.name) {
      return user.name;
    } else {
      return 'Unknown';
    }
  } else {
    return 'Anonymous';
  }
}
```

```typescript
// Good: Options object
interface CreateUserOptions {
  name: string;
  email: string;
  role: string;
  department?: string;
}

function createUser(options: CreateUserOptions): User {
  const { name, email, role, department } = options;
  // ...
}

// Bad: Too many parameters
function createUser(
  name: string,
  email: string,
  role: string,
  department?: string,
  isActive?: boolean,
  createdBy?: string
): User {
  // ...
}
```

```typescript
/**
 * Formats a date according to the specified format string.
 *
 * @param date - The date to format
 * @param format - The format string (e.g., 'YYYY-MM-DD')
 * @returns The formatted date string
 * @throws {Error} If the date is invalid
 *
 * @example
 * formatDate(new Date('2024-01-15'), 'YYYY-MM-DD')
 * // Returns: '2024-01-15'
 * @example
 * formatDate(new Date('invalid'), 'YYYY-MM-DD')
 * // Throws: Error
 */
function formatDate(date: Date, format: string): string {
  // ...
}
```

```typescript
async function fetchUserData(userId: string): Promise<User> {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Re-throw for caller to handle
  }
}
```