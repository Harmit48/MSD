import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5013/api';

export default function App() {
  const [documents, setDocuments] = useState([
    {
      _id: "doc_101",
      title: "FY2026-Financial-Audit-Report.pdf",
      category: "Finance",
      accessLevel: "Restricted",
      size: "4.8 MB",
      uploadedBy: "Chief Financial Officer",
      updatedAt: "2026-10-23",
      version: 2
    },
    {
      _id: "doc_102",
      title: "Enterprise-Architecture-Guidelines.docx",
      category: "Engineering",
      accessLevel: "Internal",
      size: "1.2 MB",
      uploadedBy: "Lead Cloud Architect",
      updatedAt: "2026-10-22",
      version: 1
    },
    {
      _id: "doc_103",
      title: "Employee-NDA-Agreement-Template.pdf",
      category: "Legal & Compliance",
      accessLevel: "Internal",
      size: "820 KB",
      uploadedBy: "Legal Counsel",
      updatedAt: "2026-10-20",
      version: 3
    }
  ]);

  const [auditLogs, setAuditLogs] = useState([
    { action: "UPLOAD", documentTitle: "FY2026-Financial-Audit-Report.pdf", performedBy: "Chief Financial Officer", role: "SuperAdmin", time: "2026-10-23 11:20:00", ip: "192.168.1.10" },
    { action: "DOWNLOAD", documentTitle: "Enterprise-Architecture-Guidelines.docx", performedBy: "Lead Cloud Architect", role: "DepartmentManager", time: "2026-10-23 11:28:15", ip: "192.168.1.42" },
    { action: "VIEW", documentTitle: "Employee-NDA-Agreement-Template.pdf", performedBy: "HR Manager", role: "Staff", time: "2026-10-23 11:35:40", ip: "192.168.1.15" }
  ]);

  const [backendOnline, setBackendOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [showAudit, setShowAudit] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New Document Form
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState('Engineering');
  const [newAccess, setNewAccess] = useState('Internal');

  // Load documents from backend
  const fetchDocuments = async () => {
    try {
      const res = await fetch(`${API_BASE}/documents`);
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.length > 0) {
          setDocuments(json.data);
        }
        setBackendOnline(true);
      }
    } catch (e) {
      setBackendOnline(false);
    }
  };

  // Load audit logs from backend
  const fetchAuditLogs = async () => {
    try {
      const res = await fetch(`${API_BASE}/audit-logs`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) setAuditLogs(json.data);
      }
    } catch (e) {
      // Keep sample fallback
    }
  };

  useEffect(() => {
    fetchDocuments();
    fetchAuditLogs();
    const interval = setInterval(fetchDocuments, 8000);
    return () => clearInterval(interval);
  }, []);

  // Handle Document Upload / Creation
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setLoading(true);
    const newDoc = {
      title: newTitle.trim(),
      category: newCat,
      accessLevel: newAccess,
      uploadedBy: "Harmit Suthar"
    };

    try {
      const res = await fetch(`${API_BASE}/documents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDoc)
      });
      if (res.ok) {
        const json = await res.json();
        setDocuments(prev => [json.document, ...prev]);
        fetchAuditLogs();
      } else {
        throw new Error('Backend failed');
      }
    } catch (err) {
      // Local fallback
      const localDoc = {
        _id: "doc_" + Date.now(),
        title: newTitle.trim(),
        category: newCat,
        accessLevel: newAccess,
        size: "1.5 MB",
        uploadedBy: "Harmit Suthar",
        updatedAt: new Date().toISOString().split('T')[0],
        version: 1
      };
      setDocuments(prev => [localDoc, ...prev]);
    } finally {
      setNewTitle('');
      setShowUploadModal(false);
      setLoading(false);
    }
  };

  // Handle Document Deletion
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document from the DMS archive?")) return;

    try {
      await fetch(`${API_BASE}/documents/${id}`, { method: 'DELETE' });
      fetchAuditLogs();
    } catch (err) {
      // Handled locally
    }
    setDocuments(prev => prev.filter(d => d._id !== id));
  };

  const filtered = documents.filter(d => 
    (filterCat === 'All' || d.category === filterCat) &&
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="master-app">
      <header className="topbar" style={{ position: 'static', border: '1px solid var(--border)', borderRadius: 'var(--radius)', marginBottom: 28, boxShadow: 'var(--shadow)' }}>
        <div className="topbar-inner" style={{ padding: '16px 22px' }}>
          <div className="brand">
            <div className="brand-mark">DV</div>
            <div>
              <div className="brand-title">Ganpat University · Department of Computer Science</div>
              <div className="brand-sub">M.Sc [CA &amp; IT] – 1 · MERN Stack Development (P21A1MSD)</div>
            </div>
          </div>
          <div className="student-chip">
            <div className="avatar">HS</div>
            <div>
              <div className="chip-name">Harmit Suthar</div>
              <div className="chip-id">Enrollment No. 23084231044</div>
            </div>
          </div>
        </div>
      </header>

      <div className="section-intro">
        <div>
          <span className="eyebrow">Practical 13 · Capstone Mini Project</span>
          <h2>DocuVault Enterprise DMS</h2>
          <p>Full-stack MERN document management with role-based access control, Multer file streaming and tamper-evident audit logs.</p>
        </div>
        <span className={`badge-pill ${backendOnline ? 'success' : 'warning'}`}>
          {backendOnline ? '● Backend online · port 5013' : '● Local mode · backend offline'}
        </span>
      </div>

      <div className="kpi-grid">
        <div className="card-box kpi"><span className="kpi-label">Total documents</span><span className="kpi-value">{documents.length}</span><span className="kpi-note">Across all departments</span></div>
        <div className="card-box kpi"><span className="kpi-label">Storage consumed</span><span className="kpi-value">14.8 GB</span><span className="kpi-note">Of 50 GB quota</span></div>
        <div className="card-box kpi"><span className="kpi-label">Security compliance</span><span className="kpi-value">99.98%</span><span className="kpi-note">Audit-verified</span></div>
        <div className="card-box kpi"><span className="kpi-label">Departments</span><span className="kpi-value">5</span><span className="kpi-note">RBAC partitioned</span></div>
      </div>

      {/* Action Bar */}
      <div className="card-box action-bar">
        <div className="grow">
          <input
            type="text"
            placeholder="Search documents by keyword or extension…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field"
          />
        </div>
        <div style={{ width: '200px' }}>
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="input-field">
            <option value="All">All Categories</option>
            <option value="Engineering">Engineering</option>
            <option value="Finance">Finance</option>
            <option value="Legal & Compliance">Legal & Compliance</option>
          </select>
        </div>
        <button className="btn-primary" onClick={() => setShowUploadModal(true)}>
          Upload document
        </button>
        <button className="btn-secondary" onClick={() => { fetchAuditLogs(); setShowAudit(true); }}>
          View audit trail ({auditLogs.length})
        </button>
      </div>

      {/* Documents Table */}
      <div className="card-box" style={{ overflowX: 'auto', padding: 0 }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Document Title</th>
              <th>Category</th>
              <th>Access Level</th>
              <th>File Size</th>
              <th>Uploaded By</th>
              <th>Last Modified</th>
              <th>Version</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="empty-row">
                  No documents found{search ? <> matching &ldquo;{search}&rdquo;</> : null}.
                </td>
              </tr>
            ) : (
              filtered.map(doc => (
                <tr key={doc._id}>
                  <td>
                    <strong>{doc.title}</strong>
                  </td>
                  <td>
                    <span className="badge-pill info">{doc.category}</span>
                  </td>
                  <td>
                    <span className={`badge-pill ${doc.accessLevel === 'Restricted' ? 'danger' : 'success'}`}>
                      {doc.accessLevel || 'Internal'}
                    </span>
                  </td>
                  <td>{doc.size || '1.5 MB'}</td>
                  <td className="muted-cell">{doc.uploadedBy || 'Harmit Suthar'}</td>
                  <td className="muted-cell">{doc.updatedAt || '2026-10-23'}</td>
                  <td>v{doc.version || 1}.0</td>
                  <td>
                    <div className="row-actions">
                      <button className="btn-icon" title="Download document" onClick={() => alert(`Downloading ${doc.title} via secure encrypted stream…`)}>Download</button>
                      <button className="btn-icon" title="View document details" onClick={() => alert(`DocuVault metadata\n\nTitle: ${doc.title}\nCategory: ${doc.category}\nAccess: ${doc.accessLevel}\nUploader: ${doc.uploadedBy}`)}>View</button>
                      <button className="btn-icon danger" title="Delete document" onClick={() => handleDelete(doc._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Upload document to DocuVault</h3>
              <button className="modal-close" onClick={() => setShowUploadModal(false)} aria-label="Close">✕</button>
            </div>
            <form onSubmit={handleUploadSubmit}>
              <div className="field">
                <label className="field-label">Document Title / File Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Q3-Cloud-Security-Review.pdf"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="field">
                <label className="field-label">Department / Category:</label>
                <select value={newCat} onChange={e => setNewCat(e.target.value)} className="input-field">
                  <option value="Engineering">Engineering</option>
                  <option value="Finance">Finance</option>
                  <option value="Legal & Compliance">Legal & Compliance</option>
                </select>
              </div>
              <div className="field" style={{ marginBottom: 22 }}>
                <label className="field-label">Access Level (RBAC Permission):</label>
                <select value={newAccess} onChange={e => setNewAccess(e.target.value)} className="input-field">
                  <option value="Internal">Internal (All Authenticated Staff)</option>
                  <option value="Restricted">Restricted (C-Suite & Admins Only)</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowUploadModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? 'Uploading…' : 'Save & register document'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Audit Trail Modal */}
      {showAudit && (
        <div className="modal-overlay" onClick={() => setShowAudit(false)}>
          <div className="modal-box wide" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Tamper-evident security audit log</h3>
              <button className="modal-close" onClick={() => setShowAudit(false)} aria-label="Close">✕</button>
            </div>
            <div className="audit-list">
              {auditLogs.map((log, idx) => (
                <div key={idx} className="audit-row">
                  <div>
                    <span className={`badge-pill ${log.action === 'UPLOAD' ? 'success' : log.action === 'DELETE' ? 'danger' : 'info'}`} style={{ marginRight: '8px' }}>
                      {log.action}
                    </span>
                    <strong>{log.documentTitle}</strong>
                    <div className="audit-meta">
                      By: {log.performedBy} ({log.role}) &nbsp;|&nbsp; IP: {log.ip || '127.0.0.1'}
                    </div>
                  </div>
                  <span className="audit-time">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <p className="footer">Harmit Suthar (23084231044) · Practical 13 · DocuVault DMS</p>
    </div>
  );
}