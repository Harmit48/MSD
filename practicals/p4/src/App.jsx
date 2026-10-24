import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import CourseDetail from './pages/CourseDetail';

const Home = () => (
  <div className="page-view">
    <h2>Welcome to the EduSphere Single Page Application</h2>
    <p>Seamless client-side navigation powered by React Router v6. No page reloads!</p>
    <div className="feature-cards">
      <div className="card">Instant route swapping</div>
      <div className="card">Dynamic URL parameters</div>
      <div className="card">Robust 404 fallback</div>
    </div>
  </div>
);

const Courses = () => (
  <div className="page-view">
    <h2>Available academic courses</h2>
    <div className="course-cards-list">
      <div className="course-card">
        <h3>Full-Stack MERN Architecture</h3>
        <p>Master React, Node, Express and MongoDB.</p>
        <Link to="/courses/cs101" className="details-btn">View syllabus (CS101) →</Link>
      </div>
      <div className="course-card">
        <h3>Cloud Microservices & Docker</h3>
        <p>Learn containerization, API gateways and service meshes.</p>
        <Link to="/courses/cs102" className="details-btn">View syllabus (CS102) →</Link>
      </div>
      <div className="course-card">
        <h3>DevOps & Cloud Automation</h3>
        <p>CI/CD pipelines with GitHub Actions and AWS.</p>
        <Link to="/courses/cs103" className="details-btn">View syllabus (CS103) →</Link>
      </div>
    </div>
  </div>
);

const NotFound = () => (
  <div className="page-view not-found-page">
    <h1>404</h1>
    <h3>Oops! Page Not Found</h3>
    <p>The requested route does not exist in this Single Page Application.</p>
    <Link to="/" className="home-btn">Return to Home</Link>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div className="spa-wrapper">
        <Navbar />
        <main className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;