# Keep Notes React App - Exercises

This document contains progressive exercises to help you learn React fundamentals while building the Keep Notes application. Complete each section before moving to the next.

---

## Chapter 1: React Fundamentals & JSX

### 1.1 Understanding JSX

**Exercise:** Create a simple React component that displays your name and favorite hobby.

```jsx
// Your task: Complete the UserProfile component
function UserProfile() {
  // TODO: Add variables for name and hobby

  return (
    <div>
      {/* TODO: Display name and hobby using JSX */}
    </div>
  );
}
```

**Expected Output:**
```
Name: John Doe
Hobby: Reading
```

**Learning Goals:**
- Understand JSX syntax
- Embed JavaScript expressions in JSX using `{}`
- Create functional components

---

### 1.2 Understanding Virtual DOM

**Exercise:** Modify the following code to understand how React efficiently updates the DOM.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  // Question: What happens when you click the button?
  // Why doesn't the entire page reload?

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

**Tasks:**
1. Add a `console.log('Component rendered')` at the top of the component
2. Click the button multiple times
3. Observe the console - how many times does it log?
4. **Question:** Why is this efficient compared to traditional DOM manipulation?

**Learning Goals:**
- Understand Virtual DOM concept
- See how React updates only what's necessary
- Understand component re-rendering

---

### 1.3 Props in Components

**Exercise:** Create a `Greeting` component that receives props and displays a personalized message.

```jsx
// Your task: Complete the Greeting component
function Greeting(props) {
  // TODO: Extract name and timeOfDay from props

  return (
    <div>
      {/* TODO: Display "Good {timeOfDay}, {name}!" */}
    </div>
  );
}

// Usage example:
// <Greeting name="Alice" timeOfDay="morning" />
// Should display: "Good morning, Alice!"
```

**Tasks:**
1. Complete the Greeting component
2. Create another component that uses Greeting with different props
3. **Bonus:** Make timeOfDay optional with a default value of "day"

**Learning Goals:**
- Understand how to pass data via props
- Access props in functional components
- Use destructuring for cleaner code

---

## Chapter 2: State Management with useState

### 2.1 Basic useState Hook

**Exercise:** Create a simple toggle button that shows/hides text.

```jsx
function ToggleText() {
  // TODO: Create a state variable 'isVisible' with initial value false

  // TODO: Create a function to toggle isVisible

  return (
    <div>
      <button>
        {/* TODO: Show "Hide" when visible, "Show" when hidden */}
      </button>

      {/* TODO: Only show this paragraph when isVisible is true */}
      <p>This text can be toggled!</p>
    </div>
  );
}
```

**Learning Goals:**
- Use useState hook
- Update state with setter function
- Conditional rendering based on state

---

### 2.2 Managing Form Input State

**Exercise:** Create a controlled input component.

```jsx
function NameForm() {
  // TODO: Create state for 'name'

  // TODO: Create state for 'email'

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Display an alert with name and email
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        // TODO: Set value and onChange
      />

      <input
        type="email"
        placeholder="Email"
        // TODO: Set value and onChange
      />

      <button type="submit">Submit</button>

      {/* TODO: Display current values below inputs */}
    </form>
  );
}
```

**Learning Goals:**
- Manage multiple state variables
- Create controlled components
- Handle form inputs
- Prevent default form submission

---

### 2.3 Complex State - Managing Objects

**Exercise:** Create a note editor that manages an object state.

```jsx
function NoteEditor() {
  // TODO: Create state for note object with title and content
  // Initial state: { title: '', content: '' }

  const handleChange = (field, value) => {
    // TODO: Update the specific field in the note object
    // Hint: Use spread operator to maintain other fields
  };

  return (
    <div>
      <input
        placeholder="Title"
        value={/* TODO */}
        onChange={(e) => handleChange('title', e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={/* TODO */}
        onChange={(e) => handleChange('content', e.target.value)}
      />

      {/* Display preview */}
      <div>
        <h3>{/* TODO: Display title */}</h3>
        <p>{/* TODO: Display content */}</p>
      </div>
    </div>
  );
}
```

**Learning Goals:**
- Manage object state
- Use spread operator for immutable updates
- Handle multiple inputs with one handler

---

## Chapter 3: useEffect Hook

### 3.1 Basic useEffect - Component Lifecycle

**Exercise:** Create a component that logs lifecycle events.

