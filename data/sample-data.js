/**
 * Sample legislation data for the Legislation Watch prototype.
 * Replace with live feeds in production; officialLinks must point to real government pages.
 */

export const upcomingItems = [
  {
    id: "fed-privacy-act-stage-2",
    title: "Privacy Act Review — Stage 2 Reforms",
    jurisdiction: "Federal",
    type: "Departmental Consultation",
    status: "Open for submissions",
    shortNeutralSummary:
      "The Attorney-General's Department is consulting on proposed amendments to the Privacy Act 1988. " +
      "The exposure materials cover consent requirements, data breach notification, and small business exemptions. " +
      "Submissions will inform the drafting of a formal Bill.",
    keyDates: {
      introduced: null,
      submissionsClose: "2026-09-30",
      expectedNextStep: "Exposure draft Bill expected late 2026"
    },
    officialLinks: {
      primaryDocument: "https://www.ag.gov.au/rights-and-protections/privacy",
      howToParticipate: "https://www.ag.gov.au/rights-and-protections/privacy",
      committeePage: null
    },
    participantInfo: {
      submissionsReceived: 312,
      note: "Submissions count published on consultation hub as at 1 August 2026"
    },
    topics: ["privacy", "data", "consumer"]
  },
  {
    id: "fed-climate-financial-disclosure",
    title: "Climate-Related Financial Disclosure — Draft Legislative Instrument",
    jurisdiction: "Federal",
    type: "Exposure Draft",
    status: "Open for submissions",
    shortNeutralSummary:
      "Treasury has released an exposure draft setting mandatory climate-related financial disclosure requirements for large entities. " +
      "The draft aligns reporting obligations with internationally recognised sustainability disclosure standards. " +
      "Feedback is sought on scope, timing, and assurance requirements.",
    keyDates: {
      introduced: null,
      submissionsClose: "2026-10-15",
      expectedNextStep: "Final instrument registration on Federal Register of Legislation"
    },
    officialLinks: {
      primaryDocument: "https://www.treasury.gov.au/",
      howToParticipate: "https://www.treasury.gov.au/",
      committeePage: null
    },
    participantInfo: null,
    topics: ["climate", "finance", "corporate"]
  },
  {
    id: "nsw-housing-density-reforms",
    title: "Housing Density Reforms — Planning Amendment (Exposure Draft)",
    jurisdiction: "NSW",
    type: "Exposure Draft",
    status: "Open for submissions",
    shortNeutralSummary:
      "The NSW Department of Planning has published an exposure draft to amend planning controls for medium-density housing near transport corridors. " +
      "The draft includes mandatory design standards and revised height and floor-space controls. " +
      "Public feedback will be considered before a Bill is introduced to Parliament.",
    keyDates: {
      introduced: null,
      submissionsClose: "2026-08-25",
      expectedNextStep: "Departmental response and Bill introduction (timing not yet announced)"
    },
    officialLinks: {
      primaryDocument: "https://www.planning.nsw.gov.au/",
      howToParticipate: "https://www.planning.nsw.gov.au/",
      committeePage: null
    },
    participantInfo: {
      submissionsReceived: 1847,
      note: "Submissions count published on NSW Planning portal"
    },
    topics: ["housing", "planning", "urban"]
  },
  {
    id: "vic-renewable-storage-inquiry",
    title: "Renewable Energy Storage Targets Bill 2026",
    jurisdiction: "VIC",
    type: "Committee Inquiry",
    status: "Open for submissions",
    shortNeutralSummary:
      "The Victorian Legislative Council Environment and Planning Committee is inquiring into the Renewable Energy Storage Targets Bill 2026. " +
      "The inquiry examines proposed storage capacity targets and grid integration measures. " +
      "The Committee will report to the Legislative Council with findings and recommendations.",
    keyDates: {
      introduced: "2026-07-10",
      submissionsClose: "2026-11-01",
      expectedNextStep: "Committee report due February 2027"
    },
    officialLinks: {
      primaryDocument: "https://www.parliament.vic.gov.au/",
      howToParticipate: "https://www.parliament.vic.gov.au/",
      committeePage: "https://www.parliament.vic.gov.au/"
    },
    participantInfo: {
      submissionsReceived: 96,
      note: "Submissions received to date, per committee secretariat"
    },
    topics: ["energy", "renewables", "climate"]
  },
  {
    id: "fed-telehealth-mbs-expansion",
    title: "Telehealth Services Expansion — Regulatory Impact Statement",
    jurisdiction: "Federal",
    type: "Departmental Consultation",
    status: "Open for submissions",
    shortNeutralSummary:
      "The Department of Health and Aged Care is consulting on proposed Medicare Benefits Schedule changes for telehealth in regional and remote areas. " +
      "The Regulatory Impact Statement sets out eligibility criteria and item descriptors for new telehealth services. " +
      "Consultation closes before final rule changes are made.",
    keyDates: {
      introduced: null,
      submissionsClose: "2026-08-22",
      expectedNextStep: "MBS item amendments expected September 2026"
    },
    officialLinks: {
      primaryDocument: "https://www.health.gov.au/",
      howToParticipate: "https://www.health.gov.au/",
      committeePage: null
    },
    participantInfo: null,
    topics: ["health", "telehealth", "regional"]
  },
  {
    id: "qld-water-security-framework",
    title: "Water Security and Drought Resilience Framework",
    jurisdiction: "QLD",
    type: "Departmental Consultation",
    status: "Open for submissions",
    shortNeutralSummary:
      "Queensland's Department of Regional Development, Manufacturing and Water is consulting on a statewide water allocation framework for drought conditions. " +
      "The framework sets out principles for balancing agricultural, urban, and environmental water needs. " +
      "Feedback is invited from water users, local governments, and industry bodies.",
    keyDates: {
      introduced: null,
      submissionsClose: "2026-12-01",
      expectedNextStep: "Policy paper and draft legislation in 2027"
    },
    officialLinks: {
      primaryDocument: "https://www.qld.gov.au/",
      howToParticipate: "https://www.qld.gov.au/",
      committeePage: null
    },
    participantInfo: {
      submissionsReceived: 54,
      note: "Submissions count updated weekly on consultation page"
    },
    topics: ["water", "agriculture", "drought"]
  },
  {
    id: "fed-digital-id-bill",
    title: "Digital ID Bill 2026",
    jurisdiction: "Federal",
    type: "Bill",
    status: "Introduced",
    shortNeutralSummary:
      "The Digital ID Bill 2026 was introduced to the House of Representatives on 3 June 2026. " +
      "The Bill establishes a voluntary accreditation framework for digital identity service providers. " +
      "It is currently awaiting referral to a committee for inquiry.",
    keyDates: {
      introduced: "2026-06-03",
      submissionsClose: null,
      expectedNextStep: "Committee referral and public inquiry (dates to be announced)"
    },
    officialLinks: {
      primaryDocument: "https://www.aph.gov.au/",
      howToParticipate: "https://www.aph.gov.au/",
      committeePage: null
    },
    participantInfo: null,
    topics: ["digital", "identity", "privacy"]
  },
  {
    id: "fed-migration-character-amendment",
    title: "Migration Amendment (Character and Cancellation Provisions) Bill 2026",
    jurisdiction: "Federal",
    type: "Bill",
    status: "Before committee",
    shortNeutralSummary:
      "This Bill was referred to the Senate Legal and Constitutional Affairs Legislation Committee on 15 July 2026. " +
      "It proposes amendments to character test provisions and visa cancellation powers under the Migration Act 1958. " +
      "The Committee is accepting public submissions until the closing date.",
    keyDates: {
      introduced: "2026-06-18",
      submissionsClose: "2026-09-05",
      expectedNextStep: "Senate committee report due 17 October 2026"
    },
    officialLinks: {
      primaryDocument: "https://www.aph.gov.au/",
      howToParticipate: "https://www.aph.gov.au/",
      committeePage: "https://www.aph.gov.au/"
    },
    participantInfo: {
      submissionsReceived: 428,
      note: "Submissions published on committee inquiry page"
    },
    topics: ["migration", "immigration", "law-enforcement"]
  }
];

