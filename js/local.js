(function () {
  "use strict";

  const loader = window.LegislationWatchLoader;
  const calendar = window.LegislationWatchCalendar;
  if (!loader) {
    console.error("Local gov page: js/data-loader.js must load before js/local.js");
    return;
  }

  const DATA_PATH = "data/local-data.js";
  const PEEK_FIELD = "localLastUpdated";
  const AREA_STORAGE_KEY = "legislation-watch-selected-area";

  let lastUpdated = null;
  let localCoverage = null;
  let states = [];
  let scrapedAt = null;
  let clientRefreshedAt = null;
  let uiReady = false;

  const waLookup = window.WaCouncilLookup;

  const STATE_ORDER = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];
  const THEME_KEY = "legislation-watch-theme";

  let activeState = readInitialState();
  let areaQuery = "";
  let matchedCouncils = [];
  let selectedCouncilId = null;

  const externalIcon = `
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M10 2h4v4h-1.5V4.56l-5.94 5.94-1.06-1.06L11.44 3.5H10V2z"/>
      <path fill="currentColor" d="M13 8.5V13H3V3h4.5V1.5H3a1.5 1.5 0 0 0-1.5 1.5v10A1.5 1.5 0 0 0 3 14.5h10a1.5 1.5 0 0 0 1.5-1.5V8.5H13z"/>
    </svg>`;

  function readInitialState() {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("state")?.toUpperCase();
    if (fromQuery && STATE_ORDER.includes(fromQuery)) return fromQuery;
    return "WA";
  }

  function formatDate(isoDate) {
    if (!isoDate) return null;
    return new Date(isoDate + "T12:00:00").toLocaleDateString("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  function daysUntil(isoDate) {
    if (!isoDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(isoDate + "T12:00:00");
    return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  }

  function getStateConfig(code) {
    return states.find((state) => state.code === code) || states[0];
  }

  function getSelectedCouncil() {
    if (!selectedCouncilId || !waLookup) return null;
    return waLookup.getCouncilById(selectedCouncilId);
  }

  function saveSelectedArea() {
    if (!selectedCouncilId || !areaQuery) return;
    localStorage.setItem(
      AREA_STORAGE_KEY,
      JSON.stringify({ state: activeState, query: areaQuery, councilId: selectedCouncilId })
    );
  }

  function restoreSelectedArea() {
    try {
      const raw = localStorage.getItem(AREA_STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      if (saved.state === "WA" && saved.query && saved.councilId) {
        areaQuery = saved.query;
        selectedCouncilId = saved.councilId;
        const input = document.getElementById("local-area-input");
        if (input) input.value = saved.query;
        document.getElementById("local-area-clear")?.classList.remove("hidden");
      }
    } catch {
      /* ignore */
    }
  }

  function hasVerifiedListings(stateConfig) {
    return Boolean(stateConfig?.integrated) && (stateConfig?.items || []).length > 0;
  }

  function isCoverageBuilding(stateConfig) {
    return !hasVerifiedListings(stateConfig);
  }

  function filterItems(items) {
    if (selectedCouncilId) {
      return items.filter((item) => item.councilId === selectedCouncilId);
    }
    if (matchedCouncils.length > 0) {
      const ids = matchedCouncils.map((c) => c.id);
      return items.filter((item) => ids.includes(item.councilId));
    }
    return items;
  }

  function countItemsForCouncil(councilId, items) {
    return items.filter((item) => item.councilId === councilId).length;
  }

  function renderCalendarActions(item) {
    if (!calendar || !item.keyDates?.submissionsClose) return "";
    return calendar.renderCalendarButtons({
      title: item.title,
      isoCloseDate: item.keyDates.submissionsClose,
      participateUrl: item.officialLinks?.howToParticipate || item.officialLinks?.primaryDocument,
      description: item.shortNeutralSummary
    });
  }

  function renderOfficialLinks(item) {
    const links = item.officialLinks || {};
    const rows = [
      links.primaryDocument ? `<li><a href="${links.primaryDocument}" target="_blank" rel="noopener noreferrer">Official project page ${externalIcon}</a></li>` : "",
      links.howToParticipate ? `<li><a href="${links.howToParticipate}" target="_blank" rel="noopener noreferrer">How to participate ${externalIcon}</a></li>` : "",
      links.committeeOrConsultPage ? `<li><a href="${links.committeeOrConsultPage}" target="_blank" rel="noopener noreferrer">Council engagement hub ${externalIcon}</a></li>` : ""
    ].filter(Boolean);
    if (!rows.length) return "";
    return `<ul class="local-card__links">${rows.join("")}</ul>`;
  }

  function renderLocalCard(item) {
    const participateUrl = item.officialLinks?.howToParticipate || item.officialLinks?.primaryDocument;
    const closeDate = item.keyDates?.submissionsClose;
    const days = daysUntil(closeDate);
    const closingSoon = closeDate && days !== null && days >= 0 && days <= 14;

    const statusBadge = item.status
      ? `<span class="badge badge--status">${item.status}</span>`
      : closingSoon
        ? `<span class="badge badge--closing">Closing soon</span>`
        : "";

    const keyDatesList = [
      item.keyDates?.opened ? `<li><strong>Opened</strong> ${formatDate(item.keyDates.opened)}</li>` : "",
      closeDate ? `<li><strong>Submissions close</strong> ${formatDate(closeDate)}</li>` : "",
      item.keyDates?.reportingDate ? `<li><strong>Report due</strong> ${formatDate(item.keyDates.reportingDate)}</li>` : "",
      item.keyDates?.nextStep ? `<li><strong>Next step</strong> ${item.keyDates.nextStep}</li>` : ""
    ]
      .filter(Boolean)
      .join("");

    const participantLine =
      item.participantInfo && item.participantInfo.submissionsReceived != null
        ? `<p class="participant-line participant-line--reported">${item.participantInfo.submissionsReceived.toLocaleString("en-AU")} submissions — ${item.participantInfo.note || "publicly reported"}</p>`
        : `<p class="participant-line">Participant numbers not publicly reported</p>`;

    const topicTags = (item.topics || []).map((t) => `<span class="topic-tag">${t}</span>`).join("");

    const cta = participateUrl
      ? `<a class="btn-participate" href="${participateUrl}" target="_blank" rel="noopener noreferrer">
            How to participate ${externalIcon}
          </a>`
      : "";

    return `
      <article class="upcoming-card local-card${closingSoon ? " upcoming-card--closing-soon" : ""}" data-id="${item.id}" data-close-date="${closeDate || ""}">
        <div class="upcoming-card__body">
          <div class="upcoming-card__meta">
            <span class="badge badge--jurisdiction">${item.jurisdiction || activeState}</span>
            <span class="badge badge--type">${item.type || "Consultation"}</span>
            ${item.council ? `<span class="badge badge--type">${item.council}</span>` : ""}
            ${statusBadge}
          </div>
          <h3 class="upcoming-card__title">${item.title}</h3>
          <p class="upcoming-card__summary">${item.shortNeutralSummary}</p>
          ${keyDatesList ? `<ul class="key-dates">${keyDatesList}</ul>` : ""}
          ${participantLine}
          ${renderOfficialLinks(item)}
          ${topicTags ? `<div class="topic-tags">${topicTags}</div>` : ""}
          ${renderCalendarActions(item)}
        </div>
        ${cta ? `<div class="upcoming-card__cta">${cta}</div>` : ""}
      </article>`;
  }

  function renderRepresentativeSection(reps, label) {
    if (!reps) return "";
    const rows = [];
    if (reps.council) {
      rows.push(`<li><strong>${reps.council.label}</strong> — <a href="${reps.council.councillorsUrl}" target="_blank" rel="noopener noreferrer">Councillors</a> · <a href="${reps.council.mayorUrl}" target="_blank" rel="noopener noreferrer">Mayor</a> · <a href="${reps.council.contactUrl}" target="_blank" rel="noopener noreferrer">Contact</a>${reps.council.phone ? ` · ${reps.council.phone}` : ""}</li>`);
    }
    if (reps.state) {
      rows.push(`<li><strong>State MP</strong> (${reps.state.electorate}) — <a href="${reps.state.findMpUrl}" target="_blank" rel="noopener noreferrer">Find your WA member ${externalIcon}</a></li>`);
    }
    if (reps.federal) {
      rows.push(`<li><strong>Federal MP</strong> (${reps.federal.electorate}) — <a href="${reps.federal.findMpUrl}" target="_blank" rel="noopener noreferrer">Find your electorate ${externalIcon}</a></li>`);
    }
    return `<ul class="area-profile__reps">${rows.join("")}</ul>`;
  }

  function renderAreaProfile(council, items) {
    const profileEl = document.getElementById("local-area-profile");
    if (!profileEl || !council) {
      profileEl?.classList.add("hidden");
      return;
    }

    const openCount = countItemsForCouncil(council.id, items);
    const reps = council.representatives;
    const scrapeNote = scrapedAt
      ? `<p class="area-profile__scrape">Official portals last checked ${new Date(scrapedAt).toLocaleString("en-AU")}.</p>`
      : "";

    profileEl.classList.remove("hidden");
    profileEl.innerHTML = `
      <article class="area-profile">
        <header class="area-profile__header">
          <p class="area-profile__eyebrow">Your area</p>
          <h3 class="area-profile__title">${areaQuery}${/^\d{4}$/.test(areaQuery) ? "" : ""} · ${council.name}</h3>
          <p class="area-profile__lead">${openCount} open consultation${openCount === 1 ? "" : "s"} listed here. Always verify on official council pages.</p>
        </header>
        <section class="area-profile__section" aria-labelledby="area-reps-heading">
          <h4 id="area-reps-heading" class="area-profile__section-title">Local representatives</h4>
          ${renderRepresentativeSection(reps)}
          <p class="area-profile__note">Electorate names are indicative — confirm your ward councillor and MPs on the official links above.</p>
        </section>
        <section class="area-profile__section" aria-labelledby="area-participate-heading">
          <h4 id="area-participate-heading" class="area-profile__section-title">Participate locally</h4>
          <p class="area-profile__links">
            <a href="${council.engagementUrl}" target="_blank" rel="noopener noreferrer">Council consultations &amp; engagement ${externalIcon}</a>
            ·
            <a href="${council.website}" target="_blank" rel="noopener noreferrer">Council website ${externalIcon}</a>
          </p>
        </section>
        ${scrapeNote}
        <button type="button" class="chip area-profile__change" id="change-area-btn">Change area</button>
      </article>`;

    document.getElementById("change-area-btn")?.addEventListener("click", () => {
      selectedCouncilId = null;
      localStorage.removeItem(AREA_STORAGE_KEY);
      render();
    });
  }

  function renderCouncilSelection(stateConfig) {
    const resultEl = document.getElementById("local-council-result");
    if (!resultEl) return;

    if (activeState !== "WA" || !waLookup) {
      resultEl.classList.add("hidden");
      resultEl.innerHTML = "";
      return;
    }

    if (!areaQuery) {
      resultEl.classList.add("hidden");
      resultEl.innerHTML = "";
      return;
    }

    resultEl.classList.remove("hidden");
    const items = stateConfig.items || [];

    if (matchedCouncils.length === 0) {
      resultEl.innerHTML = `
        <div class="local-council-result__box local-council-result__box--empty">
          <p class="local-council-result__lead">No council match for “${areaQuery}” in our WA lookup yet.</p>
          <p class="local-council-result__sub">
            Try a 4-digit postcode or suburb name, or use the
            <a href="${waLookup.walgaDirectoryUrl}" target="_blank" rel="noopener noreferrer">WALGA Local Government Directory</a>.
          </p>
        </div>`;
      return;
    }

    if (matchedCouncils.length > 1 && !selectedCouncilId) {
      const options = matchedCouncils
        .map(
          (council) => `
          <button type="button" class="area-select-card" data-council-id="${council.id}">
            <span class="area-select-card__name">${council.name}</span>
            <span class="area-select-card__meta">${countItemsForCouncil(council.id, items)} listed consultation${countItemsForCouncil(council.id, items) === 1 ? "" : "s"}</span>
            <span class="area-select-card__hint">Select if this is your council</span>
          </button>`
        )
        .join("");

      resultEl.innerHTML = `
        <div class="local-council-result__box">
          <p class="local-council-result__lead">Postcode ${areaQuery} can fall within more than one council area. Select yours:</p>
          <div class="area-select-grid" role="list">${options}</div>
        </div>`;

      resultEl.querySelectorAll(".area-select-card").forEach((btn) => {
        btn.addEventListener("click", () => {
          selectedCouncilId = btn.dataset.councilId;
          saveSelectedArea();
          render();
        });
      });
      return;
    }

    if (!selectedCouncilId && matchedCouncils.length === 1) {
      selectedCouncilId = matchedCouncils[0].id;
      saveSelectedArea();
    }

    resultEl.innerHTML = "";
    resultEl.classList.add("hidden");
  }

  function renderPortals(stateConfig) {
    const portals = (stateConfig.portals || [])
      .map(
        (portal) =>
          `<li><a href="${portal.url}" target="_blank" rel="noopener noreferrer">${portal.label}</a></li>`
      )
      .join("");

    return `
      <aside class="local-portals__box">
        <h3 class="local-portals__title">Official sources — ${stateConfig.name}</h3>
        <p class="local-portals__note">${stateConfig.note}</p>
        <ul class="local-portals__links">${portals}</ul>
        <p class="local-portals__coming">${localCoverage.message}</p>
      </aside>`;
  }

  function renderStateTabs() {
    const tabsEl = document.getElementById("local-state-tabs");
    tabsEl.innerHTML = STATE_ORDER.filter((code) => states.some((s) => s.code === code))
      .map((code) => {
        const stateConfig = getStateConfig(code);
        const count = (stateConfig.items || []).length;
        const countLabel = count > 0 ? ` <span class="state-tab__count">(${count})</span>` : "";
        const selected = code === activeState;
        return `
          <button
            type="button"
            class="state-tab${selected ? " state-tab--active" : ""}"
            role="tab"
            id="local-tab-${code}"
            aria-selected="${selected}"
            data-state="${code}"
          >${code}${countLabel}</button>`;
      })
      .join("");

    const searchPanel = document.getElementById("local-search-panel");
    if (searchPanel) {
      searchPanel.classList.toggle("hidden", activeState !== "WA");
    }
  }

  function updateUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set("state", activeState);
    if (areaQuery) url.searchParams.set("area", areaQuery);
    else url.searchParams.delete("area");
    if (selectedCouncilId) url.searchParams.set("council", selectedCouncilId);
    else url.searchParams.delete("council");
    window.history.replaceState({}, "", url);
  }

  function resultsLabel(stateConfig, visibleItems) {
    if (selectedCouncilId && areaQuery) {
      const council = getSelectedCouncil();
      if (visibleItems.length === 0) {
        return `No listed open consultations for ${council?.name || "your council"} — check the engagement portal above`;
      }
      return `${visibleItems.length} open consultation${visibleItems.length === 1 ? "" : "s"} for ${council?.name || "your area"}`;
    }

    if (visibleItems.length > 0) {
      return `Showing ${visibleItems.length} open council consultation${visibleItems.length === 1 ? "" : "s"} in ${stateConfig.name}`;
    }

    if (isCoverageBuilding(stateConfig)) {
      return `Local coverage for ${stateConfig.name} is still being built — use the official sources below`;
    }

    return `No open council consultations listed for ${stateConfig.name} right now`;
  }

  function render() {
    const stateConfig = getStateConfig(activeState);
    const allItems = stateConfig.items || [];
    const visibleItems = filterItems(allItems);
    const listEl = document.getElementById("local-list");
    const emptyEl = document.getElementById("local-empty");
    const portalsEl = document.getElementById("local-portals");
    const countEl = document.getElementById("local-results-count");

    renderStateTabs();

    if (activeState === "WA" && waLookup && areaQuery) {
      matchedCouncils = waLookup.findWaCouncils(areaQuery);
    } else {
      matchedCouncils = [];
      selectedCouncilId = null;
    }

    renderCouncilSelection(stateConfig);

    const council = getSelectedCouncil();
    renderAreaProfile(council, allItems);

    listEl.innerHTML = visibleItems.map(renderLocalCard).join("");
    if (calendar) calendar.setupCalendarDownloads(listEl);

    portalsEl.innerHTML = renderPortals(stateConfig);

    const showList = selectedCouncilId || (matchedCouncils.length <= 1 && areaQuery) || (!areaQuery && visibleItems.length > 0);
    const hasItems = visibleItems.length > 0;
    listEl.classList.toggle("hidden", !showList || !hasItems);
    emptyEl.classList.toggle("hidden", !showList || hasItems);

    if (showList && !hasItems) {
      if (selectedCouncilId && areaQuery) {
        emptyEl.innerHTML = `
          <p class="empty-state__lead">No open consultations listed for your council right now.</p>
          <p class="empty-state__sub">Check the council engagement portal in your area card — we monitor official sites automatically and add verified items as they appear.</p>`;
      } else if (isCoverageBuilding(stateConfig)) {
        emptyEl.innerHTML = `
          <p class="empty-state__lead">Local consultation coverage for ${stateConfig.name} is still being built.</p>
          <p class="empty-state__sub">Use the official sources above to find open consultations on council and regional engagement sites.</p>`;
      } else {
        emptyEl.innerHTML = `<p class="empty-state__lead">No open council consultations listed for ${stateConfig.name} right now.</p>`;
      }
    }

    countEl.textContent = resultsLabel(stateConfig, visibleItems);
    updateUrl();
  }

  function applyAreaSearch(query) {
    areaQuery = query.trim();
    selectedCouncilId = null;
    localStorage.removeItem(AREA_STORAGE_KEY);
    const clearBtn = document.getElementById("local-area-clear");
    if (clearBtn) clearBtn.classList.toggle("hidden", !areaQuery);

    if (activeState !== "WA" || !waLookup || !areaQuery) {
      matchedCouncils = [];
      render();
      return;
    }

    matchedCouncils = waLookup.findWaCouncils(areaQuery);
    if (matchedCouncils.length === 1) {
      selectedCouncilId = matchedCouncils[0].id;
      saveSelectedArea();
    }
    render();
  }

  function setupStateTabs() {
    document.getElementById("local-state-tabs")?.addEventListener("click", (event) => {
      const tab = event.target.closest(".state-tab");
      if (!tab) return;
      activeState = tab.dataset.state;
      if (activeState !== "WA") {
        areaQuery = "";
        selectedCouncilId = null;
        matchedCouncils = [];
        localStorage.removeItem(AREA_STORAGE_KEY);
        const input = document.getElementById("local-area-input");
        if (input) input.value = "";
        document.getElementById("local-area-clear")?.classList.add("hidden");
      }
      render();
    });
  }

  function setupAreaSearch() {
    const input = document.getElementById("local-area-input");
    const clearBtn = document.getElementById("local-area-clear");
    if (!input) return;

    input.addEventListener("input", () => applyAreaSearch(input.value));
    clearBtn?.addEventListener("click", () => {
      input.value = "";
      applyAreaSearch("");
      input.focus();
    });

    restoreSelectedArea();
    const params = new URLSearchParams(window.location.search);
    const area = params.get("area");
    const council = params.get("council");
    if (area && activeState === "WA") {
      input.value = area;
      areaQuery = area;
      matchedCouncils = waLookup?.findWaCouncils(area) || [];
      if (council && matchedCouncils.some((c) => c.id === council)) {
        selectedCouncilId = council;
      } else if (matchedCouncils.length === 1) {
        selectedCouncilId = matchedCouncils[0].id;
      }
      document.getElementById("local-area-clear")?.classList.remove("hidden");
    }
  }

  function setupThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    const label = toggle.querySelector(".theme-toggle__label");

    function applyTheme(theme) {
      const isDark = theme === "dark";
      document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
      toggle.setAttribute("aria-pressed", String(isDark));
      toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
      if (label) label.textContent = isDark ? "Light" : "Dark";
      localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
    }

    applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
    toggle.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      applyTheme(isDark ? "light" : "dark");
    });
  }

  function renderDataFreshness() {
    const dateEl = document.getElementById("local-last-updated");
    if (!dateEl) return;

    if (!lastUpdated) {
      dateEl.textContent = "Consultation data unavailable";
      return;
    }

    const formatted = formatDate(lastUpdated);
    const refreshedLabel = clientRefreshedAt
      ? clientRefreshedAt.toLocaleString("en-AU", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit"
        })
      : null;

    dateEl.textContent = refreshedLabel
      ? `Data last updated: ${formatted} · Loaded ${refreshedLabel}`
      : `Data last updated: ${formatted}`;
  }

  function applyData(data) {
    lastUpdated = data.lastUpdated;
    localCoverage = data.localCoverage;
    states = localCoverage?.states || [];
    scrapedAt = data.scrapedAt || null;
    clientRefreshedAt = new Date();

    const intro = document.getElementById("local-intro");
    if (intro && localCoverage?.message) {
      intro.textContent =
        "Enter your postcode or suburb to see your council, local representatives, and open consultations you can participate in.";
    }

    renderDataFreshness();
    render();
  }

  function setRefreshButtonState(state) {
    const btn = document.getElementById("refresh-data-btn");
    if (!btn) return;
    btn.disabled = state === "loading";
    btn.classList.toggle("btn-refresh--success", state === "success");
    if (state === "loading") {
      btn.textContent = "Refreshing…";
    } else if (state === "success") {
      btn.textContent = "Up to date";
      window.setTimeout(() => {
        btn.classList.remove("btn-refresh--success");
        btn.textContent = "Refresh data";
      }, 2500);
    } else {
      btn.textContent = "Refresh data";
    }
  }

  async function reloadData(options = {}) {
    const { manual = false, silent = false } = options;
    const dateEl = document.getElementById("local-last-updated");

    try {
      if (manual) setRefreshButtonState("loading");
      else if (!silent && dateEl) dateEl.textContent = "Loading consultations…";

      if (silent && lastUpdated) {
        const remoteDate = await loader.peekLastUpdated(DATA_PATH, PEEK_FIELD);
        if (remoteDate === lastUpdated) return;
      }

      const data = await loader.loadLocalGovData();
      applyData(data);

      if (manual) setRefreshButtonState("success");
    } catch (error) {
      console.error("Local gov page: failed to load data", error);
      if (dateEl && !lastUpdated) dateEl.textContent = "Could not load consultation data";
      if (manual) {
        setRefreshButtonState("idle");
        window.alert("Could not refresh data. Check your connection and try again.");
      }
    }
  }

  function setupDataRefresh() {
    document.getElementById("refresh-data-btn")?.addEventListener("click", () => {
      reloadData({ manual: true });
    });

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && uiReady) {
        reloadData({ silent: true });
      }
    });
  }

  async function bootstrap() {
    document.getElementById("current-year").textContent = new Date().getFullYear();
    setupStateTabs();
    setupAreaSearch();
    setupThemeToggle();
    setupDataRefresh();
    uiReady = true;
    await reloadData();
    if (areaQuery && activeState === "WA") render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => bootstrap());
  } else {
    bootstrap();
  }
})();
