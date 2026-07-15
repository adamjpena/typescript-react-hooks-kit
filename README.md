# TypeScript React Hooks Kit

[![npm version](https://img.shields.io/npm/v/typescript-react-hooks-kit.svg)](https://www.npmjs.com/package/typescript-react-hooks-kit)
[![CI](https://github.com/adamjpena/typescript-react-hooks-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/adamjpena/typescript-react-hooks-kit/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/typescript-react-hooks-kit.svg)](LICENSE)

A small, typed collection of React hooks for everyday application work.

## Install

```bash
npm install typescript-react-hooks-kit
```

React is a peer dependency. The package supports React 18 and React 19, and it
is tested against React 19.

TypeScript React projects normally already include React type packages. If your
project does not, install them too:

```bash
npm install -D @types/react @types/react-dom
```

## Imports

Use named imports when you want several hooks from one entry point:

```tsx
import { useDebounce, useLocalStorage } from 'typescript-react-hooks-kit';
```

Use subpath imports when you want one hook directly:

```tsx
import useDebounce from 'typescript-react-hooks-kit/useDebounce';
```

Both import styles include TypeScript declarations and work in standard ESM, CommonJS, Vite, Next.js, Jest/Vitest, and TypeScript projects without extra package setup.

## Included Hooks

| Hook                | What it does                                                                  |
| ------------------- | ----------------------------------------------------------------------------- |
| `useAsync`          | Runs an async function and returns loading, error, and value state.           |
| `useDebounce`       | Delays value updates until changes settle for a given delay.                  |
| `useFetch`          | Fetches JSON data with loading, error, and abort cleanup.                     |
| `useForm`           | Manages simple form values, input changes, reset, and direct field updates.   |
| `useInterval`       | Runs the latest callback on an interval that can be paused with `null`.       |
| `useLocalStorage`   | Stores React state in `localStorage` with safe parsing and fallback behavior. |
| `useMediaQuery`     | Tracks whether a media query currently matches.                               |
| `useOnClickOutside` | Calls a handler when mouse or touch events happen outside an element.         |
| `usePrevious`       | Returns the value from the previous render.                                   |
| `useThrottle`       | Limits how often a changing value is committed.                               |
| `useToggle`         | Provides boolean state, a toggle function, and the state setter.              |
| `useWindowSize`     | Tracks the current browser window width and height.                           |

## Examples

### Debounce input

```tsx
import { useState } from 'react';
import { useDebounce } from 'typescript-react-hooks-kit';

function SearchBox() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  return (
    <label>
      Search
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <span>Searching for: {debouncedQuery}</span>
    </label>
  );
}
```

### Persist state in localStorage

```tsx
import { useLocalStorage } from 'typescript-react-hooks-kit';

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light');

  return (
    <button
      type="button"
      onClick={() =>
        setTheme((current) => (current === 'light' ? 'dark' : 'light'))
      }
    >
      {theme}
    </button>
  );
}
```

### Fetch JSON

```tsx
import { useFetch } from 'typescript-react-hooks-kit';

interface User {
  id: number;
  name: string;
}

function UserName({ userId }: { userId: number }) {
  const { data, loading, error } = useFetch<User>(`/api/users/${userId}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return <p>{data?.name}</p>;
}
```

### Simple form state

```tsx
import { useForm } from 'typescript-react-hooks-kit';

function ContactForm() {
  const { values, handleChange, resetForm } = useForm({
    name: '',
    email: '',
    subscribed: false,
  });

  return (
    <form>
      <input name="name" value={values.name} onChange={handleChange} />
      <input name="email" value={values.email} onChange={handleChange} />
      <label>
        <input
          checked={values.subscribed}
          name="subscribed"
          onChange={handleChange}
          type="checkbox"
        />
        Subscribe
      </label>
      <button type="button" onClick={resetForm}>
        Reset
      </button>
    </form>
  );
}
```

## Runtime Notes

- Browser-specific hooks guard access to `window`, `document`, and `localStorage` so they can render safely in SSR environments.
- `useFetch` aborts pending requests when the component unmounts or the request changes.
- React and React DOM are peer dependencies, so this package will not install a second React copy into your app.
- The package publishes dual ESM and CommonJS builds with TypeScript declarations for the root entry and every hook subpath.

## Development

```bash
npm ci
npm run lint
npm run typecheck
npm run test
npm run build
npm run pack:check
```

`npm run release:dry-run` runs the full local release gate and performs an npm publish dry run.

## License

MIT
