import React, { useEffect, useRef, useState } from 'react';
import {
  Briefcase,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowDown,
  Sparkles,
} from 'lucide-react';
import { apiRequest } from '../../utils/api.js';

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [jobsError, setJobsError] = useState('');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobSelection, setJobSelection] = useState('general');
  const [educationExperience, setEducationExperience] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setLoadingJobs(true);
    apiRequest('/api/public/jobs')
      .then((data) => {
        setJobs(data.jobs || []);
        setJobsError('');
      })
      .catch((err) => {
        setJobsError(err.message || 'Unable to load current job openings.');
      })
      .finally(() => setLoadingJobs(false));
  }, []);

  const handleSelectPosition = (jobId) => {
    setJobSelection(String(jobId));
    setSubmissionSuccess(null);
    setFormError('');
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormError('');
    if (!file) {
      setResumeFile(null);
      return;
    }
    const lower = file.name.toLowerCase();
    if (!lower.endsWith('.pdf') && !lower.endsWith('.doc') && !lower.endsWith('.docx')) {
      setFormError('Please select a valid PDF, DOC, or DOCX resume file.');
      e.target.value = '';
      setResumeFile(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFormError('Resume file must be 5 MB or smaller.');
      e.target.value = '';
      setResumeFile(null);
      return;
    }
    setResumeFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmissionSuccess(null);

    if (!resumeFile) {
      setFormError('Please attach your Resume/CV (.pdf, .doc, or .docx) before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName.trim());
    formData.append('email', email.trim());
    formData.append('phone', phone.trim());
    formData.append('jobSelection', jobSelection);
    formData.append('educationExperience', educationExperience.trim());
    formData.append('coverLetter', coverLetter.trim());
    formData.append('resume', resumeFile);

    setSubmitting(true);
    try {
      const res = await apiRequest('/api/public/applications', {
        method: 'POST',
        body: formData,
        isFormData: true,
      });

      setSubmissionSuccess({
        id: res.applicationId,
        positionTitle: res.positionTitle,
        message: res.message,
      });
      setFullName('');
      setEmail('');
      setPhone('');
      setJobSelection('general');
      setEducationExperience('');
      setCoverLetter('');
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      setFormError(err.message || 'Unable to submit application. Please verify all fields.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '40px 0 28px' }}>
      <div className="container">
        {/* Visual Split Hero */}
        <div className="hero-stage" style={{ marginBottom: 36 }}>
          <div className="hero-glow-orb-1" />
          <div className="grid-2" style={{ alignItems: 'center', gap: 36, position: 'relative', zIndex: 2 }}>
            <div className="animate-fade-up">
              <span className="badge badge-info" style={{ marginBottom: 14 }}>
                <Sparkles size={14} />
                Careers at AI Square IT Solutions
              </span>
              <h1 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', marginBottom: 14 }}>
                Join Our AI Evaluation &amp; Quality Team
              </h1>
              <p style={{ margin: '0 0 22px', color: 'var(--text-body)', fontSize: '1.02rem' }}>
                We welcome detail-oriented analytical thinkers across AI evaluation, search quality,
                response review, data annotation, content evaluation, and AI QA. Apply to an open
                listing or submit a general application below.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSelectPosition('general')}
              >
                Apply Now
                <ArrowDown size={16} />
              </button>
            </div>

            <div className="hero-visual-frame animate-float">
              <img
                src="/images/careers-team.png"
                alt="AI Square IT Solutions evaluator careers and quality badge"
              />
            </div>
          </div>
        </div>

        {/* Open Vacancies Section */}
        <section style={{ marginBottom: 40 }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
              marginBottom: 18,
            }}
          >
            <h2 style={{ fontSize: '1.45rem', margin: 0 }}>Published Open Positions</h2>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => handleSelectPosition('general')}
            >
              Submit General Application
              <ArrowDown size={15} />
            </button>
          </div>

          {loadingJobs ? (
            <div className="neu-card-compact">Loading published vacancies...</div>
          ) : jobsError ? (
            <div className="alert alert-error">{jobsError}</div>
          ) : jobs.length === 0 ? (
            <div className="neu-panel-inset" style={{ padding: 26 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <Briefcase size={20} color="var(--accent-primary)" />
                <strong style={{ color: 'var(--text-primary)' }}>
                  General Applications Open for Upcoming Roles
                </strong>
              </div>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.94rem' }}>
                No role-specific listings are currently published. Candidates interested in future
                evaluator opportunities can submit a <strong>General Application</strong> below.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 20 }}>
              {jobs.map((job) => (
                <div key={job.id} className="neu-card">
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: 14,
                      marginBottom: 14,
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.28rem', marginBottom: 6 }}>{job.title}</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {job.employmentType && (
                          <span className="badge badge-info">{job.employmentType}</span>
                        )}
                        {job.locationNote && (
                          <span className="badge badge-neutral">{job.locationNote}</span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => handleSelectPosition(job.id)}
                    >
                      Apply for This Position
                    </button>
                  </div>

                  <p style={{ color: 'var(--text-body)', marginBottom: 14 }}>{job.description}</p>

                  <div className="grid-2" style={{ gap: 16 }}>
                    {job.responsibilities && (
                      <div className="neu-panel-inset" style={{ padding: 14 }}>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: 6 }}>Responsibilities</h4>
                        <p style={{ margin: 0, fontSize: '0.88rem', whiteSpace: 'pre-line' }}>
                          {job.responsibilities}
                        </p>
                      </div>
                    )}
                    {job.qualifications && (
                      <div className="neu-panel-inset" style={{ padding: 14 }}>
                        <h4 style={{ fontSize: '0.9rem', marginBottom: 6 }}>Required Qualifications</h4>
                        <p style={{ margin: 0, fontSize: '0.88rem', whiteSpace: 'pre-line' }}>
                          {job.qualifications}
                        </p>
                      </div>
                    )}
                  </div>

                  {(job.skills || job.applicationInstructions) && (
                    <div style={{ marginTop: 14, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      {job.skills && (
                        <div style={{ marginBottom: 4 }}>
                          <strong style={{ color: 'var(--text-primary)' }}>Relevant Skills:</strong>{' '}
                          {job.skills}
                        </div>
                      )}
                      {job.applicationInstructions && (
                        <div>
                          <strong style={{ color: 'var(--text-primary)' }}>Application Instructions:</strong>{' '}
                          {job.applicationInstructions}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Candidate Application Form */}
        <section ref={formRef}>
          <div className="neu-card">
            <h2 style={{ fontSize: '1.45rem', marginBottom: 6 }}>Candidate Application Form</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 22, fontSize: '0.94rem' }}>
              Candidate details and uploaded resumes are stored privately and restricted to
              authorized AI Square IT Solutions administrators.
            </p>

            {formError && (
              <div className="alert alert-error" role="alert">
                <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 2 }} />
                <span>{formError}</span>
              </div>
            )}

            {submissionSuccess && (
              <div className="alert alert-success" role="status">
                <CheckCircle2 size={20} style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <strong>
                    Application Saved (#{submissionSuccess.id} — {submissionSuccess.positionTitle})
                  </strong>
                  <div style={{ marginTop: 4 }}>{submissionSuccess.message}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid-2" style={{ gap: 18 }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="app-name">Full Name *</label>
                  <input
                    id="app-name"
                    type="text"
                    className="neu-input"
                    placeholder="Enter your full legal name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="app-email">Email Address *</label>
                  <input
                    id="app-email"
                    type="email"
                    className="neu-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid-2" style={{ gap: 18 }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="app-phone">Phone Number *</label>
                  <input
                    id="app-phone"
                    type="tel"
                    className="neu-input"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="app-position">Position Applied For *</label>
                  <select
                    id="app-position"
                    className="neu-select"
                    value={jobSelection}
                    onChange={(e) => setJobSelection(e.target.value)}
                  >
                    <option value="general">General Application — Future Opportunities</option>
                    {jobs.map((job) => (
                      <option key={job.id} value={String(job.id)}>
                        {job.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="app-edu">
                  Education &amp; Relevant Experience *
                </label>
                <textarea
                  id="app-edu"
                  className="neu-textarea"
                  placeholder="Summarize your educational background, analytical or language skills, and relevant work experience..."
                  value={educationExperience}
                  onChange={(e) => setEducationExperience(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="app-resume">
                  Resume / CV Upload * (.pdf, .doc, .docx — max 5 MB)
                </label>
                <div className="neu-panel-inset" style={{ padding: 16 }}>
                  <input
                    ref={fileInputRef}
                    id="app-resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileChange}
                    required
                  />
                  {resumeFile && (
                    <div
                      style={{
                        marginTop: 10,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: '0.86rem',
                        color: 'var(--status-success-text)',
                      }}
                    >
                      <FileText size={16} />
                      <span>
                        Selected: <strong>{resumeFile.name}</strong> ({(resumeFile.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="app-cover">
                  Cover Letter / Additional Information (Optional)
                </label>
                <textarea
                  id="app-cover"
                  className="neu-textarea"
                  style={{ minHeight: 90 }}
                  placeholder="Optional availability notes or supporting context..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                />
              </div>

              <div style={{ marginTop: 12 }}>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  <Upload size={17} />
                  {submitting ? 'Uploading & Saving Application...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
