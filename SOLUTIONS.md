# Keep Notes React App - Exercise Solutions

This document contains complete solutions to all exercises in EXERCISES.md.

---

## Chapter 1: React Fundamentals & JSX

### 1.1 Understanding JSX - Solution

```jsx
function UserProfile() {
  const name = "John Doe";
  const hobby = "Reading";

  return (
    <div>
      <p>Name: {name}</p>
      <p>Hobby: {hobby}</p>
    </div>
  );
}
```

**Key Concepts:**
- Variables are declared using `const` or `let`
- JSX allows embedding JavaScript expressions using `{}`
- JSX looks like HTML but is actually JavaScript

---

### 1.2 Understanding Virtual DOM - Solution

```jsx
function Counter() {
  console.log('Component rendered'); // This logs every time state changes

  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**Answer to Question:**
React's Virtual DOM is efficient because:
1. When state changes, React creates a new Virtual DOM tree
2. It compares (diffs) the new tree with the old one
3. It calculates the minimum number of changes needed
4. It updates only those specific parts in the real DOM
5. This prevents full page reloads and unnecessary re-renders

---

### 1.3 Props in Components - Solution

```jsx
function Greeting({ name, timeOfDay = "day" }) {
  return (
    <div>
      <h2>Good {timeOfDay}, {name}!</h2>
    </div>
  );
}

