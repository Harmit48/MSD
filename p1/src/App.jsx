import React from 'react';
import Header from './components/Header';
import Card from './components/Card';
import Button from './components/Button';
import Badge from './components/Badge';

function App() {
  const handleEnroll = (courseName) => {
    alert(`Successfully enrolled in: ${courseName}`);
  };

  const courseList = [
    {
      id: 1,
      title: "MERN Stack Engineering",
      subtitle: "Full-Stack Web Development",
      badgeText: "Bestseller",
      badgeType: "success",
      description: "Master MongoDB, Express.js, React, and Node.js with real-time enterprise architecture.",
      duration: "12 Weeks",
      level: "Advanced"
    },
    {
      id: 2,
      title: "React.js State Architecture",
      subtitle: "Frontend Systems Design",
      badgeText: "Popular",
      badgeType: "info",
      description: "Deep dive into component hierarchies, custom hooks, context API, and performance optimization.",
      duration: "6 Weeks",
      level: "Intermediate"
    },
    {
      id: 3,
      title: "Cloud Microservices with Express",
      subtitle: "Backend RESTful APIs",
      badgeText: "High Demand",
      badgeType: "warning",
      description: "Build robust REST APIs, implement JWT authentication, and deploy scalable Node services.",
      duration: "8 Weeks",
      level: "Intermediate"
    }
  ];

  return (
    <div className="app-container">
      <Header appName="MSD Course Portal" studentName="Harmit Suthar" enrollmentNo="26084231044" />

      <main className="main-content">
        <section className="hero-section">
          <span className="eyebrow">Practical 01 · React Components</span>
          <h1>Component Reusability in Action</h1>
          <p>
            Demonstrating React 18 Functional Components, JSX expressions, and parameter-driven UI blocks.
          </p>
        </section>

        <section className="card-grid">
          {courseList.map((course) => (
            <Card
              key={course.id}
              title={course.title}
              subtitle={course.subtitle}
              badgeText={course.badgeText}
              badgeType={course.badgeType}
              actionText="Enroll Now"
              onActionClick={() => handleEnroll(course.title)}
            >
              <p>{course.description}</p>
              <div className="card-meta">
                <span>{course.duration}</span>
                <span>{course.level}</span>
              </div>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;