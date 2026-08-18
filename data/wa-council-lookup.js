/**
 * WA local government lookup by postcode or suburb/city name.
 * Postcode boundaries can overlap or span multiple LGAs — always verify on official council sites.
 *
 * Sources: WALGA directory, published LGA boundary references.
 * Expand as more councils are monitored.
 */

const waCouncilRegistry = [
  {
    id: "perth",
    name: "City of Perth",
    engagementUrl: "https://yoursay.perth.wa.gov.au/",
    website: "https://perth.wa.gov.au/",
    postcodes: ["6000", "6003", "6004", "6005", "6006", "6007", "6008", "6837", "6838", "6843", "6844", "6845", "6846", "6847", "6848", "6849", "6850"],
    suburbs: [
      "Perth",
      "Perth CBD",
      "Northbridge",
      "East Perth",
      "West Perth",
      "Claisebrook",
      "Crawley",
      "Nedlands"
    ],
    aliases: ["perth city", "cbd"]
  },
  {
    id: "fremantle",
    name: "City of Fremantle",
    engagementUrl: "https://mysay.fremantle.wa.gov.au/",
    website: "https://www.fremantle.wa.gov.au/",
    postcodes: ["6158", "6160", "6162", "6163", "6164", "6959"],
    suburbs: [
      "Fremantle",
      "North Fremantle",
      "South Fremantle",
      "Beaconsfield",
      "White Gum Valley",
      "Hilton",
      "O'Connor",
      "Samson",
      "Walyalup"
    ],
    aliases: ["freo"]
  },
  {
    id: "rockingham",
    name: "City of Rockingham",
    engagementUrl: "https://yourthoughts.rockingham.wa.gov.au/",
    website: "https://rockingham.wa.gov.au/",
    postcodes: ["6167", "6168", "6169", "6171", "6172", "6173", "6174", "6175", "6176", "6180", "6181", "6182"],
    suburbs: [
      "Rockingham",
      "Baldivis",
      "Port Kennedy",
      "Secret Harbour",
      "Waikiki",
      "Warnbro",
      "Safety Bay",
      "Golden Bay",
      "Cooloongup",
      "Karnup",
      "Hillman",
      "Shoalwater",
      "Singleton"
    ],
    aliases: []
  },
  {
    id: "busselton",
    name: "City of Busselton",
    engagementUrl: "https://yoursay.busselton.wa.gov.au/",
    website: "https://www.busselton.wa.gov.au/",
    postcodes: ["6280", "6281", "6284", "6285", "6286"],
    suburbs: [
      "Busselton",
      "Dunsborough",
      "Yallingup",
      "Vasse",
      "Broadwater",
      "West Busselton",
      "Yalyalup",
      "Quindalup"
    ],
    aliases: []
  },
  {
    id: "kalgoorlie-boulder",
    name: "City of Kalgoorlie-Boulder",
    engagementUrl: "https://yoursay.ckb.wa.gov.au/",
    website: "https://www.ckb.wa.gov.au/",
    postcodes: ["6430", "6432", "6433", "6434", "6436", "6438", "6440"],
    suburbs: [
      "Kalgoorlie",
      "Boulder",
      "South Kalgoorlie",
      "Hannans",
      "Lamington",
      "Williamstown",
      "Kalgoorlie-Boulder"
    ],
    aliases: ["kgb", "kalgoorlie boulder"]
  },
  {
    id: "wanneroo",
    name: "City of Wanneroo",
    engagementUrl: "https://www.wanneroo.wa.gov.au/community-and-recreation/community-engagement",
    website: "https://www.wanneroo.wa.gov.au/",
    postcodes: ["6030", "6031", "6032", "6033", "6034", "6035", "6036", "6037", "6038", "6065", "6069", "6076", "6077", "6078"],
    suburbs: [
      "Wanneroo",
      "Clarkson",
      "Butler",
      "Mindarie",
      "Quinns Rocks",
      "Yanchep",
      "Two Rocks",
      "Carramar",
      "Tapping",
      "Ashby",
      "Sinagra",
      "Alkimos",
      "Eglinton",
      "Merriwa",
      "Ridgewood"
    ],
    aliases: []
  },
  {
    id: "stirling",
    name: "City of Stirling",
    engagementUrl: "https://www.stirling.wa.gov.au/community-and-recreation/community-engagement",
    website: "https://www.stirling.wa.gov.au/",
    postcodes: ["6017", "6018", "6019", "6020", "6021", "6022", "6023", "6025", "6027", "6050", "6059", "6061", "6062", "6063", "6064"],
    suburbs: [
      "Stirling",
      "Scarborough",
      "Innaloo",
      "Osborne Park",
      "Balcatta",
      "Dianella",
      "Mirrabooka",
      "Nollamara",
      "Karrinyup",
      "Gwelup",
      "Hamersley",
      "Carine",
      "Trigg",
      "Watermans Bay",
      "Joondanna",
      "Tuart Hill"
    ],
    aliases: []
  },
  {
    id: "joondalup",
    name: "City of Joondalup",
    engagementUrl: "https://www.joondalup.wa.gov.au/kb/community/community-engagement",
    website: "https://www.joondalup.wa.gov.au/",
    postcodes: ["6027", "6028", "6030", "6065", "6068", "6069", "6076", "6077"],
    suburbs: [
      "Joondalup",
      "Currambine",
      "Kinross",
      "Burns Beach",
      "Iluka",
      "Heathridge",
      "Mullaloo",
      "Ocean Reef",
      "Edgewater",
      "Beldon"
    ],
    aliases: []
  }
];

function normalizeLookupText(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function findWaCouncils(query) {
  const trimmed = query.trim();
  if (!trimmed) return [];

  if (/^\d{4}$/.test(trimmed)) {
    return waCouncilRegistry.filter((council) => council.postcodes.includes(trimmed));
  }

  const normalized = normalizeLookupText(trimmed);
  return waCouncilRegistry.filter((council) => {
    const names = [
      council.name,
      ...council.suburbs,
      ...council.aliases
    ].map(normalizeLookupText);
    return names.some((name) => name === normalized || name.includes(normalized) || normalized.includes(name));
  });
}

window.WaCouncilLookup = {
  councils: waCouncilRegistry,
  findWaCouncils,
  walgaDirectoryUrl: "https://walga.asn.au/your-local-government/local-government-directory"
};
