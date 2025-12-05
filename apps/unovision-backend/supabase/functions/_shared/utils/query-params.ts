export interface ParsedQueryParams<T = Record<string, unknown>> {
  get<K extends keyof T>(key: K, defaultValue?: T[K]): T[K];
  getString(key: string, defaultValue?: string): string;
  getNumber(key: string, defaultValue?: number): number;
  getBoolean(key: string, defaultValue?: boolean): boolean;
  getAll(): Record<string, string>;
}

export function parseQueryParams(req: Request): ParsedQueryParams {
  const url = new URL(req.url);
  const searchParams = url.searchParams;

  return {
    get(key, defaultValue) {
      const value = searchParams.get(String(key));
      return value !== null ? (value as any) : defaultValue;
    },

    getString(key, defaultValue = '') {
      return searchParams.get(key) || defaultValue;
    },

    getNumber(key, defaultValue = 0) {
      const value = searchParams.get(key);
      const parsed = value ? Number(value) : NaN;
      return !isNaN(parsed) ? parsed : defaultValue;
    },

    getBoolean(key, defaultValue = false) {
      const value = searchParams.get(key);
      if (value === null) return defaultValue;
      return value === 'true' || value === '1';
    },

    getAll() {
      const params: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      return params;
    },
  };
}
