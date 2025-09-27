interface Env {
  DB: D1Database;
}

interface Lead {
  name: string;
  email: string;
  phone?: string;
  service_type?: string;
  insurance_provider?: string;
  preferred_contact?: string;
  message?: string;
  source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  utm_source?: string;
}

interface AnalyticsEvent {
  event_type: string;
  event_data?: any;
  page_url?: string;
  utm_campaign?: string;
  utm_medium?: string;
  utm_source?: string;
}

interface Review {
  patient_name: string;
  rating: number;
  review_text?: string;
  service_type?: string;
  treatment_date?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Enable CORS
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Project-Id, X-Encrypted-Yw-ID, X-Is-Login, X-Yw-Env',
    };

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const url = new URL(request.url);
      const path = url.pathname;
      const method = request.method;

      // Extract user info from headers
      const encryptedYwId = request.headers.get('X-Encrypted-Yw-ID');
      const isLogin = request.headers.get('X-Is-Login') === '1';

      // Lead Management Endpoints
      if (path === '/api/leads' && method === 'POST') {
        return await createLead(request, env, encryptedYwId);
      }

      if (path === '/api/leads' && method === 'GET') {
        return await getLeads(request, env);
      }

      if (path.startsWith('/api/leads/') && method === 'PUT') {
        const leadId = path.split('/')[3];
        return await updateLeadStatus(request, env, leadId);
      }

      // Analytics Endpoints
      if (path === '/api/analytics/track' && method === 'POST') {
        return await trackEvent(request, env);
      }

      if (path === '/api/analytics/dashboard' && method === 'GET') {
        return await getAnalyticsDashboard(request, env);
      }

      // Reviews Endpoints
      if (path === '/api/reviews' && method === 'POST') {
        return await createReview(request, env, encryptedYwId);
      }

      if (path === '/api/reviews' && method === 'GET') {
        return await getReviews(request, env);
      }

      if (path.startsWith('/api/reviews/') && path.endsWith('/approve') && method === 'PUT') {
        const reviewId = path.split('/')[3];
        return await approveReview(request, env, reviewId);
      }

      // City Pages Endpoints
      if (path === '/api/city-pages' && method === 'GET') {
        return await getCityPages(request, env);
      }

      if (path.startsWith('/api/city-pages/') && method === 'GET') {
        const cityName = path.split('/')[3];
        return await getCityPage(request, env, cityName);
      }

      // Google Ads Campaign Data
      if (path === '/api/campaigns' && method === 'GET') {
        return await getCampaignData(request, env);
      }

      return new Response('Not Found', { status: 404, headers: corsHeaders });

    } catch (error) {
      console.error('API Error:', error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Internal server error',
          message: error instanceof Error ? error.message : 'Unknown error'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
  },
};

