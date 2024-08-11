# TypeScript React Hooks Kit

A collection of highly reusable and well-documented custom React hooks written in TypeScript.

## About the Project

**TypeScript React Hooks Kit** is developed and maintained by [Adam Peña](https://adamjpena.com), under the auspices of [Cindersoft, LLC](https://cindersoft.com). This project is part of a broader effort to provide high-quality open-source tools and libraries for the React and TypeScript communities.

## Installation

```bash
npm install typescript-react-hooks-kit
```

## Usage

You can import hooks either individually or as named exports from the package.

### Example of importing individually:

```typescript
import useDebounce from 'typescript-react-hooks-kit/useDebounce';
```

### Example of importing as named exports:

```typescript
import { useDebounce } from 'typescript-react-hooks-kit';
```

## Hooks

### `useDebounce`

**Description:** Delays updating a value until a specified time has passed without changes.

**Usage:**

```typescript
import useDebounce from 'typescript-react-hooks-kit/useDebounce';

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
import useThrottle from 'typescript-react-hooks-kit/useThrottle';

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
import useAsync from 'typescript-react-hooks-kit/useAsync';

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
import useFetch from 'typescript-react-hooks-kit/useFetch';

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
import useInterval from 'typescript-react-hooks-kit/useInterval';

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
import useLocalStorage from 'typescript-react-hooks-kit/useLocalStorage';

const MyComponent = () => {
  const [name, setName] = useLocalStorage('name', 'John Doe');

  return <input value={name} onChange={(e) => setName(e.target.value)} />;
};
```

### `useToggle`

**Description:** Provides simple toggle logic for boolean states.

**Usage:**

```typescript
import useToggle from 'typescript-react-hooks-kit/useToggle';

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
import usePrevious from 'typescript-react-hooks-kit/usePrevious';

const MyComponent = ({ value }) => {
  const prevValue = usePrevious(value);

  return <div>Current: {value}, Previous: {prevValue}</div>;
};
```

### `useOnClickOutside`

**Description:** Detects clicks outside a specified element and triggers a handler.

**Usage:**

```typescript
import useOnClickOutside from 'typescript-react-hooks-kit/useOnClickOutside';

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
import useWindowSize from 'typescript-react-hooks-kit/useWindowSize';

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

### `useMediaQuery`

**Description:** Detects whether the viewport matches a given media query.

**Usage:**

```typescript
import useMediaQuery from 'typescript-react-hooks-kit/useMediaQuery';

const MyComponent = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  return <div>{isLargeScreen ? 'Large Screen' : 'Small Screen'}</div>;
};
```

### `useForm`

**Description:** Manages form state, including handling input changes and form submission.

**Usage:**

```typescript
import useForm from 'typescript-react-hooks-kit/useForm';

const MyComponent = () => {
  const { values, handleChange, resetForm } = useForm({ name: '', email: '' });

  return (
    <form>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <button type="button" onClick={resetForm}>
        Reset
      </button>
    </form>
  );
};
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your improvements.

## License

[MIT](LICENSE)
