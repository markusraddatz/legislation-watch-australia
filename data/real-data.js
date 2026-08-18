/**
 * Data sourced from official Australian Parliament and government consultation pages.
 * Update regularly from the live sources listed in data/source-registry.js and README.md.
 *
 * SOURCES CHECKED (manual refresh):
 *   1. https://www.aph.gov.au/Parliamentary_Business/Committees/Submissions_Open
 *   2. https://www.aph.gov.au/Parliamentary_Business/Committees/Submissions_Closing
 *   3. https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation
 *   4. https://consult.treasury.gov.au/
 *   5. https://consultations.ag.gov.au/ (open consultations)
 *   6. https://www.legislation.gov.au/ (past Acts)
 *   7. State/territory portals — see stateCoverage.officialPortals and source-registry.js
 *
 * LAST UPDATED: 2026-08-18
 *
 * Refresh: see REFRESH_CHECKLIST in data/source-registry.js
 */

/** ISO date (YYYY-MM-DD) the real data was last checked against official sources. */
const lastUpdated = "2026-08-18";

const DATA_META = {
  lastUpdated,
  checkedBy: "manual",
  sourceRegistry: "./source-registry.js"
};

/** State and territory consultations — sourced from official “Have Your Say” portals. */
const stateCoverage = {
  integrated: true,
  message:
    "State and territory items are drawn from official consultation portals. Coverage grows as portals are monitored.",
  officialPortals: [
    { label: "NSW Have Your Say", url: "https://www.nsw.gov.au/have-your-say" },
    { label: "NSW Have Your Say (haveyoursay.nsw.gov.au)", url: "https://www.haveyoursay.nsw.gov.au/" },
    { label: "Victoria Engage", url: "https://engage.vic.gov.au/" },
    { label: "Queensland Get Involved", url: "https://www.getinvolved.qld.gov.au/" },
    { label: "Queensland Have Your Say", url: "https://www.qld.gov.au/have-your-say" },
    { label: "WA Have Your Say (DPLH)", url: "https://haveyoursay.dplh.wa.gov.au/" },
    { label: "SA YourSAy", url: "https://yoursay.sa.gov.au/" },
    { label: "TAS Justice consultations", url: "https://www.justice.tas.gov.au/community-consultation" },
    { label: "TAS Planning Have Your Say", url: "https://www.stateplanning.tas.gov.au/have-your-say" },
    { label: "ACT YourSay Conversations", url: "https://www.yoursayconversations.act.gov.au/" },
    { label: "NT Have Your Say", url: "https://haveyoursay.nt.gov.au/" }
  ]
};

