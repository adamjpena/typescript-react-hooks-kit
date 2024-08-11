# TypeScript React Hooks Kit

A collection of highly reusable and well-documented custom React hooks written in TypeScript.

## Installation

```bash
npm install typescript-react-hooks-kit
```

## Hooks

### `useDebounce`

**Description:** Delays updating a value until a specified time has passed without changes.

**Usage:**

```typescript
import { useDebounce } from 'typescript-react-hooks-kit';

const MyComponent = () => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
};
```

### `useThrottle`

**Description:** Limits how often a function can be called.

**Usage:**

```typescript
import { useThrottle } from 'typescript-react-hooks-kit';

const MyComponent = () => {
  const [value, setValue] = useState('');
  const throttledValue = useThrottle(value, 1000);

  return <input value={throttledValue} onChange={(e) => setValue(e.target.value)} />;
};
```

### `useAsync`

**Description:** Manages an asynchronous operation, handling loading, error, and result states.

**Usage:**

```typescript
import { useAsync } from 'typescript-react-hooks-kit';

const MyComponent = () => {
  const { loading, error, value } = useAsync(async () => {
    const response = await fetch('https://api.example.com/data');
    return response.json();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Data: {JSON.stringify(value)}</div>;
};
```

### `useFetch`

**Description:** Handles fetching data from an API with loading and error states.

**Usage:**

```typescript
import { useFetch } from 'typescript-react-hooks-kit';

const MyComponent = () => {
  const { data, loading, error } = useFetch('https://api.example.com/data');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Data: {JSON.stringify(data)}</div>;
};
```

### `useInterval`

**Description:** Runs a function at specified intervals, like `setInterval`.

**Usage:**

```typescript
import { useInterval } from 'typescript-react-hooks-kit';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount((prevCount) => prevCount + 1);
  }, 1000);

  return <div>Count: {count}</div>;
};
```

### `useLocalStorage`

**Description:** Simplifies working with `localStorage` in React.

**Usage:**

```typescript
import { useLocalStorage } from 'typescript-react-hooks-kit';

const MyComponent = () => {
  const [name, setName] = useLocalStorage('name', 'John Doe');

  return <input value={name} onChange={(e) => setName(e.target.value)} />;
};
```

### `useToggle`

**Description:** Provides simple toggle logic for boolean states.

**Usage:**

```typescript
import { useToggle } from 'typescript-react-hooks-kit';

const MyComponent = () => {
  const [isOn, toggleIsOn, setIsOn] = useToggle(false);

  return (
    <div>
      <button onClick={toggleIsOn}>Toggle</button>
      <button onClick={() => setIsOn(true)}>Set On</button>
      <div>{isOn ? 'On' : 'Off'}</div>
    </div>
  );
};
```

### `usePrevious`

**Description:** Tracks the previous value of a state or prop.

**Usage:**

```typescript
import { usePrevious } from 'typescript-react-hooks-kit';

const MyComponent = ({ value }) => {
  const prevValue = usePrevious(value);

  return <div>Current: {value}, Previous: {prevValue}</div>;
};
```

### `useOnClickOutside`

**Description:** Detects clicks outside a specified element and triggers a handler.

**Usage:**

```typescript
import { useRef } from 'react';
import { useOnClickOutside } from 'typescript-react-hooks-kit';

const MyComponent = () => {
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    console.log('Clicked outside!');
  });

  return <div ref={ref}>Click outside me!</div>;
};
```

### `useWindowSize`

**Description:** Tracks the dimensions of the browser window, which is useful for responsive design.

**Usage:**

```typescript
import { useWindowSize } from 'typescript-react-hooks-kit';

const MyComponent = () => {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window width: {width}px</p>
      <p>Window height: {height}px</p>
    </div>
  );
};
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements.

## License

[MIT](LICENSE)
