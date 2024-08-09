# TypeScript React Hooks Kit

A collection of highly reusable and well-documented custom React hooks written in TypeScript.

## Installation

```bash
npm install typescript-react-hooks-kit
```

## Usage

Here's a quick example:

```jsx
import { useDebounce } from 'typescript-react-hooks-kit';

const MyComponent = () => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);

  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
};
```