// Usage examples:
function App() {
  return (
    <div>
      <Greeting name="Alice" timeOfDay="morning" />
      <Greeting name="Bob" timeOfDay="evening" />
      <Greeting name="Carol" /> {/* Uses default "day" */}
    </div>
  );
}
```

**Key Concepts:**
- Props are passed as attributes to components
- Destructuring makes code cleaner: `{ name, timeOfDay }` instead of `props.name`
- Default values can be set in destructuring: `timeOfDay = "day"`

---

## Chapter 2: State Management with useState

### 2.1 Basic useState Hook - Solution

```jsx
function ToggleText() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isVisible ? "Hide" : "Show"}
      </button>

      {isVisible && (
        <p>This text can be toggled!</p>
      )}
    </div>
  );
}
```

**Key Concepts:**
- `useState(false)` creates state with initial value `false`
- `setIsVisible(!isVisible)` toggles the boolean value
- Conditional rendering: `{isVisible && <p>...</p>}` only renders when true
- Ternary operator for button text: `{isVisible ? "Hide" : "Show"}`

---

### 2.2 Managing Form Input State - Solution

```jsx
function NameForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${name}\nEmail: ${email}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">Submit</button>

      <div>
        <p>Current Name: {name}</p>
        <p>Current Email: {email}</p>
      </div>
    </form>
  );
}
```

**Key Concepts:**
- Controlled components: input value is controlled by React state
- `e.target.value` gets the current input value
- `e.preventDefault()` prevents page reload on form submit

---

### 2.3 Complex State - Managing Objects - Solution

```jsx
function NoteEditor() {
  const [note, setNote] = useState({
    title: '',
    content: ''
  });

  const handleChange = (field, value) => {
    setNote({
      ...note,
      [field]: value
    });
  };

  return (
    <div>
      <input
        placeholder="Title"
        value={note.title}
        onChange={(e) => handleChange('title', e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={note.content}
        onChange={(e) => handleChange('content', e.target.value)}
      />

      <div>
        <h3>{note.title || "No title"}</h3>
        <p>{note.content || "No content"}</p>
      </div>
    </div>
  );
}
```

**Key Concepts:**
- Spread operator `...note` copies all existing properties
- Computed property names: `[field]: value` sets dynamic property
- State updates must be immutable (create new object, don't modify old one)
- Fallback values: `note.title || "No title"`

---

## Chapter 3: useEffect Hook

### 3.1 Basic useEffect - Component Lifecycle - Solution

```jsx
function LifecycleDemo() {
  const [count, setCount] = useState(0);

  // Runs on every render
  useEffect(() => {
    console.log("Component rendered");
  });

  // Runs only once on mount
  useEffect(() => {
    console.log("Component mounted");
  }, []); // Empty dependency array

  // Runs when count changes
  useEffect(() => {
    console.log(`Count changed to: ${count}`);
  }, [count]); // count in dependency array

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**Differences:**
1. No dependency array: Runs after every render
2. Empty `[]`: Runs only once after initial render (mount)
3. `[count]`: Runs when `count` changes

---

### 3.2 useEffect with Cleanup - Solution

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(intervalId);
      console.log("Timer cleaned up");
    };
  }, []); // Empty array means this effect runs once

  return (
    <div>
      <p>Seconds elapsed: {seconds}</p>
    </div>
  );
}
```

**Key Concepts:**
- Return a cleanup function to clear intervals/timeouts
- Cleanup runs before component unmounts
- Use functional update `prevSeconds => prevSeconds + 1` for accurate updates
- Prevents memory leaks

---

### 3.3 localStorage with useEffect - Solution

```jsx
function PersistentCounter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('count');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('count', count.toString());
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
      <p>Refresh the page - your count persists!</p>
    </div>
  );
}
```

**Key Concepts:**
- Lazy initialization: useState with a function
- localStorage stores strings, convert with `parseInt()` and `toString()`
- Save to localStorage whenever state changes
- Check if value exists before parsing

---

## Chapter 4: Event Handling

### 4.1 Basic Event Handling - Solution

```jsx
function ColorButton() {
  const [colorIndex, setColorIndex] = useState(0);
  const colors = ['blue', 'red', 'green', 'purple', 'orange'];

  const handleClick = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
  };

  return (
    <button
      style={{
        backgroundColor: colors[colorIndex],
        color: 'white',
        padding: '10px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
      onClick={handleClick}
    >
      Click me to change color!
    </button>
  );
}
```

**Key Concepts:**
- Use modulo `%` to cycle through array
- Functional state update ensures correct previous value
- Inline styles use camelCase properties

---

### 4.2 Binding Event Handlers - Solutions

**Solution 1: Bind in constructor**
```jsx
class MessageButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
    this.showMessage = this.showMessage.bind(this); // Bind here
  }

  showMessage() {
    this.setState({ message: 'Button clicked!' });
  }

  render() {
    return (
      <div>
        <button onClick={this.showMessage}>Click me</button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}
```

**Solution 2: Arrow function in render**
```jsx
class MessageButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  showMessage() {
    this.setState({ message: 'Button clicked!' });
  }

  render() {
    return (
      <div>
        <button onClick={() => this.showMessage()}>Click me</button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}
```

**Solution 3: Class property with arrow function (Recommended)**
```jsx
class MessageButton extends React.Component {
  state = { message: '' };

  showMessage = () => {
    this.setState({ message: 'Button clicked!' });
  }

  render() {
    return (
      <div>
        <button onClick={this.showMessage}>Click me</button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}
```

**Best Practice: Use functional components with hooks (no binding needed!)**
```jsx
function MessageButton() {
  const [message, setMessage] = useState('');

  const showMessage = () => {
    setMessage('Button clicked!');
  };

  return (
    <div>
      <button onClick={showMessage}>Click me</button>
      <p>{message}</p>
    </div>
  );
}
```

---

### 4.3 Arrow Functions in Event Handlers - Solution

```jsx
function Calculator() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);

  const add = () => {
    setResult(num1 + num2);
  };

  const subtract = () => {
    setResult(num1 - num2);
  };

  const multiply = () => {
    setResult(num1 * num2);
  };

  const divide = () => {
    if (num2 === 0) {
      alert("Cannot divide by zero!");
      setResult(0);
    } else {
      setResult(num1 / num2);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(Number(e.target.value))}
      />

      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(Number(e.target.value))}
      />

      <div>
        <button onClick={add}>+</button>
        <button onClick={subtract}>-</button>
        <button onClick={multiply}>×</button>
        <button onClick={divide}>÷</button>
      </div>

      <p>Result: {result}</p>
    </div>
  );
}
```

**Key Concepts:**
- Arrow functions don't need binding
- Convert string to number: `Number(e.target.value)`
- Always validate before operations (check for division by zero)

---

## Chapter 5: Forms and Lists

### 5.1 Form Submission and Validation - Solution

```jsx
function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.includes('@')) {
      newErrors.email = "Email must be valid";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Registration successful!');

      // Clear form
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p style={{color: 'red'}}>{errors.username}</p>}
      </div>

      <div>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
      </div>

      <div>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
      </div>

      <div>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <p style={{color: 'red'}}>{errors.confirmPassword}</p>}
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
```

**Key Concepts:**
- Use `name` attribute to identify which field changed
- Store all form data in one object
- Validate before submission
- Display errors conditionally
- Clear form after successful submission

---

### 5.2 Rendering Lists with map() - Solution

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Master hooks', completed: false }
  ]);

  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    if (inputText.trim() === '') {
      alert('Please enter a todo!');
      return;
    }

    const newTodo = {
      id: Date.now(), // Simple unique ID
      text: inputText,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputText('');
  };

  const handleToggle = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Add a todo"
        onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
      />
      <button onClick={handleAdd}>Add</button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <span style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              marginLeft: '10px'
            }}>
              {todo.text}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

**Key Concepts:**
- `map()` transforms array into JSX elements
- `key` prop must be unique and stable (use ID, not index)
- `filter()` removes items from array
- Use spread operator to add items: `[...todos, newTodo]`
- Map with conditional update to toggle items

---

### 5.3 Lists with Keys and Advanced Filtering - Solution

```jsx
function ContactList() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Alice Johnson', phone: '123-456-7890', category: 'work' },
    { id: 2, name: 'Bob Smith', phone: '234-567-8901', category: 'personal' },
    { id: 3, name: 'Carol White', phone: '345-678-9012', category: 'work' },
    { id: 4, name: 'David Brown', phone: '456-789-0123', category: 'personal' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredContacts = contacts.filter(contact => {
    // Filter by search term (name or phone)
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm);

    // Filter by category
    const matchesCategory = filterCategory === 'all' || contact.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div>
      <input
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '8px', marginRight: '10px' }}
      />

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        style={{ padding: '8px' }}
      >
        <option value="all">All</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </select>

      <div style={{ marginTop: '20px' }}>
        {filteredContacts.length === 0 ? (
          <p>No contacts found</p>
        ) : (
          filteredContacts.map(contact => (
            <div key={contact.id} style={{
              padding: '10px',
              margin: '10px 0',
              border: '1px solid #ddd',
              borderRadius: '5px'
            }}>
              <h3>{contact.name}</h3>
              <p>Phone: {contact.phone}</p>
              <p>Category: {contact.category}</p>
              <button onClick={() => handleDelete(contact.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
```

**Key Concepts:**
- Chain multiple filter conditions with `&&`
- `.toLowerCase()` for case-insensitive search
- `.includes()` checks if string contains substring
- Empty state message when no results
- Select dropdown for categories

---

## Keep Notes App Analysis - Answers

### 6.1 NoteInput Component Answers

1. **5 state variables**: title, text, color, tag, isExpanded
2. **isExpanded** controls whether the form shows full inputs or just the placeholder
3. **Color picker** maps through colors array and applies selected class with onClick handlers
4. **e.preventDefault()** prevents the default form submission which would reload the page
5. **Validation**: Checks if both title and text are not empty (at least one must have content)

### 6.2 NoteCard Component Answers

1. **Props received**: note (object), onDelete (function), onPin (function), onUpdate (function)
2. **Edit mode**: Controlled by `isEditing` state, switches between view and edit forms
3. **Cancel button**: Resets edit fields to original note values and sets isEditing to false
4. **Confirmation**: Prevents accidental deletions using `window.confirm()`
5. **Pin button**: Shows 📌 when pinned, 📍 when unpinned

### 6.3 TagFilter Component Answers

1. **Extract unique tags**: Map to get all tags, filter empty ones, filter duplicates using indexOf, then sort
2. **Key prop**: Helps React identify which items changed/added/removed for efficient updates
3. **Count notes**: Filter notes array where note.tag matches the current tag, then get length
4. **"All Notes"**: Sets selectedTag to empty string, which shows all notes
5. **Sort alphabetically**: Makes tags easier to find and provides consistent ordering

### 6.4 Main App Component Answers

1. **Two useEffect hooks**:
   - First: Loads notes from localStorage on mount (runs once)
   - Second: Saves notes to localStorage whenever notes change
2. **Persistence**: Uses localStorage to save/load notes as JSON
3. **Separate pinned/unpinned**: Filter filteredNotes by isPinned property
4. **Lifting state up**: Notes state lives in App, child components receive data via props and update via callback functions
5. **Tag filtering**: filteredNotes uses ternary to either show all notes or filter by selectedTag

---

## Tips for Success

1. **Always use keys in lists**: Unique, stable keys help React optimize rendering
2. **Keep components small**: Each component should do one thing well
3. **Lift state up**: State should live in the lowest common ancestor
4. **Immutable updates**: Never mutate state directly, always create new objects/arrays
5. **Use functional updates**: When new state depends on previous state
6. **Clean up effects**: Return cleanup functions for intervals, timeouts, subscriptions
7. **Validate user input**: Always validate before processing data
8. **Handle edge cases**: Empty arrays, null values, division by zero, etc.

---

**Congratulations on completing all exercises! 🎉**

You now have a solid foundation in React fundamentals. Keep practicing and building projects!
