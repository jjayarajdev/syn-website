-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  interest TEXT,
  message TEXT,
  submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
  user_agent TEXT,
  country TEXT
);

CREATE INDEX IF NOT EXISTS idx_submissions_submitted_at
  ON contact_submissions (submitted_at DESC);