const upcomingItems = [
  {
    id: "fed-phi-rebate-bill-2026",
    sourceId: "aph-submissions-closing",
    title: "Private Health Insurance Amendment (Modernising the Private Health Insurance Rebate) Bill 2026",
    jurisdiction: "Federal",
    type: "Committee Inquiry",
    status: "Accepting submissions until 21 August 2026",
    shortNeutralSummary:
      "On 25 June 2026 the Senate referred this Bill to the Community Affairs Legislation Committee for inquiry and report. " +
      "Submissions close 21 August 2026 and the committee reporting date is 7 October 2026. " +
      "The committee invites written submissions from individuals and organisations via its inquiry page.",
    keyDates: {
      introduced: "2026-06-25",
      opened: "2026-06-25",
      submissionsClose: "2026-08-21",
      reportingDate: "2026-10-07",
      nextStep: null
    },
    officialLinks: {
      billPage: "https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r7497",
      primaryDocument: null,
      howToParticipate: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Community_Affairs/PvteHealthIns",
      committeeOrConsultPage: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Community_Affairs/PvteHealthIns"
    },
    participantInfo: {
      submissionsReceived: 7,
      note: "Submissions published on the committee inquiry page"
    },
    topics: ["health", "insurance", "private-health"]
  },
  {
    id: "fed-wage-justice-ecec-bill-2026",
    sourceId: "aph-submissions-closing",
    title: "Wage Justice for Early Childhood Education and Care Workers (Special Account) (Extending Support and Strengthening Safety) Bill 2026",
    jurisdiction: "Federal",
    type: "Committee Inquiry",
    status: "Accepting submissions until 21 August 2026",
    shortNeutralSummary:
      "On 13 August 2026 the Senate referred this Bill to the Education and Employment Legislation Committee for inquiry and report. " +
      "Submissions close 21 August 2026 and the committee reporting date is 4 September 2026. " +
      "The committee is accepting written submissions via its inquiry page.",
    keyDates: {
      introduced: "2026-08-13",
      opened: "2026-08-13",
      submissionsClose: "2026-08-21",
      reportingDate: "2026-09-04",
      nextStep: null
    },
    officialLinks: {
      billPage: "https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r7529",
      primaryDocument: null,
      howToParticipate: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Education_and_Employment/WageJustice2026",
      committeeOrConsultPage: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Education_and_Employment/WageJustice2026"
    },
    participantInfo: null,
    topics: ["early-childhood", "education", "workforce"]
  },
  {
    id: "fed-cgt-negative-gearing-tranche-2",
    sourceId: "treasury-consult",
    title: "Capital Gains Tax and Negative Gearing – Tranche 2 Legislation",
    jurisdiction: "Federal",
    type: "Exposure Draft",
    status: "Open for submissions until 21 August 2026",
    shortNeutralSummary:
      "Treasury is consulting on draft legislation for the second tranche of capital gains tax and negative gearing reforms. " +
      "Stakeholders are invited to provide feedback on the exposure draft through the Treasury consultation hub. " +
      "Submissions must be lodged via the online consultation portal on consult.treasury.gov.au.",
    keyDates: {
      introduced: null,
      opened: null,
      submissionsClose: "2026-08-21",
      reportingDate: null,
      nextStep: "Feedback to inform finalisation of legislation"
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://consult.treasury.gov.au/c2026-792170",
      howToParticipate: "https://consult.treasury.gov.au/c2026-792170",
      committeeOrConsultPage: "https://consult.treasury.gov.au/c2026-792170"
    },
    participantInfo: null,
    topics: ["tax", "housing", "capital-gains"]
  },
  {
    id: "fed-foreign-terrorist-fighters-bill-2026",
    sourceId: "aph-submissions-open",
    title: "Protecting Australians from Foreign Terrorist Fighters Bill 2026",
    jurisdiction: "Federal",
    type: "Committee Inquiry",
    status: "Accepting submissions until 27 August 2026",
    shortNeutralSummary:
      "On 13 August 2026 the Senate referred this Bill to the Legal and Constitutional Affairs Legislation Committee for inquiry and report. " +
      "Submissions close 27 August 2026 and the committee reporting date is 7 September 2026. " +
      "Written submissions may be lodged via the committee inquiry page.",
    keyDates: {
      introduced: "2026-08-13",
      opened: "2026-08-13",
      submissionsClose: "2026-08-27",
      reportingDate: "2026-09-07",
      nextStep: null
    },
    officialLinks: {
      billPage: "https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=s1503",
      primaryDocument: null,
      howToParticipate: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Legal_and_Constitutional_Affairs/ForeignFighters48",
      committeeOrConsultPage: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Legal_and_Constitutional_Affairs/ForeignFighters48"
    },
    participantInfo: null,
    topics: ["national-security", "counter-terrorism", "law-enforcement"]
  },
  {
    id: "fed-dva-annual-report-2024-25",
    sourceId: "aph-submissions-closing",
    title: "Inquiry into the annual report of the Department of Veterans' Affairs 2024–25",
    jurisdiction: "Federal",
    type: "Committee Inquiry",
    status: "Accepting submissions until 28 August 2026",
    shortNeutralSummary:
      "The Parliamentary Joint Committee on Defence is inquiring into the Department of Veterans' Affairs annual report for 2024–25. " +
      "Focus areas include claims handling, Royal Commission implementation, legislative harmonisation, and the Defence and Veterans' Service Commission. " +
      "Submissions are requested by Friday 28 August 2026.",
    keyDates: {
      introduced: null,
      opened: "2026-07-01",
      submissionsClose: "2026-08-28",
      reportingDate: null,
      nextStep: "Committee inquiry in progress"
    },
    officialLinks: {
      billPage: null,
      primaryDocument: null,
      howToParticipate: "https://www.aph.gov.au/Parliamentary_Business/Committees/Joint/Parliamentary_Joint_Committee_on_Defence/DVAAR2024-25",
      committeeOrConsultPage: "https://www.aph.gov.au/Parliamentary_Business/Committees/Joint/Parliamentary_Joint_Committee_on_Defence/DVAAR2024-25"
    },
    participantInfo: null,
    topics: ["veterans", "defence", "government-administration"]
  },
  {
    id: "fed-parliamentary-behaviour-codes",
    sourceId: "aph-submissions-closing",
    title: "Inquiry into the operation and effectiveness of the behaviour codes",
    jurisdiction: "Federal",
    type: "Committee Inquiry",
    status: "Accepting submissions until 28 August 2026",
    shortNeutralSummary:
      "On 22 June 2026 the Parliamentary Joint Committee on Parliamentary Standards commenced its first inquiry into the Behaviour Codes for Commonwealth parliamentary workplaces. " +
      "The review is required under the Parliamentary Workplace Support Service Act 2023. " +
      "The committee is not authorised to investigate individual conduct issues or reconsider conduct decisions.",
    keyDates: {
      introduced: null,
      opened: "2026-06-22",
      submissionsClose: "2026-08-28",
      reportingDate: null,
      nextStep: "Committee review in progress"
    },
    officialLinks: {
      billPage: null,
      primaryDocument: null,
      howToParticipate: "https://www.aph.gov.au/Parliamentary_Business/Committees/Joint/Parliamentary_Joint_Committee_on_Parliamentary_Standards/Behaviourcodes",
      committeeOrConsultPage: "https://www.aph.gov.au/Parliamentary_Business/Committees/Joint/Parliamentary_Joint_Committee_on_Parliamentary_Standards/Behaviourcodes"
    },
    participantInfo: null,
    topics: ["parliament", "workplace-standards", "governance"]
  },
  {
    id: "fed-cyber-security-smes",
    sourceId: "aph-submissions-closing",
    title: "Inquiry into cyber security for small to medium sized businesses and organisations",
    jurisdiction: "Federal",
    type: "Committee Inquiry",
    status: "Accepting submissions until 28 August 2026",
    shortNeutralSummary:
      "The House Select Committee on Cyber Security for Small to Medium Sized Businesses and Organisations was established on 4 June 2026. " +
      "The inquiry examines cyber maturity, government guidance, standards, procurement of cyber services, and supply chain participation. " +
      "The committee will present its final report by 31 March 2027. A survey for SMEs and not-for-profits is also open until 29 January 2027.",
    keyDates: {
      introduced: null,
      opened: "2026-06-04",
      submissionsClose: "2026-08-28",
      reportingDate: "2027-03-31",
      nextStep: "Final report due 31 March 2027"
    },
    officialLinks: {
      billPage: null,
      primaryDocument: null,
      howToParticipate: "https://www.aph.gov.au/Parliamentary_Business/Committees/House/Cyber_Security_for_Small_to_Medium_Sized_Businesses_and_Organisations/Cybersecuritybusiness",
      committeeOrConsultPage: "https://www.aph.gov.au/Parliamentary_Business/Committees/House/Cyber_Security_for_Small_to_Medium_Sized_Businesses_and_Organisations/Cybersecuritybusiness"
    },
    participantInfo: {
      submissionsReceived: 10,
      note: "Submissions published on the committee inquiry page"
    },
    topics: ["cyber-security", "small-business", "digital"]
  },
  {
    id: "fed-ai-data-centres",
    sourceId: "aph-submissions-closing",
    title: "Artificial intelligence and data centres",
    jurisdiction: "Federal",
    type: "Committee Inquiry",
    status: "Accepting submissions until 1 September 2026",
    shortNeutralSummary:
      "The Senate Environment and Communications References Committee is inquiring into artificial intelligence and data centres. " +
      "Terms of reference cover regulatory frameworks for data centre growth, government deals with AI companies, and impacts on communities, industries, water and energy. " +
      "The submission closing date was extended to 1 September 2026.",
    keyDates: {
      introduced: null,
      opened: "2026-05-13",
      submissionsClose: "2026-09-01",
      reportingDate: "2026-11-16",
      nextStep: null
    },
    officialLinks: {
      billPage: null,
      primaryDocument: null,
      howToParticipate: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Environment_and_Communications/AIdatacentres48P",
      committeeOrConsultPage: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Environment_and_Communications/AIdatacentres48P"
    },
    participantInfo: null,
    topics: ["artificial-intelligence", "data-centres", "energy", "environment"]
  },
  {
    id: "fed-counter-terrorism-leg-amendment-bill-2026",
    sourceId: "aph-submissions-open",
    title: "Review of the Counter-Terrorism Legislation Amendment Bill 2026",
    jurisdiction: "Federal",
    type: "Committee Inquiry",
    status: "Accepting submissions until 2 September 2026",
    shortNeutralSummary:
      "On 12 August 2026 the Counter-Terrorism Legislation Amendment Bill 2026 was introduced. " +
      "The Parliamentary Joint Committee on Intelligence and Security is reviewing the Bill at the request of the Attorney-General. " +
      "The Bill would update post-sentence order and control order frameworks and extend key counter-terrorism powers to 7 December 2029.",
    keyDates: {
      introduced: "2026-08-12",
      opened: "2026-08-12",
      submissionsClose: "2026-09-02",
      reportingDate: null,
      nextStep: "PJCIS review in progress"
    },
    officialLinks: {
      billPage: "https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r7527",
      primaryDocument: null,
      howToParticipate: "https://www.aph.gov.au/Parliamentary_Business/Committees/Joint/Intelligence_and_Security/CTLABill2026",
      committeeOrConsultPage: "https://www.aph.gov.au/Parliamentary_Business/Committees/Joint/Intelligence_and_Security/CTLABill2026"
    },
    participantInfo: null,
    topics: ["counter-terrorism", "national-security", "criminal-law"]
  },
  {
    id: "fed-foreign-bribery-statutory-review",
    sourceId: "ag-consult",
    title: "Statutory Review of the Crimes Legislation Amendment (Combatting Foreign Bribery) Act 2024",
    jurisdiction: "Federal",
    type: "Departmental Consultation",
    status: "Open for submissions until 10 September 2026",
    shortNeutralSummary:
      "Under section 4 of the Act, the Attorney-General must initiate a review of the foreign bribery amendments 18 months after commencement. " +
      "The review examines how the amendments are operating, including the new corporate offence of failure to prevent foreign bribery. " +
      "Public consultation is open; submissions close 10 September 2026 via the AG consultation hub.",
    keyDates: {
      introduced: null,
      opened: "2026-08-07",
      submissionsClose: "2026-09-10",
      reportingDate: "2026-12-31",
      nextStep: "Written report to Attorney-General due 31 December 2026"
    },
    officialLinks: {
      billPage: "https://www.legislation.gov.au/C2024A00005",
      primaryDocument: "https://consultations.ag.gov.au/crime/combatting_foreign_bribery/",
      howToParticipate: "https://consultations.ag.gov.au/crime/combatting_foreign_bribery/consultation/",
      committeeOrConsultPage: "https://consultations.ag.gov.au/crime/combatting_foreign_bribery/"
    },
    participantInfo: null,
    topics: ["foreign-bribery", "corporate", "criminal-law"]
  },
  {
    id: "fed-income-management-review-2",
    sourceId: "aph-submissions-open",
    title: "Income management - review 2",
    jurisdiction: "Federal",
    type: "Committee Inquiry",
    status: "Accepting submissions until 3 September 2026",
    shortNeutralSummary:
      "On 16 July 2026 the Senate Community Affairs References Committee commenced a review of the " +
      "Social Security (Administration) Legislation Amendment (Income Management and Enhanced Income Management) Instrument 2026. " +
      "Written submissions close 3 September 2026.",
    keyDates: {
      introduced: null,
      opened: "2026-07-16",
      submissionsClose: "2026-09-03",
      reportingDate: null,
      nextStep: "Committee review in progress"
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://www.legislation.gov.au/F2026L00828/latest/text",
      howToParticipate: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Community_Affairs/Review_of_legislative_instruments/Income_management/Review_2",
      committeeOrConsultPage: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Community_Affairs/Review_of_legislative_instruments/Income_management/Review_2"
    },
    participantInfo: null,
    topics: ["social-services", "welfare", "income-management"]
  },
  {
    id: "nsw-coercive-control-law-review",
    sourceId: "nsw-have-your-say",
    title: "Review of the NSW coercive control law",
    jurisdiction: "NSW",
    type: "Departmental Consultation",
    status: "Open for submissions until 28 August 2026",
    shortNeutralSummary:
      "NSW Government is reviewing the coercive control law. The consultation is listed on the NSW Have Your Say portal " +
      "with submissions accepted until 28 August 2026.",
    keyDates: {
      introduced: null,
      opened: "2026-07-01",
      submissionsClose: "2026-08-28",
      reportingDate: null,
      nextStep: null
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://www.nsw.gov.au/have-your-say/review-of-nsw-coercive-control-law",
      howToParticipate: "https://www.nsw.gov.au/have-your-say/review-of-nsw-coercive-control-law",
      committeeOrConsultPage: "https://www.nsw.gov.au/have-your-say"
    },
    participantInfo: null,
    topics: ["criminal-law", "domestic-violence", "police-and-justice"]
  },
  {
    id: "nsw-retail-electricity-gas-market",
    sourceId: "nsw-have-your-say",
    title: "Retail electricity and gas market",
    jurisdiction: "NSW",
    type: "Regulatory Consultation",
    status: "Open for submissions until 1 September 2026",
    shortNeutralSummary:
      "NSW is consulting on the retail electricity and gas market. The consultation runs from 27 July to 1 September 2026 " +
      "on the NSW Have Your Say portal.",
    keyDates: {
      introduced: null,
      opened: "2026-07-27",
      submissionsClose: "2026-09-01",
      reportingDate: null,
      nextStep: null
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://www.nsw.gov.au/have-your-say/retail-electricity-and-gas-market",
      howToParticipate: "https://www.nsw.gov.au/have-your-say/retail-electricity-and-gas-market",
      committeeOrConsultPage: "https://www.nsw.gov.au/have-your-say"
    },
    participantInfo: null,
    topics: ["energy", "regulation", "utilities"]
  },
  {
    id: "vic-planning-scheme-amendment-reform",
    sourceId: "vic-engage",
    title: "Planning scheme amendments and compensation regulations",
    jurisdiction: "VIC",
    type: "Exposure Draft",
    status: "Open for submissions until 19 August 2026",
    shortNeutralSummary:
      "The Department of Transport and Planning is consulting on proposed amendments to the Planning and Environment Interim Regulations 2026, " +
      "including planning scheme amendment pathways and planning compensation. Feedback is via survey or written submission.",
    keyDates: {
      introduced: null,
      opened: "2026-07-22",
      submissionsClose: "2026-08-19",
      reportingDate: null,
      nextStep: "Regulations expected to commence early 2027"
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://engage.vic.gov.au/planning-scheme-amendment-reform",
      howToParticipate: "https://engage.vic.gov.au/project/planning-scheme-amendment-reform/survey/6728",
      committeeOrConsultPage: "https://engage.vic.gov.au/planning-scheme-amendment-reform"
    },
    participantInfo: null,
    topics: ["planning", "housing", "regulation"]
  },
  {
    id: "vic-western-water-strategy",
    sourceId: "vic-engage",
    title: "Western Region Sustainable Water Strategy",
    jurisdiction: "VIC",
    type: "Departmental Consultation",
    status: "Open for feedback",
    shortNeutralSummary:
      "Victoria is developing the Western Region Sustainable Water Strategy. Engage Victoria lists this consultation as open for feedback " +
      "on future water management in the state's western region.",
    keyDates: {
      introduced: null,
      opened: null,
      submissionsClose: null,
      reportingDate: null,
      nextStep: "Strategy development in progress"
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://engage.vic.gov.au/western-region-sustainable-water-strategy",
      howToParticipate: "https://engage.vic.gov.au/western-region-sustainable-water-strategy",
      committeeOrConsultPage: "https://engage.vic.gov.au/"
    },
    participantInfo: null,
    topics: ["water", "environment", "regional-development"]
  },
  {
    id: "qld-veterinary-surgeons-act-review",
    sourceId: "qld-have-your-say",
    title: "Veterinary Surgeons Act Review",
    jurisdiction: "QLD",
    type: "Legislation Review",
    status: "Open for submissions until 7 September 2026",
    shortNeutralSummary:
      "The Department of Primary Industries is reviewing the Veterinary Surgeons Act 1936. Stakeholder feedback will help shape Queensland's future veterinary legislative framework.",
    keyDates: {
      introduced: null,
      opened: null,
      submissionsClose: "2026-09-07",
      reportingDate: null,
      nextStep: null
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://www.qld.gov.au/government/engage/have-your-say/have-your-say-asset-listing-version/newsthing/veterinary-surgeons-act-review",
      howToParticipate: "https://www.qld.gov.au/government/engage/have-your-say/have-your-say-asset-listing-version/newsthing/veterinary-surgeons-act-review",
      committeeOrConsultPage: "https://www.qld.gov.au/government/engage/have-your-say"
    },
    participantInfo: null,
    topics: ["veterinary", "primary-industries", "legislation"]
  },
  {
    id: "qld-retail-shop-leases-act-review",
    sourceId: "qld-have-your-say",
    title: "Retail Shop Leases Act review",
    jurisdiction: "QLD",
    type: "Legislation Review",
    status: "Open for submissions until 11 September 2026",
    shortNeutralSummary:
      "Queensland is reviewing the Retail Shop Leases Act. Shop operators, landlords and others involved in retail leasing are invited to provide feedback.",
    keyDates: {
      introduced: null,
      opened: null,
      submissionsClose: "2026-09-11",
      reportingDate: null,
      nextStep: null
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://www.qld.gov.au/government/engage/have-your-say/have-your-say-asset-listing-version/newsthing/retail-shop-leases-act-review",
      howToParticipate: "https://www.qld.gov.au/government/engage/have-your-say/have-your-say-asset-listing-version/newsthing/retail-shop-leases-act-review",
      committeeOrConsultPage: "https://www.qld.gov.au/government/engage/have-your-say"
    },
    participantInfo: null,
    topics: ["retail", "commercial-leasing", "legislation"]
  },
  {
    id: "wa-aapa-amendment-bill-2026",
    sourceId: "wa-dplh-consult",
    title: "Aboriginal Affairs Planning Authority Amendment Bill 2026",
    jurisdiction: "WA",
    type: "Exposure Draft",
    status: "Open for submissions until 4 September 2026",
    shortNeutralSummary:
      "Western Australia is consulting on amendments to the Aboriginal Affairs Planning Authority Act 1972 to enable divestment of the Aboriginal Lands Trust estate. " +
      "Feedback on the exposure draft closes Friday 4 September 2026.",
    keyDates: {
      introduced: null,
      opened: "2026-08-03",
      submissionsClose: "2026-09-04",
      reportingDate: null,
      nextStep: null
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://haveyoursay.dplh.wa.gov.au/aapa-act-amendments",
      howToParticipate: "https://haveyoursay.dplh.wa.gov.au/aapa-act-amendments/surveys/aapa-act-amendments-feedbackform",
      committeeOrConsultPage: "https://haveyoursay.dplh.wa.gov.au/aapa-act-amendments"
    },
    participantInfo: null,
    topics: ["aboriginal-affairs", "land", "legislation"]
  },
  {
    id: "sa-miscellaneous-regulation-changes",
    sourceId: "sa-yoursay",
    title: "Miscellaneous regulation changes (Planning, Development and Infrastructure)",
    jurisdiction: "SA",
    type: "Regulatory Consultation",
    status: "Open for submissions until 24 September 2026",
    shortNeutralSummary:
      "The South Australian Government is seeking feedback on proposed amendments to the Planning, Development and Infrastructure (General) Regulations 2017 " +
      "via the Planning, Development and Infrastructure (General) (Miscellaneous) Amendment Regulations 2026.",
    keyDates: {
      introduced: null,
      opened: null,
      submissionsClose: "2026-09-24",
      reportingDate: null,
      nextStep: null
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://yoursay.sa.gov.au/miscellaneous-regulation-changes",
      howToParticipate: "https://yoursay.sa.gov.au/miscellaneous-regulation-changes",
      committeeOrConsultPage: "https://yoursay.sa.gov.au/"
    },
    participantInfo: null,
    topics: ["planning", "regulation", "building"]
  },
  {
    id: "sa-disaster-resilience-strategy",
    sourceId: "sa-yoursay",
    title: "SA Disaster Resilience Strategy (2026–2030)",
    jurisdiction: "SA",
    type: "Departmental Consultation",
    status: "Open for feedback",
    shortNeutralSummary:
      "SAFECOM is refreshing South Australia's Disaster Resilience Strategy for 2026–2030. Community and sector feedback is invited via an online survey on YourSAy.",
    keyDates: {
      introduced: null,
      opened: null,
      submissionsClose: null,
      reportingDate: null,
      nextStep: "Feedback summary to be published after survey closes"
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://yoursay.sa.gov.au/disaster-resilience-strategy",
      howToParticipate: "https://yoursay.sa.gov.au/disaster-resilience-strategy",
      committeeOrConsultPage: "https://yoursay.sa.gov.au/"
    },
    participantInfo: null,
    topics: ["disaster-resilience", "emergency-management", "community"]
  },
  {
    id: "tas-workers-rehab-compensation-scheme",
    sourceId: "tas-justice-consult",
    title: "Tasmanian Workers Rehabilitation and Compensation Scheme",
    jurisdiction: "TAS",
    type: "Legislation Review",
    status: "Open for feedback",
    shortNeutralSummary:
      "The Tasmanian Department of Justice is consulting on draft Terms of Reference for an independent review of the Tasmanian Workers Rehabilitation and Compensation Scheme.",
    keyDates: {
      introduced: null,
      opened: null,
      submissionsClose: null,
      reportingDate: null,
      nextStep: "Independent review terms of reference"
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://www.justice.tas.gov.au/community-consultation/consultations/2026/tasmanian-workers-rehabilitation-and-compensation-scheme",
      howToParticipate: "https://www.justice.tas.gov.au/community-consultation/consultations/2026/tasmanian-workers-rehabilitation-and-compensation-scheme",
      committeeOrConsultPage: "https://www.justice.tas.gov.au/community-consultation"
    },
    participantInfo: null,
    topics: ["workers-compensation", "workplace", "legislation"]
  },
  {
    id: "tas-explosives-amendment-regs-2026",
    sourceId: "tas-justice-consult",
    title: "Proposed Explosives Amendment Regulations 2026",
    jurisdiction: "TAS",
    type: "Regulatory Consultation",
    status: "Open for feedback",
    shortNeutralSummary:
      "Tasmania is seeking input on the Proposed Explosives Amendment Regulations 2026, which would affect how fireworks are purchased, used and approved for events.",
    keyDates: {
      introduced: null,
      opened: null,
      submissionsClose: null,
      reportingDate: null,
      nextStep: null
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://www.justice.tas.gov.au/community-consultation/consultations/2026/proposed-explosives-amendment-regulations-2026",
      howToParticipate: "https://www.justice.tas.gov.au/community-consultation/consultations/2026/proposed-explosives-amendment-regulations-2026",
      committeeOrConsultPage: "https://www.justice.tas.gov.au/community-consultation"
    },
    participantInfo: null,
    topics: ["explosives", "regulation", "public-safety"]
  },
  {
    id: "act-public-space-local-shops",
    sourceId: "act-yoursay",
    title: "Public space improvements at local shops",
    jurisdiction: "ACT",
    type: "Departmental Consultation",
    status: "Open for feedback",
    shortNeutralSummary:
      "The ACT Government is consulting on public space improvements at the Charnwood, Erindale and Mawson shops. " +
      "Surveys and in-person pop-up sessions are listed on YourSay Conversations through September 2026.",
    keyDates: {
      introduced: null,
      opened: null,
      submissionsClose: "2026-09-12",
      reportingDate: null,
      nextStep: "Prioritised areas expected to be finalised in second half of 2026"
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://yoursayconversations.act.gov.au/public-space-improvements-local-shops",
      howToParticipate: "https://yoursayconversations.act.gov.au/public-space-improvements-local-shops/public-space-improvements-local-shops-erindale-survey",
      committeeOrConsultPage: "https://yoursayconversations.act.gov.au/public-space-improvements-local-shops"
    },
    participantInfo: null,
    topics: ["planning", "urban-renewal", "community"]
  },
  {
    id: "act-budget-2026-27-consultation",
    sourceId: "act-yoursay",
    title: "ACT 2026–27 Budget Consultation Process",
    jurisdiction: "ACT",
    type: "Budget Consultation",
    status: "Open for written submissions",
    shortNeutralSummary:
      "The ACT Budget consultation process invites written submissions on how the Government can support community wellbeing. " +
      "There is no fixed deadline; early engagement with relevant directorates is encouraged.",
    keyDates: {
      introduced: null,
      opened: null,
      submissionsClose: null,
      reportingDate: null,
      nextStep: "Submissions inform 2026–27 Budget priorities"
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://yoursayconversations.act.gov.au/act-2026-27-budget-consultation-process",
      howToParticipate: "https://yoursayconversations.act.gov.au/act-2026-27-budget-consultation-process",
      committeeOrConsultPage: "https://yoursayconversations.act.gov.au/"
    },
    participantInfo: null,
    topics: ["budget", "government", "community"]
  },
  {
    id: "nt-red-tape-portal",
    sourceId: "nt-have-your-say",
    title: "Northern Territory Red Tape Portal",
    jurisdiction: "NT",
    type: "Departmental Consultation",
    status: "Open for ongoing feedback",
    shortNeutralSummary:
      "The Northern Territory Government accepts ongoing feedback about rules, requirements and government processes that may be overly complex or difficult to navigate. " +
      "Submissions are lodged via the NT Have Your Say red tape portal.",
    keyDates: {
      introduced: null,
      opened: "2026-07-15",
      submissionsClose: null,
      reportingDate: null,
      nextStep: "Feedback reviewed and directed to relevant agencies"
    },
    officialLinks: {
      billPage: null,
      primaryDocument: "https://haveyoursay.nt.gov.au/ntredtapeportal",
      howToParticipate: "https://haveyoursay.nt.gov.au/ntredtapeportal",
      committeeOrConsultPage: "https://haveyoursay.nt.gov.au/"
    },
    participantInfo: null,
    topics: ["regulation", "red-tape", "government-administration"]
  }
];

