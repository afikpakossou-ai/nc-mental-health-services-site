-- Lead Generation Schema for NC Telepsychiatry Practice

-- Leads table - stores contact form submissions and lead information
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  encrypted_yw_id TEXT,                    -- User ID from Youware platform
  name TEXT NOT NULL,                      -- Patient name
  email TEXT NOT NULL,                     -- Contact email
  phone TEXT,                              -- Phone number
  service_type TEXT,                       -- Type of service requested
  insurance_provider TEXT,                 -- Insurance information
  preferred_contact TEXT,                  -- Phone, email, or text preference
  message TEXT,                            -- Additional notes from patient
  source TEXT,                             -- Lead source (website, ads, etc.)
  utm_campaign TEXT,                       -- Marketing campaign tracking
  utm_medium TEXT,                         -- Marketing medium tracking
  utm_source TEXT,                         -- Marketing source tracking
  lead_score INTEGER DEFAULT 0,           -- Lead quality scoring
  status TEXT DEFAULT 'new',              -- Lead status (new, contacted, converted, etc.)
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
) STRICT;

-- Analytics events table - tracks user behavior and conversions
CREATE TABLE IF NOT EXISTS analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL,               -- phone_call, form_submission, cta_click, etc.
  event_data TEXT,                        -- JSON data for the event
  user_agent TEXT,                        -- Browser information
  ip_address TEXT,                        -- User IP for geographic analysis
  referrer TEXT,                          -- Referring page/site
  page_url TEXT,                          -- Page where event occurred
  utm_campaign TEXT,                      -- Campaign tracking
  utm_medium TEXT,                        -- Medium tracking
  utm_source TEXT,                        -- Source tracking
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
) STRICT;

-- Reviews table - patient testimonials and feedback
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  encrypted_yw_id TEXT,                   -- User ID from Youware platform
  patient_name TEXT NOT NULL,             -- Patient name (for display)
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5), -- 1-5 star rating
  review_text TEXT,                       -- Review content
  service_type TEXT,                      -- Service reviewed (ADHD, depression, etc.)
  treatment_date TEXT,                    -- Date of treatment
  verified INTEGER DEFAULT 0,            -- 1 if verified patient, 0 if not
  approved INTEGER DEFAULT 0,            -- 1 if approved for display, 0 if pending
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
) STRICT;

-- City-specific landing page data
CREATE TABLE IF NOT EXISTS city_pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city_name TEXT NOT NULL UNIQUE,         -- City name (Raleigh, Charlotte, etc.)
  state_code TEXT DEFAULT 'NC',          -- State code
  page_title TEXT,                       -- SEO optimized page title
  meta_description TEXT,                 -- Meta description
  hero_content TEXT,                     -- City-specific hero section content
  local_keywords TEXT,                   -- JSON array of local keywords
  population INTEGER,                    -- City population for content
  zip_codes TEXT,                        -- JSON array of zip codes served
  local_hospitals TEXT,                  -- JSON array of local hospitals/clinics
  published INTEGER DEFAULT 0,          -- 1 if page is live, 0 if draft
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
) STRICT;