```jsx
function LifecycleDemo() {
  const [count, setCount] = useState(0);

  // TODO: Add useEffect that runs on every render
  // Log: "Component rendered"

  // TODO: Add useEffect that runs only once on mount
  // Log: "Component mounted"

  // TODO: Add useEffect that runs when count changes
  // Log: "Count changed to: [value]"

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

**Tasks:**
1. Implement all three useEffect hooks
2. Click the button and observe console logs
3. **Question:** What's the difference between each useEffect?

**Learning Goals:**
- Understand useEffect hook
- Use dependency arrays
- Understand component lifecycle

---

### 3.2 useEffect with Cleanup

**Exercise:** Create a timer that cleans up when component unmounts.

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  // TODO: Use useEffect to create an interval
  // Increment seconds every 1000ms

  // TODO: Return a cleanup function to clear the interval

  return (
    <div>
      <p>Seconds elapsed: {seconds}</p>
    </div>
  );
}
```

**Learning Goals:**
- Implement cleanup in useEffect
- Prevent memory leaks
- Work with setInterval

---

### 3.3 localStorage with useEffect

**Exercise:** Create a component that persists data to localStorage.

```jsx
function PersistentCounter() {
  // TODO: Initialize state from localStorage or default to 0
  const [count, setCount] = useState(() => {
    // Hint: Check localStorage.getItem('count')
  });

  // TODO: Save count to localStorage whenever it changes

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

**Learning Goals:**
- Use localStorage
- Lazy initialization of state
- Synchronize state with external storage

---

## Chapter 4: Event Handling

### 4.1 Basic Event Handling

**Exercise:** Create a button that changes color when clicked.

```jsx
function ColorButton() {
  const [color, setColor] = useState('blue');

  const colors = ['blue', 'red', 'green', 'purple', 'orange'];

  // TODO: Create handleClick function
  // It should cycle through colors array

  return (
    <button
      style={{ backgroundColor: color, color: 'white', padding: '10px' }}
      // TODO: Add onClick event handler
    >
      Click me to change color!
    </button>
  );
}
```

**Learning Goals:**
- Handle click events
- Update state based on previous state
- Use inline styles

---

### 4.2 Binding Event Handlers

**Exercise:** Fix the common binding issue.

```jsx
class MessageButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
  }

  // This won't work correctly - why?
  showMessage() {
    this.setState({ message: 'Button clicked!' });
  }

  render() {
    return (
      <div>
        <button onClick={this.showMessage}>
          Click me
        </button>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

// TODO: Fix the binding issue using one of these methods:
// 1. Bind in constructor
// 2. Use arrow function in render
// 3. Use class property with arrow function
```

**Learning Goals:**
- Understand `this` binding in JavaScript
- Learn different ways to bind event handlers
- Compare class components vs functional components

---

### 4.3 Arrow Functions in Event Handlers

**Exercise:** Create a calculator with arrow function handlers.

```jsx
function Calculator() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState(0);

  // TODO: Create arrow functions for add, subtract, multiply, divide
  const add = () => {
    // TODO
  };

  const subtract = () => {
    // TODO
  };

  const multiply = () => {
    // TODO
  };

  const divide = () => {
    // TODO (handle division by zero)
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

**Learning Goals:**
- Use arrow functions for event handlers
- Handle number inputs
- Perform calculations based on state

---

## Chapter 5: Forms and Lists

### 5.1 Form Submission and Validation

**Exercise:** Create a registration form with validation.

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
    // TODO: Update formData
  };

  const validateForm = () => {
    const newErrors = {};

    // TODO: Validate username (min 3 characters)

    // TODO: Validate email (contains @)

    // TODO: Validate password (min 6 characters)

    // TODO: Validate confirmPassword matches password

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);
      // TODO: Clear form
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

      {/* TODO: Add email, password, and confirmPassword fields */}

      <button type="submit">Register</button>
    </form>
  );
}
```

**Learning Goals:**
- Handle multiple form inputs
- Implement form validation
- Display error messages
- Manage complex form state

---

### 5.2 Rendering Lists with map()

**Exercise:** Create a todo list that displays items.

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Master hooks', completed: false }
  ]);

  const [inputText, setInputText] = useState('');

  const handleAdd = () => {
    // TODO: Add new todo to list
    // Remember to create unique ID and set completed to false
  };

  const handleToggle = (id) => {
    // TODO: Toggle completed status of todo with given id
    // Hint: Use map() to create new array
  };

  const handleDelete = (id) => {
    // TODO: Remove todo with given id
    // Hint: Use filter()
  };

  return (
    <div>
      <input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Add a todo"
      />
      <button onClick={handleAdd}>Add</button>

      <ul>
        {/* TODO: Use map() to render each todo */}
        {/* Each todo should have:
            - Checkbox to toggle completion
            - Text with strikethrough if completed
            - Delete button
            - Don't forget the key prop!
        */}
      </ul>
    </div>
  );
}
```

