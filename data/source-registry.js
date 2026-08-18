/**
 * Official public sources for Legislation Watch data.
 * Use this registry when manually refreshing data/real-data.js.
 *
 * Priority order matches the 75% “upcoming / open for input” focus.
 */

/** @typedef {"primary" | "secondary" | "state"} SourceTier */

/**
 * @typedef {Object} OfficialSource
 * @property {string} id
 * @property {SourceTier} tier
 * @property {string} label
 * @property {string} url
 * @property {string} useFor
 */

export const OFFICIAL_SOURCES = [
  {
    id: "aph-submissions-open",
    tier: "primary",
    label: "APH — Inquiries accepting submissions",
    url: "https://www.aph.gov.au/Parliamentary_Business/Committees/Submissions_Open",
    useFor: "All federal committee inquiries currently accepting public submissions (ordered by closing date)."
  },
  {
    id: "aph-submissions-closing",
    tier: "primary",
    label: "APH — Submissions closing soon",
    url: "https://www.aph.gov.au/Parliamentary_Business/Committees/Submissions_Closing",
    useFor: "Inquiries with submission deadlines in the next two weeks; use for “closing soon” highlighting."
  },
  {
    id: "aph-bills",
    tier: "primary",
    label: "APH — Bills and legislation",
    url: "https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation",
    useFor: "Current bills before Parliament; cross-reference with committee inquiry pages for open submissions."
  },
  {
    id: "aph-online-submission",
    tier: "primary",
    label: "APH — Lodge a committee submission",
    url: "https://www.aph.gov.au/Parliamentary_Business/Committees/OnlineSubmission",
    useFor: "Generic federal parliamentary submission portal (individual inquiry pages are preferred for howToParticipate)."
  },
  {
    id: "treasury-consult",
    tier: "primary",
    label: "Treasury consultation hub",
    url: "https://consult.treasury.gov.au/",
    useFor: "Open federal Treasury exposure drafts and departmental consultations."
  },
  {
    id: "treasury-consult-alt",
    tier: "primary",
    label: "Treasury — Consultation (treasury.gov.au)",
    url: "https://treasury.gov.au/consultation",
    useFor: "Alternate Treasury consultation listing; cross-check with consult.treasury.gov.au."
  },
  {
    id: "ag-consult",
    tier: "primary",
    label: "Attorney-General's consultations",
    url: "https://consultations.ag.gov.au/",
    useFor: "Open AG departmental consultations and statutory reviews."
  },
  {
    id: "health-consult",
    tier: "primary",
    label: "Department of Health, Disability and Ageing — consultations",
    url: "https://www.health.gov.au/resources/collections/consultations-and-reviews",
    useFor: "Health portfolio open consultations (add items when listed as open)."
  },
  {
    id: "dcceew-consult",
    tier: "primary",
    label: "DCCEEW — Have Your Say",
    url: "https://consult.dcceew.gov.au/",
    useFor: "Climate, energy, environment and water consultations."
  },
  {
    id: "legislation-gov-au",
    tier: "secondary",
    label: "Federal Register of Legislation",
    url: "https://www.legislation.gov.au/",
    useFor: "Authoritative text of enacted Acts and legislative instruments (past decisions section)."
  },
  {
    id: "legislation-api",
    tier: "secondary",
    label: "Federal Register of Legislation API",
    url: "https://api.prod.legislation.gov.au/v1/",
    useFor: "Programmatic lookup of enacted legislation (optional future automation)."
  },
  {
    id: "legislation-api-swagger",
    tier: "secondary",
    label: "Legislation API — Swagger docs",
    url: "https://api.prod.legislation.gov.au/swagger/index.html",
    useFor: "API documentation for legislation.gov.au."
  },
  {
    id: "nsw-have-your-say",
    tier: "state",
    label: "NSW Have Your Say",
    url: "https://www.nsw.gov.au/have-your-say",
    useFor: "All NSW Government public consultations (required listing portal)."
  },
  {
    id: "nsw-have-your-say-alt",
    tier: "state",
    label: "NSW Have Your Say (haveyoursay.nsw.gov.au)",
    url: "https://www.haveyoursay.nsw.gov.au/",
    useFor: "Alternate NSW consultation portal; cross-check with nsw.gov.au/have-your-say."
  },
  {
    id: "vic-engage",
    tier: "state",
    label: "Victoria Engage",
    url: "https://engage.vic.gov.au/",
    useFor: "Official Victorian Government online consultation platform."
  },
  {
    id: "qld-get-involved",
    tier: "state",
    label: "Queensland Get Involved",
    url: "https://www.getinvolved.qld.gov.au/",
    useFor: "Queensland government consultations hub."
  },
  {
    id: "qld-have-your-say",
    tier: "state",
    label: "Queensland Have Your Say",
    url: "https://www.qld.gov.au/have-your-say",
    useFor: "Queensland government consultations (primary listing for many open items)."
  },
  {
    id: "qld-tmr-yoursay",
    tier: "state",
    label: "Queensland Transport — Your Say",
    url: "https://www.yoursay-projects.tmr.qld.gov.au/",
    useFor: "Department-specific QLD transport consultations."
  },
  {
    id: "wa-dplh-consult",
    tier: "state",
    label: "WA Have Your Say (DPLH)",
    url: "https://haveyoursay.dplh.wa.gov.au/",
    useFor: "WA planning and major projects consultations; general WA consultations often via department pages or this hub."
  },
  {
    id: "sa-yoursay",
    tier: "state",
    label: "SA YourSAy",
    url: "https://yoursay.sa.gov.au/",
    useFor: "Official SA Government community engagement platform."
  },
  {
    id: "tas-justice-consult",
    tier: "state",
    label: "TAS Department of Justice — community consultation",
    url: "https://www.justice.tas.gov.au/community-consultation",
    useFor: "Tasmanian Justice portfolio consultations and regulatory proposals."
  },
  {
    id: "tas-planning-consult",
    tier: "state",
    label: "TAS State Planning — Have Your Say",
    url: "https://www.stateplanning.tas.gov.au/have-your-say",
    useFor: "Tasmanian planning consultations."
  },
  {
    id: "act-yoursay",
    tier: "state",
    label: "ACT YourSay Conversations",
    url: "https://www.yoursayconversations.act.gov.au/",
    useFor: "Official ACT Government online engagement (YourSay ACT / YourSay Conversations)."
  },
  {
    id: "nt-have-your-say",
    tier: "state",
    label: "NT Have Your Say",
    url: "https://haveyoursay.nt.gov.au/",
    useFor: "Official Northern Territory Government online engagement platform."
  }
];

/**
 * Manual refresh checklist (prototype — no automated scraper yet):
 * 1. Open aph-submissions-open and aph-submissions-closing; add/update/remove committee inquiries.
 * 2. Check treasury-consult and ag-consult open listings.
 * 3. Spot-check health-consult and dcceew-consult for new open items.
 * 4. For each inquiry, open the committee/consultation page and copy:
 *    - exact title, submissions close date, howToParticipate URL, submission count if shown.
 * 5. Update pastItems from legislation.gov.au and recent committee reports.
 * 6. Check each state/territory portal in REFRESH_CHECKLIST; add only confirmed open consultations.
 * 7. Set lastUpdated in data/real-data.js to today's date (ISO YYYY-MM-DD).
 */
export const REFRESH_CHECKLIST = [
  "aph-submissions-open",
  "aph-submissions-closing",
  "treasury-consult",
  "ag-consult",
  "legislation-gov-au",
  "nsw-have-your-say",
  "vic-engage",
  "qld-have-your-say",
  "wa-dplh-consult",
  "sa-yoursay",
  "tas-justice-consult",
  "act-yoursay",
  "nt-have-your-say"
];

export default { OFFICIAL_SOURCES, REFRESH_CHECKLIST };