export const pastItems = [
  {
    id: "fed-social-media-minimum-age",
    title: "Online Safety Amendment (Social Media Minimum Age) Act 2026",
    jurisdiction: "Federal",
    type: "Bill",
    status: "Enacted",
    shortNeutralSummary:
      "Legislation establishing a minimum age requirement for social media platform access in Australia. " +
      "The Act sets a phased implementation schedule commencing from late 2026. " +
      "Platform obligations and enforcement mechanisms are defined in the Act and supporting rules.",
    keyDates: {
      introduced: "2024-11-21",
      submissionsClose: "2025-01-31",
      expectedNextStep: null
    },
    officialLinks: {
      primaryDocument: "https://www.legislation.gov.au/",
      howToParticipate: "https://www.aph.gov.au/",
      committeePage: "https://www.aph.gov.au/"
    },
    outcome: "Passed both houses — Royal Assent received 15 July 2026",
    decisionDate: "2026-06-28",
    howItWasDecided:
      "The Bill passed the House of Representatives on 27 November 2024 and the Senate on 28 June 2026. " +
      "The Senate Environment and Communications Legislation Committee conducted an inquiry and tabled its report in March 2025. " +
      "Amendments moved in the Senate were agreed to before the final vote.",
    participantInfo: {
      submissionsReceived: 2847,
      note: "Public submissions to the Senate Environment and Communications Legislation Committee inquiry"
    },
    topics: ["digital", "youth", "online-safety"]
  },
  {
    id: "fed-surveillance-legislation-amendment",
    title: "Surveillance Legislation Amendment (Identify and Disrupt) Act 2025",
    jurisdiction: "Federal",
    type: "Bill",
    status: "Enacted",
    shortNeutralSummary:
      "Amendments to the Surveillance Devices Act 2004 and Telecommunications (Interception and Access) Act 1979. " +
      "The Act extends existing law enforcement powers relating to network activity warrants. " +
      "Provisions include oversight reporting requirements for the Inspector-General of Intelligence and Security.",
    keyDates: {
      introduced: "2025-03-12",
      submissionsClose: "2025-05-09",
      expectedNextStep: null
    },
    officialLinks: {
      primaryDocument: "https://www.legislation.gov.au/",
      howToParticipate: "https://www.aph.gov.au/",
      committeePage: "https://www.aph.gov.au/"
    },
    outcome: "Passed — received Royal Assent 22 August 2025",
    decisionDate: "2025-08-14",
    howItWasDecided:
      "The Bill was referred to the Parliamentary Joint Committee on Intelligence and Security, which reported in June 2025 with recommended amendments. " +
      "Government amendments reflecting committee recommendations were agreed to in both houses. " +
      "The Act commenced in part on assent, with remaining provisions phased from January 2026.",
    participantInfo: {
      submissionsReceived: 89,
      note: "Submissions to the PJCIS review; hearing transcripts published on Parliament website"
    },
    topics: ["surveillance", "law-enforcement", "privacy"]
  },
  {
    id: "fed-competition-digital-platforms",
    title: "Competition and Consumer Amendment (Digital Platforms) Act 2026",
    jurisdiction: "Federal",
    type: "Bill",
    status: "Enacted",
    shortNeutralSummary:
      "Legislation granting the ACCC expanded powers to investigate and enforce competition issues arising from digital platform conduct. " +
      "The Act introduces notification requirements for certain acquisitions by designated digital platforms. " +
      "Supporting rules set procedural detail for ACCC investigations.",
    keyDates: {
      introduced: "2025-09-04",
      submissionsClose: "2025-12-20",
      expectedNextStep: null
    },
    officialLinks: {
      primaryDocument: "https://www.legislation.gov.au/",
      howToParticipate: "https://www.ag.gov.au/",
      committeePage: null
    },
    outcome: "Passed — received Royal Assent 18 April 2026",
    decisionDate: "2026-04-02",
    howItWasDecided:
      "An exposure draft was released for public comment in December 2025 before the Bill was introduced. " +
      "The Bill passed both houses without referral to a committee inquiry. " +
      "Second reading speeches and division records are available on the Parliament website.",
    participantInfo: {
      submissionsReceived: 156,
      note: "Exposure draft consultation submissions; committee inquiry not held"
    },
    topics: ["competition", "digital", "consumer"]
  }
];

/** Default export for convenient single-import usage. */
export default { upcomingItems, pastItems };
