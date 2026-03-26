export const agentsData = [
  {
    id: 'v1',
    name: 'Aria Voice',
    cat: 'Voice Agent',
    desc: 'Natural-sounding AI that handles inbound/outbound calls with human-like conversation.',
    icon: '🎙️',
    price: '$49/mo',
    rating: 4.9,
    calls: '12k+',
    badge: 'Popular',
    tags: ['Real-time transcription', 'Sentiment detection', 'CRM sync']
  },
  {
    id: 'c1',
    name: 'Dialer X',
    cat: 'Calling Agent',
    desc: 'Automated outbound calling for sales teams. Qualifies leads and books meetings at scale.',
    icon: '📞',
    price: '$79/mo',
    rating: 4.8,
    calls: '34k+',
    badge: 'Top Rated',
    tags: ['Smart dialing', 'Objection handling', 'Call recording']
  },
  {
    id: 'r1',
    name: 'TableBot',
    cat: 'Restaurant',
    desc: 'AI agent for restaurants handling reservations, menu inquiries, and order taking 24/7.',
    icon: '🍽️',
    price: '$29/mo',
    rating: 4.7,
    calls: '8k+',
    badge: '',
    tags: ['Reservation management', 'Menu Q&A', 'Wait times']
  },
  {
    id: 'a1',
    name: 'BookSmart',
    cat: 'Appointment',
    desc: 'Intelligent scheduling agent that books, reschedules and confirms appointments automatically.',
    icon: '📅',
    price: '$39/mo',
    rating: 4.9,
    calls: '19k+',
    badge: 'New',
    tags: ['Calendar integration', 'Reminders', 'Multi-timezone']
  },
  {
    id: 's1',
    name: 'HelpFlow',
    cat: 'Support',
    desc: 'Tier-1 support agent that resolves 80% of tickets automatically before escalating.',
    icon: '🤖',
    price: '$59/mo',
    rating: 4.6,
    calls: '52k+',
    badge: '',
    tags: ['Ticket triage', 'Knowledge base', 'Escalation logic']
  },
  {
    id: 'sl1',
    name: 'CloserAI',
    cat: 'Sales',
    desc: 'AI sales agent that follows up with leads, nurtures prospects and closes deals.',
    icon: '💼',
    price: '$99/mo',
    rating: 4.8,
    calls: '7k+',
    badge: 'Enterprise',
    tags: ['Lead scoring', 'Follow-up sequences', 'Deal forecasting']
  }
];

export const categories = ['All', 'Voice Agent', 'Calling Agent', 'Restaurant', 'Appointment', 'Support', 'Sales'];

export const stepsData = [
  {
    num: '01',
    icon: '🔍',
    title: 'Browse the Marketplace',
    desc: 'Explore 2,400+ pre-built AI agents across every category. Filter by use case, industry, or capability.'
  },
  {
    num: '02',
    icon: '⚙️',
    title: 'Configure & Customize',
    desc: 'Set your agent\'s persona, knowledge base, and behaviors through our no-code studio. No engineering needed.'
  },
  {
    num: '03',
    icon: '🔗',
    title: 'Connect Your Stack',
    desc: 'Integrate with your CRM, calendar, phone system, or 150+ tools with one-click connectors.'
  },
  {
    num: '04',
    icon: '⚡',
    title: 'Go Live in Minutes',
    desc: 'Deploy your agent with one click. It scales instantly and runs 24/7 with 99.9% uptime.'
  }
];

