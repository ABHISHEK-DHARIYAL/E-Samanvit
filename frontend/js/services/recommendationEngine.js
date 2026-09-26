/* ============================================================
   e-Samanvit - Recommendation Engine (content-based, not a
   trained model)

   This is the approach discussed for the Dashboard's "Recommended
   For You" panel: with no usage history yet, a trained ML model
   (collaborative filtering) has nothing to learn from. Instead this
   scores each service against the logged-in citizen's own profile —
   annual income, mainly, since that's the structured field we
   actually have — using explicit, readable rules. That keeps every
   recommendation explainable ("why am I seeing this") instead of a
   black box, which matters more for a hackathon demo/judging than a
   real ML pipeline would at this stage.

   HONEST LIMITATION: SERVICE_RULES below is a demo rule set authored
   for this prototype, not sourced from official eligibility notices —
   the schemas themselves already say to "verify the current limit"
   for the income-ceiling schemes. Treat the numbers as illustrative.

   HOW TO EXTEND: each entry in SERVICE_RULES is independent — add a
   new serviceId with its own maxAnnualIncome/tags/reason to cover a
   new scheme, or add a genuinely new signal (e.g. category, land
   ownership) once that data exists on the citizen profile, without
   touching the scoring loop below.
   ============================================================ */

const RecommendationEngine = (function () {
  // Demo-only eligibility hints per service. `maxAnnualIncome`, where
  // present, is the income ceiling this prototype assumes for that
  // scheme; `baseScore` is how relevant the service is to a citizen
  // with no distinguishing profile field for it at all (e.g. no
  // category/land data yet), so it still shows up rather than being
  // hidden.
  const SERVICE_RULES = {
    'mahadbt-post-matric-scholarship': {
      maxAnnualIncome: 250000,
      baseScore: 40,
      matchReason: (income) => `Family income ₹${income.toLocaleString('en-IN')} is within this scheme's demo income ceiling (₹2,50,000).`,
      noMatchReason: () => `Family income is above this scheme's demo income ceiling — may still be worth checking the official limit.`
    },
    'ebc-scholarship': {
      maxAnnualIncome: 800000,
      baseScore: 45,
      matchReason: (income) => `Family income ₹${income.toLocaleString('en-IN')} is within EBC's demo income ceiling (₹8,00,000).`,
      noMatchReason: () => `Family income is above this scheme's demo income ceiling — may still be worth checking the official limit.`
    },
    'nsp-scholarship': {
      baseScore: 55,
      matchReason: () => `Open, merit-based central scholarship — worth applying regardless of income.`
    },
    'scholarship-application': {
      baseScore: 50,
      matchReason: () => `General merit/means-based scholarship for enrolled students.`
    },
    'income-certificate': {
      baseScore: 60,
      matchReason: () => `A widely-needed document — most other applications ask for this.`
    },
    'farmer-welfare-scheme': {
      baseScore: 30,
      matchReason: () => `Income-support scheme for landholding families — relevant if you or your household farms.`
    },
    'land-record-service': {
      baseScore: 25,
      matchReason: () => `Useful if you need your 7/12 extract for any other application.`
    }
  };

  const DEFAULT_RULE = {
    baseScore: 35,
    matchReason: () => `A government service you haven't applied for yet.`
  };

  /** Scores one service for one citizen. Higher = more relevant.
   *  Never returns a negative/zero score — everything stays visible,
   *  just re-ordered, so nothing is hidden from the citizen. */
  function score(service, user) {
    const rule = SERVICE_RULES[service.serviceId] || DEFAULT_RULE;
    const income = user && user.income && typeof user.income.annualIncome === 'number'
      ? user.income.annualIncome
      : null;

    if (rule.maxAnnualIncome != null && income != null) {
      if (income <= rule.maxAnnualIncome) {
        return { value: rule.baseScore + 30, reason: rule.matchReason(income) };
      }
      return { value: Math.max(rule.baseScore - 20, 5), reason: rule.noMatchReason ? rule.noMatchReason() : 'May not meet this scheme\'s income criteria.' };
    }

    return { value: rule.baseScore, reason: rule.matchReason(income || 0) };
  }

  /** Ranks a list of services (highest score first) for the given
   *  citizen. Returns the same service objects with `._recommendation`
   *  ({ score, reason }) attached — callers that don't care about the
   *  reason can ignore the extra field. */
  function rank(services, user) {
    return services
      .map((s) => ({ ...s, _recommendation: (() => { const r = score(s, user); return { score: r.value, reason: r.reason }; })() }))
      .sort((a, b) => b._recommendation.score - a._recommendation.score);
  }

  return { score, rank };
})();