const pastItems = [
  {
    id: "fed-social-media-minimum-age-2024",
    sourceId: "legislation-gov-au",
    title: "Online Safety Amendment (Social Media Minimum Age) Act 2024",
    jurisdiction: "Federal",
    type: "Bill",
    status: "Enacted",
    shortNeutralSummary:
      "The Act amends the Online Safety Act 2021 to establish a minimum age of 16 for holding accounts on certain age-restricted social media platforms. " +
      "The Bill was introduced on 21 November 2024 and received Royal Assent on 10 December 2024. " +
      "Authorised text is published on the Federal Register of Legislation.",
    keyDates: {
      introduced: "2024-11-21",
      opened: "2024-11-21",
      submissionsClose: "2024-11-22",
      reportingDate: "2024-11-26",
      nextStep: null
    },
    officialLinks: {
      billPage: "https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r7284",
      primaryDocument: "https://www.legislation.gov.au/C2024A00127/latest/versions",
      howToParticipate: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Environment_and_Communications/SocialMediaMinimumAge",
      committeeOrConsultPage: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Environment_and_Communications/SocialMediaMinimumAge"
    },
    outcome: "Passed both houses — Royal Assent 10 December 2024",
    decisionDate: "2024-11-29",
    howItWasDecided:
      "The Bill passed the House of Representatives on 27 November 2024 and the Senate on 28 November 2024. " +
      "The Senate Environment and Communications Legislation Committee reported on 26 November 2024. " +
      "Division records are published on the Parliament website.",
    participantInfo: {
      submissionsReceived: 15000,
      note: "Submissions to the Senate Environment and Communications Legislation Committee inquiry (widely reported)"
    },
    topics: ["online-safety", "youth", "social-media", "digital"]
  },
  {
    id: "fed-ndis-future-generations-bill-2026",
    sourceId: "aph-bills",
    title: "National Disability Insurance Scheme Amendment (Securing the NDIS for Future Generations) Bill 2026",
    jurisdiction: "Federal",
    type: "Bill",
    status: "Committee report tabled",
    shortNeutralSummary:
      "The Bill was referred to the Senate Community Affairs Legislation Committee on 14 May 2026. " +
      "Submissions addressing the provisions of the Bill were accepted until 10 July 2026. " +
      "The committee tabled its report on 14 August 2026.",
    keyDates: {
      introduced: "2026-05-14",
      opened: "2026-05-14",
      submissionsClose: "2026-07-10",
      reportingDate: "2026-08-14",
      nextStep: null
    },
    officialLinks: {
      billPage: "https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r7487",
      primaryDocument: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Community_Affairs/NDISFutureGenBill/Report",
      howToParticipate: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Community_Affairs/NDISFutureGenBill",
      committeeOrConsultPage: "https://www.aph.gov.au/Parliamentary_Business/Committees/Senate/Community_Affairs/NDISFutureGenBill"
    },
    outcome: "Committee report tabled 14 August 2026 — Senate consideration ongoing",
    decisionDate: "2026-08-14",
    howItWasDecided:
      "The Senate referred the Bill on 14 May 2026. The committee held public hearings and tabled progress reports before its final report on 14 August 2026. " +
      "Further parliamentary stages depend on Senate business.",
    participantInfo: null,
    topics: ["disability", "ndis", "social-services"]
  },
  {
    id: "fed-tola-bill-2025",
    sourceId: "legislation-gov-au",
    title: "Telecommunications and Other Legislation Amendment Bill 2025",
    jurisdiction: "Federal",
    type: "Bill",
    status: "Enacted",
    shortNeutralSummary:
      "The Bill amends the Telecommunications (Interception and Access) Act 1979, Surveillance Devices Act 2004 and Crimes Act 1914. " +
      "The stated purpose is technical amendments to electronic surveillance and criminal justice laws. " +
      "It was introduced to the House of Representatives on 27 August 2025.",
    keyDates: {
      introduced: "2025-08-27",
      opened: "2025-09-02",
      submissionsClose: "2025-09-22",
      reportingDate: null,
      nextStep: null
    },
    officialLinks: {
      billPage: "https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/bd/bd2526/26bd017",
      primaryDocument: "https://www.legislation.gov.au/",
      howToParticipate: "https://www.aph.gov.au/Parliamentary_Business/Committees/Joint/Intelligence_and_Security/TOLABill2025",
      committeeOrConsultPage: "https://www.aph.gov.au/Parliamentary_Business/Committees/Joint/Intelligence_and_Security/TOLABill2025/Report"
    },
    outcome: "Passed — committee review completed September 2025",
    decisionDate: "2025-09-24",
    howItWasDecided:
      "The Minister for Home Affairs referred the Bill to the Parliamentary Joint Committee on Intelligence and Security on 27 August 2025. " +
      "The committee received five submissions and completed its review after a private briefing on 24 September 2025.",
    participantInfo: {
      submissionsReceived: 5,
      note: "Submissions to the PJCIS review"
    },
    topics: ["surveillance", "telecommunications", "law-enforcement", "national-security"]
  }
];

window.LegislationWatchData = { lastUpdated, DATA_META, stateCoverage, upcomingItems, pastItems };