export const useCasesData = [
  {
    id: 'rest',
    icon: '🍽️',
    label: 'Restaurants',
    headline: 'Never miss a reservation again',
    desc: 'Your AI host takes reservations, answers menu questions, manages waitlists — 24/7 without lifting a finger. Integrates with OpenTable, Resy, and your POS.',
    color: '#ffffff',
    m1: '+34%',
    ml1: 'Bookings increase',
    m2: '6hrs',
    ml2: 'Staff time saved/day',
    feats: ['24/7 phone answering', 'Real-time availability', 'Special requests handling', 'Automated reminders']
  },
  {
    id: 'med',
    icon: '🏥',
    label: 'Healthcare',
    headline: 'Reduce no-shows by 60%',
    desc: 'AI appointment agent handles scheduling, confirmations, and rescheduling across your entire practice. Sends personalized reminders automatically.',
    color: '#ffffff',
    m1: '60%',
    ml1: 'No-show reduction',
    m2: '4hrs',
    ml2: 'Scheduling saved/day',
    feats: ['HIPAA compliant', 'EHR integration', 'Multi-location support', 'Insurance verification']
  },
  {
    id: 'sales',
    icon: '💼',
    label: 'Sales Teams',
    headline: '10x your outreach capacity',
    desc: 'Deploy an AI calling agent that qualifies leads, handles objections, and books meetings into your reps\' calendars — 24/7 across any timezone.',
    color: '#ffffff',
    m1: '+10x',
    ml1: 'Meetings booked',
    m2: '-70%',
    ml2: 'Cost per meeting',
    feats: ['Smart call routing', 'CRM auto-logging', 'Sentiment analysis', 'Live handoff']
  },
  {
    id: 're',
    icon: '🏠',
    label: 'Real Estate',
    headline: 'Follow up on every lead instantly',
    desc: 'Never let a hot lead go cold. Your AI agent calls every inquiry within 60 seconds, qualifies them, and schedules showings on autopilot.',
    color: '#ffffff',
    m1: '<60s',
    ml1: 'Lead response time',
    m2: '+28%',
    ml2: 'Conversion lift',
    feats: ['MLS integration', 'Showing scheduler', 'Lead scoring', 'Virtual tours']
  }
];

export const plansData = [
  {
    name: 'Starter',
    mo: 29,
    an: 23,
    desc: 'Perfect for small businesses trying AI for the first time.',
    color: '#ffffff',
    feats: ['1 AI Agent', '500 interactions/mo', 'Email support', 'Basic analytics', '5 integrations'],
    cta: 'Start Free Trial',
    hi: false
  },
  {
    name: 'Pro',
    mo: 99,
    an: 79,
    desc: 'For growing teams that need multiple agents and deeper insights.',
    color: '#ffffff',
    feats: ['5 AI Agents', '10,000 interactions/mo', 'Priority support', 'Advanced analytics', '50+ integrations', 'Custom personas', 'A/B testing'],
    cta: 'Get Started',
    hi: true,
    badge: 'Most Popular'
  },
  {
    name: 'Enterprise',
    mo: 349,
    an: 279,
    desc: 'Unlimited power for companies running AI at scale.',
    color: '#ffffff',
    feats: ['Unlimited Agents', 'Unlimited interactions', '24/7 dedicated support', 'Enterprise analytics', '150+ integrations', 'White-label', 'SLA guarantee', 'Custom training'],
    cta: 'Contact Sales',
    hi: false
  }
];

export const testimonialsData = [
  {
    stars: 5,
    text: '"We deployed TableBot in 20 minutes and saw a 40% jump in reservations the first week. It just works."',
    name: 'Maria Santos',
    role: 'Owner, Bella Cucina',
    avatar: '👩‍🍳'
  },
  {
    stars: 5,
    text: '"CloserAI books 3x more discovery calls than our SDR team did manually. ROI was visible in week one."',
    name: 'James Tran',
    role: 'VP Sales, GrowthLabs',
    avatar: '👨‍💼'
  },
  {
    stars: 5,
    text: '"The no-show rate at our clinic dropped 58% in the first month. Absolutely incredible product."',
    name: 'Dr. Priya Mehta',
    role: 'Director, ClearPath Health',
    avatar: '👩‍⚕️'
  }
];

export const marqueeItems = ['Voice Agents', 'Calling Agents', 'Restaurant Bots', 'Appointment AI', 'Customer Support', 'Sales Automation', 'Lead Generation', 'Healthcare AI', 'Legal Assistants', 'Real Estate Agents'];