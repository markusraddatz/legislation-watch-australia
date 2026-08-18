/**
 * Local government / council consultation data (separate from state & federal).
 * Update from official council and regional engagement sites.
 *
 * LAST UPDATED: 2026-08-18 (structural audit — all eight jurisdictions, consistent item schema)
 *
 * Each state/territory entry must include: code, name, integrated (boolean), note, portals[], items[].
 * Set integrated: true only when items[] contains verified open consultations from official sources.
 * Each item: id, councilId, council, jurisdiction, type, status, title, shortNeutralSummary,
 * keyDates, officialLinks (howToParticipate required), participantInfo, topics.
 */

const localLastUpdated = "2026-08-18";

const localCoverage = {
  message:
    "Local government consultations are published on individual council websites and regional engagement hubs. " +
    "Coverage will grow as we monitor these sources regularly.",
  states: [
    {
      code: "NSW",
      name: "New South Wales",
      integrated: true,
      note:
        "Most NSW councils run consultations on their own Have Your Say or Your Say sites. " +
        "Coverage will grow as more councils are monitored.",
      portals: [
        {
          label: "Have your say in local council (OLG)",
          url: "https://www.olg.nsw.gov.au/public/have-your-say-in-local-council"
        },
        {
          label: "Find your council (OLG directory)",
          url: "https://www.olg.nsw.gov.au/public/find-my-council/"
        },
        { label: "City of Sydney — Sydney Your Say", url: "https://www.cityofsydney.nsw.gov.au/consultations" },
        { label: "MidCoast Council — Have Your Say", url: "https://haveyoursay.midcoast.nsw.gov.au/" },
        { label: "Uralla Shire — Your Say", url: "https://www.yoursay.uralla.nsw.gov.au/" },
        {
          label: "NSW Have Your Say (includes some local projects)",
          url: "https://www.nsw.gov.au/have-your-say"
        }
      ],
      items: [
        {
          id: "nsw-midcoast-code-meeting-practice-2026",
          councilId: "midcoast",
          council: "MidCoast Council",
          jurisdiction: "NSW",
          type: "Regulatory Consultation",
          status: "Open for submissions until 12 October 2026",
          title: "Draft Code of Meeting Practice",
          shortNeutralSummary:
            "MidCoast Council is seeking feedback on its draft Code of Meeting Practice, which sets procedures and standards " +
            "for Council meetings and councillor committees under the Local Government Act 1993. Submissions close Monday 12 October 2026.",
          keyDates: {
            opened: null,
            submissionsClose: "2026-10-12",
            reportingDate: null,
            nextStep: null
          },
          officialLinks: {
            primaryDocument: "https://haveyoursay.midcoast.nsw.gov.au/draft-code-meeting-practice-1",
            howToParticipate: "https://haveyoursay.midcoast.nsw.gov.au/draft-code-meeting-practice-1",
            committeeOrConsultPage: "https://haveyoursay.midcoast.nsw.gov.au/"
          },
          participantInfo: null,
          topics: ["governance", "local-law", "regulation"]
        },
        {
          id: "nsw-midcoast-boronia-park-naming-2026",
          councilId: "midcoast",
          council: "MidCoast Council",
          jurisdiction: "NSW",
          type: "Community Consultation",
          status: "Open for submissions until 31 August 2026",
          title: "Naming Proposal — Boronia Park Netball Facilities",
          shortNeutralSummary:
            "MidCoast Council is consulting on a proposal to name the netball courts and clubrooms at Boronia Park the Pauline Carr Netball Centre. " +
            "Feedback closes 11:59pm 31 August 2026.",
          keyDates: {
            opened: null,
            submissionsClose: "2026-08-31",
            reportingDate: null,
            nextStep: null
          },
          officialLinks: {
            primaryDocument: "https://haveyoursay.midcoast.nsw.gov.au/naming-proposal-boronia-park-netball-facilities",
            howToParticipate: "https://haveyoursay.midcoast.nsw.gov.au/naming-proposal-boronia-park-netball-facilities",
            committeeOrConsultPage: "https://haveyoursay.midcoast.nsw.gov.au/"
          },
          participantInfo: null,
          topics: ["community", "sport", "naming"]
        },
        {
          id: "nsw-sydney-moore-park-cycleways-2026",
          councilId: "sydney",
          council: "City of Sydney",
          jurisdiction: "NSW",
          type: "Policy Consultation",
          status: "Open for submissions until 19 August 2026",
          title: "Making Moore Park Road and Fitzroy Street Cycleways Permanent",
          shortNeutralSummary:
            "The City of Sydney is consulting on a review of environmental factors and proposes making the Moore Park Road and Fitzroy Street cycleways permanent. " +
            "Public consultation runs 22 July to 19 August 2026.",
          keyDates: {
            opened: "2026-07-22",
            submissionsClose: "2026-08-19",
            reportingDate: null,
            nextStep: null
          },
          officialLinks: {
            primaryDocument:
              "https://www.cityofsydney.nsw.gov.au/policy-planning-changes/your-say-making-moore-park-rd-fitzroy-st-cycleways-permanent",
            howToParticipate:
              "https://www.cityofsydney.nsw.gov.au/policy-planning-changes/your-say-making-moore-park-rd-fitzroy-st-cycleways-permanent",
            committeeOrConsultPage: "https://www.cityofsydney.nsw.gov.au/consultations"
          },
          participantInfo: null,
          topics: ["transport", "cycling", "urban-design"]
        },
        {
          id: "nsw-sydney-alcohol-restrictions-2026",
          councilId: "sydney",
          council: "City of Sydney",
          jurisdiction: "NSW",
          type: "Public Notice",
          status: "Open for submissions until 19 August 2026",
          title: "Proposed Outdoor Alcohol Restrictions in Ultimo and Darlinghurst",
          shortNeutralSummary:
            "The City of Sydney is seeking feedback on proposed 24-hour alcohol restrictions in three public spaces: McKee Street Reserve and Mary Ann Street Park in Ultimo, " +
            "and Taylor Square North in Darlinghurst. Consultation closes 5pm 19 August 2026.",
          keyDates: {
            opened: "2026-07-20",
            submissionsClose: "2026-08-19",
            reportingDate: null,
            nextStep: "Feedback informs a report to Council; restrictions could be in place for up to 4 years if approved"
          },
          officialLinks: {
            primaryDocument:
              "https://www.cityofsydney.nsw.gov.au/public-notices/your-say-proposed-outdoor-alcohol-restrictions-ultimo-darlinghurst",
            howToParticipate:
              "https://www.cityofsydney.nsw.gov.au/public-notices/your-say-proposed-outdoor-alcohol-restrictions-ultimo-darlinghurst",
            committeeOrConsultPage: "https://www.cityofsydney.nsw.gov.au/consultations"
          },
          participantInfo: null,
          topics: ["public-safety", "local-law", "community"]
        },
        {
          id: "nsw-sydney-paradise-reserve-2026",
          councilId: "sydney",
          council: "City of Sydney",
          jurisdiction: "NSW",
          type: "Proposed Works Consultation",
          status: "Open for submissions until 19 August 2026",
          title: "Share Your Ideas for Paradise Reserve, Pyrmont",
          shortNeutralSummary:
            "The City of Sydney is planning an upgrade of Paradise Reserve in Pyrmont and is inviting community ideas before developing a concept design. " +
            "Consultation runs 22 July to 19 August 2026.",
          keyDates: {
            opened: "2026-07-22",
            submissionsClose: "2026-08-19",
            reportingDate: null,
            nextStep: "Construction expected to begin late 2026"
          },
          officialLinks: {
            primaryDocument:
              "https://www.cityofsydney.nsw.gov.au/proposed-works-maintenance/share-your-ideas-paradise-reserve",
            howToParticipate:
              "https://www.cityofsydney.nsw.gov.au/proposed-works-maintenance/share-your-ideas-paradise-reserve",
            committeeOrConsultPage: "https://www.cityofsydney.nsw.gov.au/consultations"
          },
          participantInfo: null,
          topics: ["parks", "open-space", "urban-design"]
        }
      ]
    },
    {
      code: "VIC",
      name: "Victoria",
      integrated: true,
      note:
        "Victorian councils typically publish consultations on their own Have Your Say or Participate sites. " +
        "State-level items may appear on Engage Victoria. Coverage will grow as more councils are monitored.",
      portals: [
        { label: "City of Melbourne — Participate Melbourne", url: "https://participate.melbourne.vic.gov.au/" },
        { label: "City of Greater Geelong — Have Your Say", url: "https://yoursay.geelongaustralia.com.au/" },
        { label: "City of Yarra — Your Say Yarra", url: "https://yoursayyarra.com.au/" },
        { label: "Engage Victoria (state-level)", url: "https://engage.vic.gov.au/" },
        {
          label: "Local Government Victoria",
          url: "https://www.localgovernment.vic.gov.au/"
        }
      ],
      items: [
        {
          id: "vic-melbourne-climate-environment-strategy-2026",
          councilId: "melbourne",
          council: "City of Melbourne",
          jurisdiction: "VIC",
          type: "Departmental Consultation",
          status: "Open for submissions until 4 October 2026",
          title: "Climate and Environment Strategy",
          shortNeutralSummary:
            "The City of Melbourne is developing a new Climate and Environment Strategy to guide coordinated climate and environmental action over the next decade. " +
            "Pre-draft consultation is open from 12 August to 4 October 2026 on Participate Melbourne.",
          keyDates: {
            opened: "2026-08-12",
            submissionsClose: "2026-10-04",
            reportingDate: null,
            nextStep: "Draft strategy and implementation plans expected for consultation early 2027; finalisation mid-2027"
          },
          officialLinks: {
            primaryDocument: "https://participate.melbourne.vic.gov.au/climate-and-environment-strategy",
            howToParticipate: "https://participate.melbourne.vic.gov.au/climate-and-environment-strategy/share-your-feedback",
            committeeOrConsultPage: "https://participate.melbourne.vic.gov.au/"
          },
          participantInfo: null,
          topics: ["climate", "environment", "planning"]
        },
        {
          id: "vic-melbourne-road-safety-parkville-2026",
          councilId: "melbourne",
          council: "City of Melbourne",
          jurisdiction: "VIC",
          type: "Proposed Works Consultation",
          status: "Open for submissions until 27 August 2026",
          title: "Improving Road Safety and Walkability in Parkville",
          shortNeutralSummary:
            "The City of Melbourne is proposing ten road safety improvements in Parkville, including traffic calming, signage and safer crossing points. " +
            "Phase 1 community consultation closes Thursday 27 August 2026.",
          keyDates: {
            opened: "2026-07-30",
            submissionsClose: "2026-08-27",
            reportingDate: null,
            nextStep: "Phase 2 consultation expected September–October 2026"
          },
          officialLinks: {
            primaryDocument: "https://participate.melbourne.vic.gov.au/road-safety-parkville",
            howToParticipate: "https://participate.melbourne.vic.gov.au/road-safety-parkville/share-your-feedback",
            committeeOrConsultPage: "https://participate.melbourne.vic.gov.au/road-safety-parkville"
          },
          participantInfo: null,
          topics: ["transport", "road-safety", "urban-design"]
        },
        {
          id: "vic-geelong-ocean-grove-stormwater-2026",
          councilId: "geelong",
          council: "City of Greater Geelong",
          jurisdiction: "VIC",
          type: "Departmental Consultation",
          status: "Open for submissions until 13 September 2026",
          title: "Ocean Grove Stormwater Study — Stage 2",
          shortNeutralSummary:
            "The City of Greater Geelong is inviting feedback on modelled flood extent for the Ocean Grove catchment, covering Ocean Grove, Wallington, Marcus Hill and parts of Point Lonsdale. " +
            "Stage 2 consultation closes 11:59pm 13 September 2026.",
          keyDates: {
            opened: "2026-08-17",
            submissionsClose: "2026-09-13",
            reportingDate: null,
            nextStep: "Stage 3 consultation expected early 2027"
          },
          officialLinks: {
            primaryDocument: "https://yoursay.geelongaustralia.com.au/OGFS",
            howToParticipate: "https://yoursay.geelongaustralia.com.au/OGFS/mapping-tool-ocean",
            committeeOrConsultPage: "https://yoursay.geelongaustralia.com.au/"
          },
          participantInfo: null,
          topics: ["stormwater", "flooding", "planning"]
        }
      ]
    },
    {
      code: "QLD",
      name: "Queensland",
      integrated: true,
      note:
        "Queensland councils often use Your Say or Have Your Say platforms on council websites. " +
        "Coverage will grow as more councils are monitored.",
      portals: [
        { label: "Brisbane City Council — Your City Your Say", url: "https://yoursay.brisbane.qld.gov.au/" },
        { label: "Get Involved Queensland", url: "https://www.getinvolved.qld.gov.au/" },
        { label: "Queensland Have Your Say", url: "https://www.qld.gov.au/have-your-say" }
      ],
      items: [
        {
          id: "qld-brisbane-kedron-brook-2026",
          councilId: "brisbane",
          council: "Brisbane City Council",
          jurisdiction: "QLD",
          type: "Departmental Consultation",
          status: "Open for submissions until 6 September 2026",
          title: "Kedron Brook Revitalisation — Draft Vision",
          shortNeutralSummary:
            "Brisbane City Council is consulting on a 20-year draft vision to revitalise the Kedron Brook catchment as a lifestyle and recreation corridor with a healthier, more resilient waterway. " +
            "Community engagement closes 11:59pm Sunday 6 September 2026.",
          keyDates: {
            opened: null,
            submissionsClose: "2026-09-06",
            reportingDate: null,
            nextStep: "Final vision expected late 2026"
          },
          officialLinks: {
            primaryDocument: "https://yoursay.brisbane.qld.gov.au/kedron-brook-vision-and-master-plan",
            howToParticipate: "https://feedback.brisbane.qld.gov.au/jfe/form/SV_bw4ifg40BE1hX3U",
            committeeOrConsultPage: "https://yoursay.brisbane.qld.gov.au/kedron-brook-vision-and-master-plan"
          },
          participantInfo: null,
          topics: ["environment", "open-space", "planning"]
        },
        {
          id: "qld-brisbane-alderley-centre-srpp-2026",
          councilId: "brisbane",
          council: "Brisbane City Council",
          jurisdiction: "QLD",
          type: "Planning Consultation",
          status: "Open for submissions until 30 August 2026",
          title: "Alderley Centre Suburban Renewal Precinct Plan",
          shortNeutralSummary:
            "Brisbane City Council is consulting on the draft Alderley Centre Suburban Renewal Precinct Plan, covering housing choice, village vibrancy, subtropical design and transport connectivity. " +
            "Community consultation closes 11:59pm Sunday 30 August 2026.",
          keyDates: {
            opened: null,
            submissionsClose: "2026-08-30",
            reportingDate: null,
            nextStep: null
          },
          officialLinks: {
            primaryDocument: "https://yoursay.brisbane.qld.gov.au/alderleycentre-suburban-renewal-precinct-plan",
            howToParticipate: "https://yoursay.brisbane.qld.gov.au/alderleycentre-suburban-renewal-precinct-plan?tool=survey_tool",
            committeeOrConsultPage: "https://yoursay.brisbane.qld.gov.au/alderleycentre-suburban-renewal-precinct-plan"
          },
          participantInfo: null,
          topics: ["planning", "housing", "urban-renewal"]
        }
      ]
    },
    {
      code: "WA",
      name: "Western Australia",
      integrated: true,
      note:
        "Council consultations are published on individual local government engagement platforms. " +
        "Use the postcode or suburb search to find your council, then browse open items below.",
      portals: [
        { label: "City of Perth — Your Say Perth", url: "https://yoursay.perth.wa.gov.au/" },
        { label: "City of Fremantle — My Say Freo", url: "https://mysay.fremantle.wa.gov.au/" },
        { label: "City of Busselton — Your Say Busselton", url: "https://yoursay.busselton.wa.gov.au/" },
        { label: "City of Rockingham — Share Your Thoughts", url: "https://yourthoughts.rockingham.wa.gov.au/" },
        { label: "City of Kalgoorlie-Boulder — Your Say", url: "https://yoursay.ckb.wa.gov.au/" },
        { label: "WA Have Your Say (DPLH — planning)", url: "https://haveyoursay.dplh.wa.gov.au/" },
        { label: "WALGA Local Government Directory", url: "https://walga.asn.au/your-local-government/local-government-directory" }
      ],
      items: [
        {
          id: "wa-perth-community-infrastructure-plan-2026",
          councilId: "perth",
          council: "City of Perth",
          jurisdiction: "WA",
          type: "Departmental Consultation",
          status: "Open for submissions until 7 September 2026",
          title: "Draft Community Infrastructure Plan 2026–2036",
          shortNeutralSummary:
            "The City of Perth is consulting on its draft Community Infrastructure Plan 2026–2036. " +
            "A short survey is open from 17 August to 7 September 2026 on Your Say Perth.",
          keyDates: {
            opened: "2026-08-17",
            submissionsClose: "2026-09-07",
            reportingDate: null,
            nextStep: null
          },
          officialLinks: {
            primaryDocument: "https://yoursay.perth.wa.gov.au/draft-community-infrastructure-plan-2026-2036",
            howToParticipate: "https://yoursay.perth.wa.gov.au/draft-community-infrastructure-plan-2026-2036",
            committeeOrConsultPage: "https://yoursay.perth.wa.gov.au/"
          },
          participantInfo: null,
          topics: ["community", "infrastructure", "planning"]
        },
        {
          id: "wa-perth-transport-strategy-2026",
          councilId: "perth",
          council: "City of Perth",
          jurisdiction: "WA",
          type: "Departmental Consultation",
          status: "Open for submissions until 21 August 2026",
          title: "Connecting the City: Draft Transport Strategy",
          shortNeutralSummary:
            "The City of Perth is seeking feedback on the draft Connecting the City transport strategy to guide transport planning over the next decade. " +
            "The survey is open from 29 July to 21 August 2026.",
          keyDates: {
            opened: "2026-07-29",
            submissionsClose: "2026-08-21",
            reportingDate: null,
            nextStep: null
          },
          officialLinks: {
            primaryDocument: "https://yoursay.perth.wa.gov.au/connecting-city-draft-transport-strategy",
            howToParticipate: "https://yoursay.perth.wa.gov.au/connecting-city-draft-transport-strategy",
            committeeOrConsultPage: "https://yoursay.perth.wa.gov.au/"
          },
          participantInfo: null,
          topics: ["transport", "planning", "urban-design"]
        },
        {
          id: "wa-perth-lps3-2026",
          councilId: "perth",
          council: "City of Perth",
          jurisdiction: "WA",
          type: "Exposure Draft",
          status: "Open for submissions until 25 September 2026",
          title: "Draft Local Planning Scheme No. 3",
          shortNeutralSummary:
            "The City of Perth has released draft Local Planning Scheme No. 3 for public comment. " +
            "Submissions are open until 25 September 2026 on Your Say Perth.",
          keyDates: {
            opened: null,
            submissionsClose: "2026-09-25",
            reportingDate: null,
            nextStep: "Scheme requires Ministerial approval before gazettal"
          },
          officialLinks: {
            primaryDocument: "https://yoursay.perth.wa.gov.au/local-planning-scheme-no-3",
            howToParticipate: "https://yoursay.perth.wa.gov.au/local-planning-scheme-no-3",
            committeeOrConsultPage: "https://yoursay.perth.wa.gov.au/local-planning-scheme-no-3"
          },
          participantInfo: null,
          topics: ["planning", "housing", "heritage"]
        },
        {
          id: "wa-fremantle-crime-prevention-plan-2026",
          councilId: "fremantle",
          council: "City of Fremantle",
          jurisdiction: "WA",
          type: "Departmental Consultation",
          status: "Open for submissions until 13 September 2026",
          title: "Community Safety & Crime Prevention Plan 2026–2031",
          shortNeutralSummary:
            "The City of Fremantle is seeking feedback on its draft Community Safety and Crime Prevention Plan 2026–2031. " +
            "Council endorsed the draft for public comment on 12 August 2026.",
          keyDates: {
            opened: "2026-08-12",
            submissionsClose: "2026-09-13",
            reportingDate: null,
            nextStep: "Plan to return to Council for adoption after public comment"
          },
          officialLinks: {
            primaryDocument: "https://mysay.fremantle.wa.gov.au/crime-prevention-plan-2025-30",
            howToParticipate: "https://mysay.fremantle.wa.gov.au/crime-prevention-plan-2025-30/surveys/cscpp26-31-final-comment1",
            committeeOrConsultPage: "https://mysay.fremantle.wa.gov.au/crime-prevention-plan-2025-30"
          },
          participantInfo: null,
          topics: ["community-safety", "crime-prevention", "planning"]
        },
        {
          id: "wa-busselton-da26-0530",
          councilId: "busselton",
          council: "City of Busselton",
          jurisdiction: "WA",
          type: "Planning Consultation",
          status: "Open for submissions until 4 September 2026",
          title: "DA26/0530 — Single House (Outbuilding), Gambetta Road Yalyalup",
          shortNeutralSummary:
            "The City of Busselton is advertising development application DA26/0530 for a single house outbuilding at Gambetta Road, Yalyalup. " +
            "Written submissions close Friday 4 September 2026.",
          keyDates: {
            opened: "2026-08-18",
            submissionsClose: "2026-09-04",
            reportingDate: null,
            nextStep: null
          },
          officialLinks: {
            primaryDocument: "https://yoursay.busselton.wa.gov.au/da26-0530",
            howToParticipate: "https://yoursay.busselton.wa.gov.au/da26-0530",
            committeeOrConsultPage: "https://yoursay.busselton.wa.gov.au/"
          },
          participantInfo: null,
          topics: ["planning", "development", "housing"]
        },
        {
          id: "wa-rockingham-public-health-plan-2026",
          councilId: "rockingham",
          council: "City of Rockingham",
          jurisdiction: "WA",
          type: "Departmental Consultation",
          status: "Open for submissions until 4 September 2026",
          title: "Draft Public Health Plan 2026–2031",
          shortNeutralSummary:
            "The City of Rockingham is consulting on its draft Public Health Plan 2026–2031, developed under the Public Health Act 2016. " +
            "Submissions close 4.30pm Friday 4 September 2026.",
          keyDates: {
            opened: null,
            submissionsClose: "2026-09-04",
            reportingDate: null,
            nextStep: null
          },
          officialLinks: {
            primaryDocument: "https://yourthoughts.rockingham.wa.gov.au/draft-public-health-plan-2026-2031",
            howToParticipate: "https://yourthoughts.rockingham.wa.gov.au/draft-public-health-plan-2026-2031",
            committeeOrConsultPage: "https://yourthoughts.rockingham.wa.gov.au/"
          },
          participantInfo: null,
          topics: ["public-health", "community", "planning"]
        },
        {
          id: "wa-rockingham-standing-orders-local-law-2001",
          councilId: "rockingham",
          council: "City of Rockingham",
          jurisdiction: "WA",
          type: "Regulatory Consultation",
          status: "Open for submissions until 18 September 2026",
          title: "Review of Standing Orders Local Law 2001",
          shortNeutralSummary:
            "The City of Rockingham is reviewing its Standing Orders Local Law 2001 under section 3.16 of the Local Government Act 1995. " +
            "Submissions close 4pm Friday 18 September 2026.",
          keyDates: {
            opened: null,
            submissionsClose: "2026-09-18",
            reportingDate: null,
            nextStep: null
          },
          officialLinks: {
            primaryDocument: "https://yourthoughts.rockingham.wa.gov.au/public-notice-review-standing-orders-local-law-2001",
            howToParticipate: "https://yourthoughts.rockingham.wa.gov.au/public-notice-review-standing-orders-local-law-2001",
            committeeOrConsultPage: "https://yourthoughts.rockingham.wa.gov.au/"
          },
          participantInfo: null,
          topics: ["local-law", "governance", "regulation"]
        },
        {
          id: "wa-ckb-local-laws-review-2026",
          councilId: "kalgoorlie-boulder",
          council: "City of Kalgoorlie-Boulder",
          jurisdiction: "WA",
          type: "Regulatory Consultation",
          status: "Open for submissions until 11 September 2026",
          title: "Local Laws Review",
          shortNeutralSummary:
            "The City of Kalgoorlie-Boulder is reviewing nine local laws including dogs, cats, health, parking and public places laws. " +
            "Submissions must be received by 5pm Friday 11 September 2026.",
          keyDates: {
            opened: null,
            submissionsClose: "2026-09-11",
            reportingDate: null,
            nextStep: "Feedback informs future amendments before Council consideration"
          },
          officialLinks: {
            primaryDocument: "https://yoursay.ckb.wa.gov.au/local-laws-review",
            howToParticipate: "https://yoursay.ckb.wa.gov.au/local-laws-review",
            committeeOrConsultPage: "https://yoursay.ckb.wa.gov.au/"
          },
          participantInfo: null,
          topics: ["local-law", "regulation", "community"]
        }
      ]
    },
    {
      code: "SA",
      name: "South Australia",
      integrated: true,
      note:
        "Many SA councils use YourSAy or publish consultations on their own Have Your Say sites. " +
        "Coverage will grow as more councils are monitored.",
      portals: [
        { label: "YourSAy", url: "https://yoursay.sa.gov.au/" },
        {
          label: "Local Government Association of SA",
          url: "https://www.lga.sa.gov.au/"
        },
        { label: "City of Charles Sturt — Your Say", url: "https://www.yoursaycharlessturt.com.au/" },
        { label: "City of Onkaparinga — Your Say", url: "https://yoursay.onkaparinga.sa.gov.au/" },
        { label: "City of Adelaide — Our Adelaide", url: "https://ouradelaide.sa.gov.au/" }
      ],
      items: [
        {
          id: "sa-charlessturt-pedlar-morley-2026",
          councilId: "charles-sturt",
          council: "City of Charles Sturt",
          jurisdiction: "SA",
          type: "Community Consultation",
          status: "Open for submissions until 4 September 2026",
          title: "Let's Talk Pedlar and Morley",
          shortNeutralSummary:
            "City of Charles Sturt is seeking feedback on Pedlar Street and Morley Road in Seaton, including street appeal, trees, safety and active transport. " +
            "Survey and drop-in sessions close Friday 4 September 2026.",
          keyDates: {
            opened: null,
            submissionsClose: "2026-09-04",
            reportingDate: null,
            nextStep: null
          },
          officialLinks: {
            primaryDocument: "https://www.yoursaycharlessturt.com.au/pedlar-and-morley",
            howToParticipate: "https://www.yoursaycharlessturt.com.au/pedlar-and-morley/pedlar-morley-survey",
            committeeOrConsultPage: "https://www.yoursaycharlessturt.com.au/"
          },
          participantInfo: null,
          topics: ["transport", "urban-design", "community"]
        },
        {
          id: "sa-charlessturt-inlet-reserve-2026",
          councilId: "charles-sturt",
          council: "City of Charles Sturt",
          jurisdiction: "SA",
          type: "Proposed Works Consultation",
          status: "Open for submissions until 8 September 2026",
          title: "Inlet Reserve Play Space Renewal",
          shortNeutralSummary:
            "City of Charles Sturt is consulting on a proposed inclusive playground, fitness equipment and toilet upgrade at Inlet Reserve. " +
            "Feedback closes 11:59pm Tuesday 8 September 2026.",
          keyDates: {
            opened: null,
            submissionsClose: "2026-09-08",
            reportingDate: null,
            nextStep: null
          },
          officialLinks: {
            primaryDocument: "https://www.yoursaycharlessturt.com.au/inlet-reserve-play-space-renewal",
            howToParticipate: "https://www.yoursaycharlessturt.com.au/inlet-reserve-play-space-renewal/inlet-reserve-feedback-form",
            committeeOrConsultPage: "https://www.yoursaycharlessturt.com.au/"
          },
          participantInfo: null,
          topics: ["playground", "accessibility", "parks"]
        },
        {
          id: "sa-charlessturt-bulahdelah-reserve-2026",
          councilId: "charles-sturt",
          council: "City of Charles Sturt",
          jurisdiction: "SA",
          type: "Community Consultation",
          status: "Open for submissions until 3 September 2026",
          title: "Biodiversity Project — Bulahdelah Reserve",
          shortNeutralSummary:
            "City of Charles Sturt is sharing a draft concept plan to transform Bulahdelah Reserve in West Lakes Shore into a biodiverse landscape and seeking feedback. " +
            "Consultation closes 5pm Thursday 3 September 2026.",
          keyDates: {
            opened: null,
            submissionsClose: "2026-09-03",
            reportingDate: null,
            nextStep: null
          },
          officialLinks: {
            primaryDocument: "https://www.yoursaycharlessturt.com.au/bulahdelah-reserve",
            howToParticipate: "https://www.yoursaycharlessturt.com.au/bulahdelah-reserve/bulahdelah-reserve-stage-2-feedback",
            committeeOrConsultPage: "https://www.yoursaycharlessturt.com.au/"
          },
          participantInfo: null,
          topics: ["environment", "biodiversity", "parks"]
        },
        {
          id: "sa-onkaparinga-woodcroft-farm-2026",
          councilId: "onkaparinga",
          council: "City of Onkaparinga",
          jurisdiction: "SA",
          type: "Proposed Works Consultation",
          status: "Open for submissions until 31 August 2026",
          title: "Woodcroft Farm Reserve Upgrade",
          shortNeutralSummary:
            "City of Onkaparinga is consulting on a draft concept plan to upgrade Woodcroft Farm Reserve with new play equipment, shelters, barbecues and a public toilet. " +
            "Community engagement is open until 31 August 2026.",
          keyDates: {
            opened: "2026-08-09",
            submissionsClose: "2026-08-31",
            reportingDate: null,
            nextStep: "Final design expected to be shared on Your Say after engagement"
          },
          officialLinks: {
            primaryDocument: "https://yoursay.onkaparinga.sa.gov.au/woodcroft-farm-reserve-upgrade",
            howToParticipate: "https://yoursay.onkaparinga.sa.gov.au/woodcroft-farm-reserve-upgrade",
            committeeOrConsultPage: "https://yoursay.onkaparinga.sa.gov.au/"
          },
          participantInfo: null,
          topics: ["playground", "parks", "community"]
        },
        {
          id: "sa-onkaparinga-pine-road-intersection-2026",
          councilId: "onkaparinga",
          council: "City of Onkaparinga",
          jurisdiction: "SA",
          type: "Proposed Works Consultation",
          status: "Open for submissions until 6 September 2026",
          title: "Pine Road, Mark Street & Reynell Road Intersection Safety Improvements",
          shortNeutralSummary:
            "City of Onkaparinga is proposing raised safety platforms on Pine Road south of the Woodcroft intersection to address crash history. " +
            "Community feedback is open until 6 September 2026.",
          keyDates: {
            opened: null,
            submissionsClose: "2026-09-06",
            reportingDate: null,
            nextStep: "Detailed design and approvals subject to funding and feedback"
          },
          officialLinks: {
            primaryDocument: "https://yoursay.onkaparinga.sa.gov.au/pine-road-mark-street-reynell-road-intersection-safety-improvements",
            howToParticipate: "https://yoursay.onkaparinga.sa.gov.au/pine-road-mark-street-reynell-road-intersection-safety-improvements",
            committeeOrConsultPage: "https://yoursay.onkaparinga.sa.gov.au/"
          },
          participantInfo: null,
          topics: ["transport", "road-safety", "infrastructure"]
        }
      ]
    },
    {
      code: "TAS",
      name: "Tasmania",
      integrated: true,
      note:
        "Tasmanian councils publish consultations on council websites; state planning consultations use the planning portal. " +
        "Coverage will grow as more councils are monitored.",
      portals: [
        {
          label: "TAS State Planning — Have Your Say",
          url: "https://www.stateplanning.tas.gov.au/have-your-say"
        },
        {
          label: "Local Government Tasmania",
          url: "https://www.localgovernment.tas.gov.au/"
        },
        { label: "City of Hobart — Your Say Hobart", url: "https://yoursay.hobartcity.com.au/" },
        {
          label: "City of Launceston — Tomorrow Together",
          url: "https://tomorrowtogetherlaunceston.com.au/"
        },
        { label: "Clarence City Council — Your Say Clarence", url: "https://www.yoursay.ccc.tas.gov.au/" }
      ],
      items: [
        {
          id: "tas-hobart-new-town-parking-2026",
          councilId: "hobart",
          council: "City of Hobart",
          jurisdiction: "TAS",
          type: "Community Consultation",
          status: "Open for feedback",
          title: "New Town Retail Precinct — On-Street Parking Review",
          shortNeutralSummary:
            "City of Hobart is reviewing on-street parking on New Town Road and around Cross Street after retail precinct upgrade works. " +
            "Residents and businesses can share feedback via an interactive map, online form or email.",
          keyDates: {
            opened: null,
            submissionsClose: null,
            reportingDate: null,
            nextStep: null
          },
          officialLinks: {
            primaryDocument: "https://yoursay.hobartcity.com.au/new-town-retail-precinct-parking",
            howToParticipate: "https://yoursay.hobartcity.com.au/new-town-retail-precinct-parking",
            committeeOrConsultPage: "https://yoursay.hobartcity.com.au/"
          },
          participantInfo: null,
          topics: ["transport", "parking", "urban-design"]
        }
      ]
    },
    {
      code: "ACT",
      name: "Australian Capital Territory",
      integrated: true,
      note:
        "The ACT has no separate local councils; local and suburban consultations are published on YourSay Conversations. " +
        "Coverage will grow as more directorate projects are monitored.",
      portals: [
        {
          label: "YourSay Conversations",
          url: "https://www.yoursayconversations.act.gov.au/"
        }
      ],
      items: [
        {
          id: "act-local-shops-public-space-2026",
          councilId: "act-government",
          council: "ACT Government",
          jurisdiction: "ACT",
          type: "Community Consultation",
          status: "Open for feedback; Charnwood pop-ups until 12 September 2026",
          title: "Public Space Improvements at Local Shops (Charnwood, Erindale, Mawson)",
          shortNeutralSummary:
            "The ACT Government is consulting on prioritised public space improvements at Charnwood, Erindale and Mawson shops, including surveys and suburb pop-up sessions through September 2026.",
          keyDates: {
            opened: null,
            submissionsClose: "2026-09-12",
            reportingDate: null,
            nextStep: "Finalised priority areas expected in second half of 2026"
          },
          officialLinks: {
            primaryDocument: "https://yoursayconversations.act.gov.au/public-space-improvements-local-shops",
            howToParticipate: "https://yoursayconversations.act.gov.au/public-space-improvements-local-shops",
            committeeOrConsultPage: "https://yoursayconversations.act.gov.au/"
          },
          participantInfo: null,
          topics: ["urban-design", "community", "infrastructure"]
        },
        {
          id: "act-whitlam-school-logo-2026",
          councilId: "act-government",
          council: "ACT Government",
          jurisdiction: "ACT",
          type: "Community Consultation",
          status: "Open for submissions until 19 August 2026",
          title: "Whitlam School Logo Design Options",
          shortNeutralSummary:
            "The ACT Government is seeking community views on three logo design options for the new Whitlam School in Molonglo Valley, ahead of its planned 2027 opening. " +
            "Survey closes 19 August 2026.",
          keyDates: {
            opened: null,
            submissionsClose: "2026-08-19",
            reportingDate: null,
            nextStep: "Feedback will inform the final school logo design"
          },
          officialLinks: {
            primaryDocument: "https://yoursayconversations.act.gov.au/whitlam-school-logo",
            howToParticipate: "https://yoursayconversations.act.gov.au/whitlam-school-logo/whitlam-school-logo-survey",
            committeeOrConsultPage: "https://yoursayconversations.act.gov.au/"
          },
          participantInfo: null,
          topics: ["education", "community", "design"]
        }
      ]
    },
    {
      code: "NT",
      name: "Northern Territory",
      integrated: true,
      note:
        "Many NT local and regional consultations appear on NT Have Your Say; councils may also publish on their own Engage sites. " +
        "Coverage will grow as more councils are monitored.",
      portals: [
        { label: "NT Have Your Say", url: "https://haveyoursay.nt.gov.au/" },
        {
          label: "Local Government Association of the NT",
          url: "https://lgant.asn.au/"
        },
        { label: "City of Darwin — Engage Darwin", url: "https://engage.darwin.nt.gov.au/" },
        {
          label: "NT Local Government Representation Review 2026",
          url: "https://lgrr2026.com.au/"
        },
        { label: "Alice Springs Town Council", url: "https://www.alicesprings.nt.gov.au/consultations/community-engagement" },
        { label: "City of Palmerston", url: "https://www.palmerston.nt.gov.au/" }
      ],
      items: [
        {
          id: "nt-darwin-civic-centre-plaza-2026",
          councilId: "darwin",
          council: "City of Darwin",
          jurisdiction: "NT",
          type: "Community Consultation",
          status: "Open for submissions until 28 August 2026",
          title: "Civic Centre Community Plaza",
          shortNeutralSummary:
            "City of Darwin is consulting on a new community plaza connecting the new Civic Centre to the city centre, including how Galamarrma (Tree of Knowledge) is featured in the design. " +
            "Consultation runs 20 July to 4:00pm Friday 28 August 2026.",
          keyDates: {
            opened: "2026-07-20",
            submissionsClose: "2026-08-28",
            reportingDate: null,
            nextStep: "Feedback will inform the concept design for the community plaza"
          },
          officialLinks: {
            primaryDocument: "https://engage.darwin.nt.gov.au/community-plaza",
            howToParticipate: "https://engage.darwin.nt.gov.au/community-plaza/surveys/civic-centre-community-plaza-survey",
            committeeOrConsultPage: "https://engage.darwin.nt.gov.au/"
          },
          participantInfo: null,
          topics: ["urban-design", "community", "planning"]
        },
        {
          id: "nt-lgrr-2026-stage-1",
          councilId: "nt-lgrr",
          council: "NT Local Government Representation Review Committee",
          jurisdiction: "NT",
          type: "Regulatory Consultation",
          status: "Open for submissions until 21 August 2026",
          title: "NT Local Government Representation Review 2026 — Stage 1 Submissions",
          shortNeutralSummary:
            "The independent Local Government Representation Review Committee is seeking submissions on council boundaries and representation structures across all 18 NT local government areas. " +
            "Initial submissions close 21 August 2026.",
          keyDates: {
            opened: "2026-07-03",
            submissionsClose: "2026-08-21",
            reportingDate: "2026-08-22",
            nextStep: "Preliminary report expected 22 August 2026; second consultation round from 22 October 2026"
          },
          officialLinks: {
            primaryDocument: "https://haveyoursay.nt.gov.au/nt-local-government-representation-review-2",
            howToParticipate: "https://lgrr2026.com.au/submission/",
            committeeOrConsultPage: "https://haveyoursay.nt.gov.au/"
          },
          participantInfo: null,
          topics: ["governance", "local-government", "representation"]
        }
      ]
    }
  ]
};

window.LocalGovWatchData = { lastUpdated: localLastUpdated, localCoverage };
