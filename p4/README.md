# Practical 4: Develop a Single Page Application (SPA) using React Router for navigation between multiple pages

## Category
React.js / Routing & SPA Architecture

## 1. Objective & Aim
1. Aim & Theoretical Concept
      
        The objective of this practical is to build a full-featured Single Page Application (SPA) 
        using react-router-dom (v6+), implementing client-side routing, active link styling, dynamic route parameters 
        (useParams), programmatic navigation (useNavigate), and fallback 404 views without full page reloads.
      
      Core Theoretical Concepts:
      
        Single Page Application (SPA): A web application that dynamically rewrites the current web page rather than loading entire new pages from a server. SPA architecture eliminates white screen flashes and delivers instantaneous navigation.
        Client-Side Routing: The browser's History API (pushState, replaceState) intercepts URL changes in the address bar. React Router matches the URL pathname against defined routes and swaps out component views in the DOM without requesting HTML from the server.
        Key React Router v6 Hooks & Primitives:
          
            &lt;BrowserRouter&gt;: Top-level wrapper managing routing state via HTML5 history API.
            &lt;Routes&gt; & &lt;Route&gt;: Declarative mapping between URL paths and UI components.
            &lt;NavLink&gt;: Provides active class flags (isActive) for navigation bars.
            useParams(): Extracts dynamic tokens from URL path (e.g. /courses/:courseId).
            useNavigate(): Programmatically moves the user back, forward, or to specific routes.

## 2. Commands to Setup & Run
```bash
# 1. Create React Project
# Scaffolds new React project with Vite.
npm create vite@latest practical-04-react-router -- --template react

# 2. Install React Router DOM
# Installs official React Router v6 library for declarative web routing.
npm install react-router-dom

# 3. Run Application
# Starts local SPA development server.
npm run dev

```

## 3. Directory Structure
```
practical-04-react-router/
├── package.json
├── src/
│   ├── main.jsx                 # Mounts BrowserRouter wrapping App
│   ├── App.jsx                  # Defines Routes, Route hierarchy and NavLink layout
│   ├── index.css                # SPA transitions, active navbar link indicator & styling
│   ├── components/
│   │   ├── Navbar.jsx           # Global navigation with active status indicators
│   │   └── Footer.jsx           # Standardized footer component
│   └── pages/
│       ├── Home.jsx             # Welcome dashboard with feature cards
│       ├── About.jsx            # University / Department information page
│       ├── Courses.jsx          # Dynamic course listing with deep-link buttons
│       ├── CourseDetail.jsx     # Param-driven view reading :courseId via useParams()
│       └── NotFound.jsx         # Fallback 404 error page for unmatched paths
```

## 4. Source Code Files
See the source files inside this directory.
