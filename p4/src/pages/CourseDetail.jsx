import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const COURSE_DATABASE = {
  'cs101': {
    title: "Full-Stack MERN Architecture",
    instructor: "Prof. Arvind Kulkarni",
    duration: "14 Weeks",
    syllabus: ["ES6+ & React 18", "Express.js REST APIs", "MongoDB Schema Design", "Deployment & CI/CD"],
    prerequisites: "JavaScript Fundamentals & Basic Web Concepts"
  },
  'cs102': {
    title: "Cloud Microservices & Docker",
    instructor: "Dr. Shalini Mehta",
    duration: "10 Weeks",
    syllabus: ["Containers with Docker", "Kubernetes Pods", "API Gateways", "Event Queues"],
    prerequisites: "Node.js & Linux CLI basics"
  },
  'cs103': {
    title: "DevOps & Cloud Automation",
    instructor: "Er. Rahul Saxena",
    duration: "8 Weeks",
    syllabus: ["GitHub Actions", "Terraform IaC", "AWS Cloud Infrastructure", "Monitoring with Prometheus"],
    prerequisites: "Git Version Control"
  }
};

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = COURSE_DATABASE[courseId?.toLowerCase()];

  if (!course) {
    return (
      <div className="course-detail-container not-found">
        <h2>Course not found</h2>
        <p>No course exists matching identifier: <code>{courseId}</code></p>
        <button onClick={() => navigate('/courses')} className="back-btn">
          ← Back to Courses Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="course-detail-card">
      <button onClick={() => navigate('/courses')} className="back-link">
        ← Back to All Courses
      </button>

      <div className="detail-header">
        <span className="course-code-tag">{courseId.toUpperCase()}</span>
        <h2>{course.title}</h2>
        <p className="instructor-text">Lead instructor: {course.instructor} | Duration: {course.duration}</p>
      </div>

      <div className="syllabus-box">
        <h3>Curriculum Modules</h3>
        <ul>
          {course.syllabus.map((topic, idx) => (
            <li key={idx}>Module {idx + 1}: {topic}</li>
          ))}
        </ul>
      </div>

      <div className="prereq-box">
        <strong>Prerequisites:</strong> {course.prerequisites}
      </div>

      <button className="enroll-btn" onClick={() => alert(`Enrolled in ${course.title}`)}>
        Proceed to Course Modules
      </button>
    </div>
  );
};

export default CourseDetail;