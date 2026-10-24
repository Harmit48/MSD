# Practical 1: Build a React Application using Functional Components, JSX and Component Reusability Concepts

## Category
React.js / Frontend Architecture

## 1. Objective & Aim
1. Aim & Theoretical Concept
      
        The objective of this practical is to build a modular React application leveraging modern Functional Components, 
        JSX (JavaScript XML) syntax, and Component Reusability design patterns.
      
      Core Theoretical Concepts:
      
        Functional Components: JavaScript functions that accept an arbitrary input called props and return a React element describing what should appear on the screen. Unlike legacy class components, functional components are lightweight, stateless by default, and seamlessly integrate with React Hooks.
        JSX Syntax: A syntax extension to JavaScript that allows writing HTML-like structures directly inside JavaScript code. JSX enforces strict rules: tags must be closed, single root elements or fragments (&lt;&gt;...&lt;/&gt;) must enclose returns, class is written as className, and JavaScript expressions are evaluated inside curly braces { }.
        Component Reusability & Composition: Designing generalized, atomic components (Buttons, Badges, Cards, Headers) that can be reused across different views with varying props (variants, sizes, icons, children composition) adhering to the DRY (Don't Repeat Yourself) principle.

## 2. Commands to Setup & Run
```bash
# 1. Create React Project using Vite
# Scaffolds a blazing fast, modern React 18+ application with Vite build tool.
npm create vite@latest practical-01-components -- --template react

# 2. Navigate to Project Directory
# Switches working directory to the newly initialized project.
cd practical-01-components

# 3. Install Dependencies
# Installs core React and ReactDOM packages defined in package.json.
npm install

# 4. Run Local Development Server
# Starts Vite local dev server with Hot Module Replacement (HMR) at http://localhost:5173.
npm run dev

# 5. Build for Production
# Compiles and bundles optimized static assets into the /dist directory.
npm run build

```

## 3. Directory Structure
```
practical-01-components/
├── index.html                   # HTML entry point with root DOM node (#root)
├── package.json                 # Project dependencies, scripts & metadata
├── vite.config.js               # Vite compilation configuration
├── src/
│   ├── main.jsx                 # Application entry rendering <App /> into root DOM
│   ├── App.jsx                  # Main orchestrator dashboard utilizing reusable components
│   ├── index.css                # Global styles, CSS custom properties & layout grid
│   └── components/
│       ├── Header.jsx           # Reusable navigation header with branding & theme toggle
│       ├── Button.jsx           # Polymorphic reusable button (primary/secondary/danger)
│       ├── Badge.jsx            # Dynamic status indicator badge (success/warning/info)
│       └── Card.jsx             # Modular content card with children projection & props
```

## 4. Source Code Files
See the source files inside this directory.