// Lead Management Functions
async function createLead(request: Request, env: Env, encryptedYwId: string | null): Promise<Response> {
  try {
    const leadData: Lead = await request.json();
    
    // Validate required fields
    if (!leadData.name || !leadData.email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name and email are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Calculate lead score based on data completeness and source
    let leadScore = 0;
    if (leadData.phone) leadScore += 20;
    if (leadData.insurance_provider) leadScore += 15;
    if (leadData.service_type) leadScore += 10;
    if (leadData.message && leadData.message.length > 50) leadScore += 15;
    if (leadData.utm_source === 'google-ads') leadScore += 25;
    else if (leadData.utm_source === 'organic') leadScore += 20;

    const stmt = env.DB.prepare(`
      INSERT INTO leads (
        encrypted_yw_id, name, email, phone, service_type, 
        insurance_provider, preferred_contact, message, source,
        utm_campaign, utm_medium, utm_source, lead_score
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = await stmt.bind(
      encryptedYwId,
      leadData.name,
      leadData.email,
      leadData.phone || null,
      leadData.service_type || null,
      leadData.insurance_provider || null,
      leadData.preferred_contact || 'email',
      leadData.message || null,
      leadData.source || 'website',
      leadData.utm_campaign || null,
      leadData.utm_medium || null,
      leadData.utm_source || null,
      leadScore
    ).run();

    return new Response(
      JSON.stringify({ 
        success: true, 
        leadId: result.meta.last_row_id,
        leadScore: leadScore
      }),
      { 
        status: 201, 
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      }
    );

  } catch (error) {
    console.error('Create lead error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to create lead' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function getLeads(request: Request, env: Env): Promise<Response> {
  try {
    const url = new URL(request.url);
    const status = url.searchParams.get('status') || 'all';
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    let query = `
      SELECT id, name, email, phone, service_type, insurance_provider,
             source, utm_campaign, utm_medium, utm_source, lead_score,
             status, created_at
      FROM leads
    `;

    const params: any[] = [];
    
    if (status !== 'all') {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY lead_score DESC, created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const stmt = env.DB.prepare(query);
    const { results } = await stmt.bind(...params).all();

    return new Response(
      JSON.stringify({ success: true, leads: results }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );

  } catch (error) {
    console.error('Get leads error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch leads' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function updateLeadStatus(request: Request, env: Env, leadId: string): Promise<Response> {
  try {
    const { status } = await request.json();
    
    if (!['new', 'contacted', 'qualified', 'converted', 'closed'].includes(status)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid status' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const stmt = env.DB.prepare(`
      UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `);

    await stmt.bind(status, leadId).run();

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );

  } catch (error) {
    console.error('Update lead status error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to update lead status' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Analytics Functions
async function trackEvent(request: Request, env: Env): Promise<Response> {
  try {
    const eventData: AnalyticsEvent = await request.json();
    
    if (!eventData.event_type) {
      return new Response(
        JSON.stringify({ success: false, error: 'Event type is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const userAgent = request.headers.get('User-Agent');
    const referrer = request.headers.get('Referer');
    const cfConnectingIp = request.headers.get('CF-Connecting-IP');

    const stmt = env.DB.prepare(`
      INSERT INTO analytics_events (
        event_type, event_data, user_agent, ip_address, referrer,
        page_url, utm_campaign, utm_medium, utm_source
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    await stmt.bind(
      eventData.event_type,
      eventData.event_data ? JSON.stringify(eventData.event_data) : null,
      userAgent,
      cfConnectingIp,
      referrer,
      eventData.page_url || null,
      eventData.utm_campaign || null,
      eventData.utm_medium || null,
      eventData.utm_source || null
    ).run();

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );

  } catch (error) {
    console.error('Track event error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to track event' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function getAnalyticsDashboard(request: Request, env: Env): Promise<Response> {
  try {
    // Get lead conversion metrics
    const leadStatsStmt = env.DB.prepare(`
      SELECT 
        COUNT(*) as total_leads,
        COUNT(CASE WHEN status = 'converted' THEN 1 END) as converted_leads,
        AVG(lead_score) as avg_lead_score,
        COUNT(CASE WHEN created_at >= date('now', '-7 days') THEN 1 END) as weekly_leads
      FROM leads
    `);
    const leadStats = await leadStatsStmt.first();

    // Get top traffic sources
    const trafficStmt = env.DB.prepare(`
      SELECT utm_source, COUNT(*) as count
      FROM analytics_events
      WHERE utm_source IS NOT NULL AND created_at >= date('now', '-30 days')
      GROUP BY utm_source
      ORDER BY count DESC
      LIMIT 10
    `);
    const { results: trafficSources } = await trafficStmt.all();

    // Get event type breakdown
    const eventsStmt = env.DB.prepare(`
      SELECT event_type, COUNT(*) as count
      FROM analytics_events
      WHERE created_at >= date('now', '-7 days')
      GROUP BY event_type
      ORDER BY count DESC
    `);
    const { results: eventTypes } = await eventsStmt.all();

    return new Response(
      JSON.stringify({
        success: true,
        dashboard: {
          leadStats,
          trafficSources,
          eventTypes,
          conversionRate: leadStats.converted_leads / (leadStats.total_leads || 1) * 100
        }
      }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );

  } catch (error) {
    console.error('Get analytics dashboard error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch analytics' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Reviews Functions
async function createReview(request: Request, env: Env, encryptedYwId: string | null): Promise<Response> {
  try {
    const reviewData: Review = await request.json();
    
    if (!reviewData.patient_name || !reviewData.rating) {
      return new Response(
        JSON.stringify({ success: false, error: 'Patient name and rating are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (reviewData.rating < 1 || reviewData.rating > 5) {
      return new Response(
        JSON.stringify({ success: false, error: 'Rating must be between 1 and 5' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const stmt = env.DB.prepare(`
      INSERT INTO reviews (
        encrypted_yw_id, patient_name, rating, review_text,
        service_type, treatment_date, verified
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = await stmt.bind(
      encryptedYwId,
      reviewData.patient_name,
      reviewData.rating,
      reviewData.review_text || null,
      reviewData.service_type || null,
      reviewData.treatment_date || null,
      encryptedYwId ? 1 : 0 // Mark as verified if user is logged in
    ).run();

    return new Response(
      JSON.stringify({ 
        success: true, 
        reviewId: result.meta.last_row_id
      }),
      { 
        status: 201, 
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      }
    );

  } catch (error) {
    console.error('Create review error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to create review' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function getReviews(request: Request, env: Env): Promise<Response> {
  try {
    const url = new URL(request.url);
    const approved = url.searchParams.get('approved') !== 'false';
    const limit = parseInt(url.searchParams.get('limit') || '20');

    let query = `
      SELECT id, patient_name, rating, review_text, service_type,
             treatment_date, verified, approved, created_at
      FROM reviews
    `;

    if (approved) {
      query += ' WHERE approved = 1';
    }

    query += ' ORDER BY created_at DESC LIMIT ?';

    const stmt = env.DB.prepare(query);
    const { results } = await stmt.bind(limit).all();

    return new Response(
      JSON.stringify({ success: true, reviews: results }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );

  } catch (error) {
    console.error('Get reviews error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch reviews' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function approveReview(request: Request, env: Env, reviewId: string): Promise<Response> {
  try {
    const { approved } = await request.json();

    const stmt = env.DB.prepare(`
      UPDATE reviews SET approved = ? WHERE id = ?
    `);

    await stmt.bind(approved ? 1 : 0, reviewId).run();

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );

  } catch (error) {
    console.error('Approve review error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to approve review' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// City Pages Functions
async function getCityPages(request: Request, env: Env): Promise<Response> {
  try {
    const stmt = env.DB.prepare(`
      SELECT city_name, state_code, page_title, meta_description,
             population, published, updated_at
      FROM city_pages
      WHERE published = 1
      ORDER BY city_name
    `);

    const { results } = await stmt.all();

    return new Response(
      JSON.stringify({ success: true, cityPages: results }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );

  } catch (error) {
    console.error('Get city pages error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch city pages' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function getCityPage(request: Request, env: Env, cityName: string): Promise<Response> {
  try {
    const stmt = env.DB.prepare(`
      SELECT * FROM city_pages WHERE city_name = ? AND published = 1
    `);

    const cityPage = await stmt.bind(cityName).first();

    if (!cityPage) {
      return new Response(
        JSON.stringify({ success: false, error: 'City page not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, cityPage }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );

  } catch (error) {
    console.error('Get city page error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch city page' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function getCampaignData(request: Request, env: Env): Promise<Response> {
  try {
    // ZocDoc-style campaign performance data
    const campaigns = {
      google_ads: {
        keywords: [
          { keyword: "find psychiatrist online north carolina", cpc: 4.25, quality_score: 8, impressions: 1250 },
          { keyword: "book appointment psychiatrist NC", cpc: 5.10, quality_score: 9, impressions: 980 },
          { keyword: "same day psychiatrist appointment", cpc: 6.75, quality_score: 7, impressions: 2100 },
          { keyword: "ADHD treatment online NC", cpc: 3.95, quality_score: 8, impressions: 1580 },
          { keyword: "telepsychiatry north carolina", cpc: 4.80, quality_score: 9, impressions: 890 },
          { keyword: "online psychiatrist raleigh", cpc: 5.25, quality_score: 8, impressions: 750 },
          { keyword: "psychiatrist near me NC", cpc: 4.15, quality_score: 7, impressions: 1920 },
          { keyword: "depression therapy online", cpc: 3.75, quality_score: 9, impressions: 1100 },
          { keyword: "anxiety help telehealth NC", cpc: 4.50, quality_score: 8, impressions: 860 }
        ],
        budget_recommendations: {
          high_intent: ["book appointment psychiatrist NC", "same day psychiatrist appointment"],
          location_based: ["online psychiatrist raleigh", "psychiatrist near me NC"],
          condition_specific: ["ADHD treatment online NC", "depression therapy online"],
          brand_building: ["telepsychiatry north carolina"]
        }
      }
    };

    return new Response(
      JSON.stringify({ success: true, campaigns }),
      { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
    );

  } catch (error) {
    console.error('Get campaign data error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch campaign data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}