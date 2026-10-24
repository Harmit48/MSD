# Practical 2: Develop a React Application implementing Props, State Management and Event Handling

## Category
React.js / State & Interactions

## 1. Objective & Aim
1. Aim & Theoretical Concept
      
        The objective of this practical is to build an interactive Cart & Product Catalog system demonstrating 
        Props Passing (Parent-to-Child & Child-to-Parent callbacks), State Management 
        with the useState hook, and Synthetic Event Handling (onClick, onChange, onSubmit).
      
      Core Theoretical Concepts:
      
        Props (Properties): Read-only inputs passed from parent components to child components, establishing a strictly unidirectional data flow. Props allow dynamic data binding and callback delegation.
        State Management (useState): State holds mutable values that persist across component re-renders. Invoking the state updater function triggers React's reconciliation engine to re-render the view with the fresh state.
        Lifting State Up: When multiple sibling components need access to the same piece of data (e.g. Products list and Cart Summary), the state is lifted up to their common parent component (App.jsx).
        Synthetic Events: React wraps native browser DOM events in cross-browser SyntheticEvent wrappers, guaranteeing uniform event behavior across all browsers.

## 2. Commands to Setup & Run
```bash
# 1. Create React Project
# Initializes a clean Vite React application.
npm create vite@latest practical-02-props-state -- --template react

# 2. Navigate to Directory
# Switches current directory.
cd practical-02-props-state

# 3. Install Dependencies
# Installs core node modules.
npm install

# 4. Run Development Server
# Launches local dev server with hot reload.
npm run dev

```

## 3. Directory Structure
```
practical-02-props-state/
├── package.json                 # Scripts and dependencies
├── src/
│   ├── main.jsx                 # Entry point
│   ├── App.jsx                  # Top-level state manager (Cart, Products, Filter, Coupon)
│   ├── index.css                # Interactive styles & badge animations
│   └── components/
│       ├── ProductItem.jsx      # Child component with quantity controls & click handlers
│       ├── CartSummary.jsx      # Computes tax, discount, item count & total dynamically
│       └── FilterBar.jsx        # Category selection & search input with onChange events
```

## 4. Source Code Files
See the source files inside this directory.
