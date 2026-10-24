import React from 'react';

const Header = ({ appName = "MSD Course Portal", studentName = "Harmit Suthar", enrollmentNo = "23084231044" }) => {
  const initials = studentName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <div className="brand-mark">P1</div>
          <div>
            <div className="brand-title">{appName}</div>
            <div className="brand-sub">Ganpat University · M.Sc [CA &amp; IT]</div>
          </div>
        </div>
        <div className="student-chip">
          <div className="avatar">{initials}</div>
          <div>
            <div className="chip-name">{studentName}</div>
            <div className="chip-id">{enrollmentNo}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
