import React from 'react';

const AppBar = ({ practical, title = 'MERN Stack Development' }) => (
  <header className="topbar">
    <div className="topbar-inner">
      <div className="brand">
        <div className="brand-mark">P{practical}</div>
        <div>
          <div className="brand-title">{title}</div>
          <div className="brand-sub">Ganpat University · M.Sc [CA &amp; IT]</div>
        </div>
      </div>
      <div className="student-chip">
        <div className="avatar">HS</div>
        <div>
          <div className="chip-name">Harmit Suthar</div>
          <div className="chip-id">23084231044</div>
        </div>
      </div>
    </div>
  </header>
);

export default AppBar;