**Learning Goals:**
- Use map() to render lists
- Understand importance of keys
- Update array state immutably
- Filter and manipulate arrays

---

### 5.3 Lists with Keys and Advanced Filtering

**Exercise:** Create a searchable contact list.

```jsx
function ContactList() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Alice Johnson', phone: '123-456-7890', category: 'work' },
    { id: 2, name: 'Bob Smith', phone: '234-567-8901', category: 'personal' },
    { id: 3, name: 'Carol White', phone: '345-678-9012', category: 'work' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // TODO: Filter contacts based on searchTerm and filterCategory
  const filteredContacts = contacts.filter(contact => {
    // Filter by search term (name or phone)

    // Filter by category

    // Return true if both conditions match
  });

  return (
    <div>
      <input
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="all">All</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </select>

      <div>
        {/* TODO: Map through filteredContacts and display each contact */}
        {/* Include: name, phone, category, and a delete button */}
      </div>
    </div>
  );
}
```

**Learning Goals:**
- Implement search functionality
- Filter arrays based on multiple criteria
- Use select dropdowns with controlled components
- Combine multiple state variables for filtering

---

## Chapter 6: Building the Keep Notes App

Now that you've completed the exercises, you're ready to understand the Keep Notes application!

### 6.1 Analyzing NoteInput Component

**Exercise:** Answer these questions by reading `src/components/NoteInput.js`:

1. How many state variables does NoteInput use? What are they?
2. What does `isExpanded` state control?
3. How does the color picker work?
4. Why do we use `e.preventDefault()` in handleSubmit?
5. What validation is performed before creating a note?

---

### 6.2 Analyzing NoteCard Component

**Exercise:** Answer these questions by reading `src/components/NoteCard.js`:

1. What props does NoteCard receive?
2. How does the edit mode work?
3. What happens when you click the cancel button while editing?
4. Why do we ask for confirmation before deleting?
5. How is the pin button's appearance different when a note is pinned?

---

### 6.3 Analyzing TagFilter Component

**Exercise:** Answer these questions by reading `src/components/TagFilter.js`:

1. How do we extract unique tags from all notes?
2. Why is the `key` prop important when rendering the tag list?
3. How do we count notes for each tag?
4. What happens when you click "All Notes"?
5. Why do we sort tags alphabetically?

---

### 6.4 Analyzing Main App Component

**Exercise:** Answer these questions by reading `src/App.js`:

1. How many useEffect hooks are used? What does each one do?
2. How does the app persist notes between page refreshes?
3. How are pinned notes separated from unpinned notes?
4. What is "lifting state up" and where is it demonstrated?
5. How does the tag filtering work?

---

### 6.5 Extending the App - Challenge Exercises

**Challenge 1: Add Search Functionality**
- Add a search bar that filters notes by title or content
- Update the UI to show search results count

**Challenge 2: Add Note Categories**
- Create predefined categories (Work, Personal, Ideas, etc.)
- Add category badges with different colors
- Allow filtering by category

**Challenge 3: Add Timestamps**
- Display when each note was created
- Display when each note was last edited
- Format timestamps nicely (e.g., "2 hours ago")

**Challenge 4: Add Sorting Options**
- Sort notes by date created (newest/oldest first)
- Sort notes alphabetically by title
- Add a dropdown to select sort method

**Challenge 5: Export/Import Notes**
- Add button to export all notes as JSON
- Add button to import notes from JSON file
- Include validation for imported data

---

## Final Project Checklist

Before you consider the app complete, make sure you can:

- [ ] Explain what JSX is and how it differs from HTML
- [ ] Describe the Virtual DOM and its benefits
- [ ] Use props to pass data between components
- [ ] Manage state with useState hook
- [ ] Use useEffect for side effects and lifecycle
- [ ] Handle various events (click, change, submit)
- [ ] Create controlled form components
- [ ] Validate form input
- [ ] Render lists using map() with proper keys
- [ ] Filter and sort arrays
- [ ] Understand component composition
- [ ] Implement localStorage for persistence
- [ ] Create a fully functional CRUD application

---

## Additional Resources

- React Official Documentation: https://react.dev
- useState Hook: https://react.dev/reference/react/useState
- useEffect Hook: https://react.dev/reference/react/useEffect
- Lists and Keys: https://react.dev/learn/rendering-lists
- Forms: https://react.dev/reference/react-dom/components/input

---

## Answers and Solutions

For detailed solutions to all exercises, review the implementation in the Keep Notes app components. Each component is well-commented to help you understand the concepts.

**Happy Learning! 🚀**
