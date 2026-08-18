(function () {
  "use strict";

  const loader = window.LegislationWatchLoader;
  if (!loader) {
    console.error("Local gov page: js/data-loader.js must load before js/local.js");
    return;
  }

  const DATA_PATH = "data/local-data.js";
  const DATA_EXPORT = "LocalGovWatchData";
  const PEEK_FIELD = "localLastUpdated";

  let lastUpdated = null;
  let localCoverage = null;
  let states = [];
  let clientRefreshedAt = null;
  let uiReady = false;

  const waLookup = window.WaCouncilLookup;

  const STATE_ORDER = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];
  const THEME_KEY = "legislation-watch-theme";

  let activeState = readInitialState();
  let activeCouncilIds = null;
  let areaQuery = "";

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

  function getStateConfig(code) {
    return states.find((state) => state.code === code) || states[0];
  }

  function hasVerifiedListings(stateConfig) {
    return Boolean(stateConfig?.integrated) && (stateConfig?.items || []).length > 0;
  }

  function isCoverageBuilding(stateConfig) {
    return !hasVerifiedListings(stateConfig);
  }

  function filterItems(items) {
    if (!activeCouncilIds || activeCouncilIds.length === 0) return items;
    return items.filter((item) => activeCouncilIds.includes(item.councilId));
  }

  function countItemsForCouncil(councilId, items) {
    return items.filter((item) => item.councilId === councilId).length;
  }

  function renderLocalCard(item) {
    const participateUrl = item.officialLinks?.howToParticipate || item.officialLinks?.primaryDocument;
    const council = item.council ? `<span class="badge badge--type">${item.council}</span>` : "";
    const closeDate = item.keyDates?.submissionsClose;
    const deadline = closeDate
      ? `<p class="local-card__deadline">Submissions close ${formatDate(closeDate)}</p>`
      : `<p class="local-card__deadline">No fixed closing date — check the official page</p>`;

    const cta = participateUrl
      ? `<a class="btn-participate" href="${participateUrl}" target="_blank" rel="noopener noreferrer">
            How to participate ${externalIcon}
          </a>`
      : "";

    return `
      <article class="upcoming-card local-card">
        <div class="upcoming-card__body">
          <div class="upcoming-card__meta">
            <span class="badge badge--jurisdiction">${item.jurisdiction || activeState}</span>
            ${council}
          </div>
          <h3 class="upcoming-card__title">${item.title}</h3>
          <p class="upcoming-card__summary">${item.shortNeutralSummary}</p>
          ${deadline}
        </div>
        ${cta ? `<div class="upcoming-card__cta">${cta}</div>` : ""}
      </article>`;
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

  function renderCouncilResult(councils, stateConfig) {
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

    if (councils.length === 0) {
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

    const items = stateConfig.items || [];
    const cards = councils
      .map((council) => {
        const openCount = countItemsForCouncil(council.id, items);
        const countLabel =
          openCount > 0
            ? `${openCount} open consultation${openCount === 1 ? "" : "s"} listed here`
            : "No open consultations listed here yet — check the council portal";

        return `
          <div class="local-council-result__box">
            <h3 class="local-council-result__name">${council.name}</h3>
            <p class="local-council-result__meta">${countLabel}</p>
            <p class="local-council-result__links">
              <a href="${council.engagementUrl}" target="_blank" rel="noopener noreferrer">Council engagement portal</a>
              ·
              <a href="${council.website}" target="_blank" rel="noopener noreferrer">Council website</a>
            </p>
          </div>`;
      })
      .join("");

    const multiNote =
      councils.length > 1
        ? `<p class="local-council-result__note">Postcodes can span more than one local government area. Verify on the official council site.</p>`
        : "";

    resultEl.innerHTML = cards + multiNote;
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
    window.history.replaceState({}, "", url);
  }

  function resultsLabel(stateConfig, visibleItems, allItems) {
    if (activeCouncilIds && activeCouncilIds.length > 0 && areaQuery) {
      if (visibleItems.length === 0) {
        return `No listed open consultations for your council search in ${stateConfig.name}`;
      }
      return `Showing ${visibleItems.length} consultation${visibleItems.length === 1 ? "" : "s"} for your council search`;
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

    const matchedCouncils =
      activeState === "WA" && waLookup && areaQuery ? waLookup.findWaCouncils(areaQuery) : [];
    renderCouncilResult(matchedCouncils, stateConfig);

    listEl.innerHTML = visibleItems.map(renderLocalCard).join("");
    portalsEl.innerHTML = renderPortals(stateConfig);

    const hasItems = visibleItems.length > 0;
    listEl.classList.toggle("hidden", !hasItems);
    emptyEl.classList.toggle("hidden", hasItems);

    if (!hasItems) {
      if (activeCouncilIds && areaQuery) {
        emptyEl.innerHTML = `
          <p class="empty-state__lead">No open consultations listed for your council search right now.</p>
          <p class="empty-state__sub">Check the council engagement portal above — coverage grows as we monitor more sites.</p>`;
      } else if (isCoverageBuilding(stateConfig)) {
        emptyEl.innerHTML = `
          <p class="empty-state__lead">Local consultation coverage for ${stateConfig.name} is still being built.</p>
          <p class="empty-state__sub">Use the official sources above to find open consultations on council and regional engagement sites.</p>`;
      } else {
        emptyEl.innerHTML = `<p class="empty-state__lead">No open council consultations listed for ${stateConfig.name} right now.</p>`;
      }
    }

    countEl.textContent = resultsLabel(stateConfig, visibleItems, allItems);
    updateUrl();
  }

  function applyAreaSearch(query) {
    areaQuery = query.trim();
    const clearBtn = document.getElementById("local-area-clear");
    if (clearBtn) clearBtn.classList.toggle("hidden", !areaQuery);

    if (activeState !== "WA" || !waLookup || !areaQuery) {
      activeCouncilIds = null;
      render();
      return;
    }

    const councils = waLookup.findWaCouncils(areaQuery);
    activeCouncilIds = councils.length > 0 ? councils.map((c) => c.id) : [];
    render();
  }

  function setupStateTabs() {
    document.getElementById("local-state-tabs")?.addEventListener("click", (event) => {
      const tab = event.target.closest(".state-tab");
      if (!tab) return;
      activeState = tab.dataset.state;
      if (activeState !== "WA") {
        areaQuery = "";
        activeCouncilIds = null;
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

    const params = new URLSearchParams(window.location.search);
    const area = params.get("area");
    if (area && activeState === "WA") {
      input.value = area;
      applyAreaSearch(area);
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
    clientRefreshedAt = new Date();

    const intro = document.getElementById("local-intro");
    if (intro && localCoverage?.message) {
      intro.textContent = localCoverage.message;
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
      if (manual) {
        setRefreshButtonState("loading");
      } else if (!silent && dateEl) {
        dateEl.textContent = "Loading consultations…";
      }

      if (silent && lastUpdated) {
        const remoteDate = await loader.peekLastUpdated(DATA_PATH, PEEK_FIELD);
        if (remoteDate === lastUpdated) return;
      }

      const data = await loader.loadDataModule(DATA_PATH, DATA_EXPORT);
      applyData(data);

      if (manual) {
        setRefreshButtonState("success");
      }
    } catch (error) {
      console.error("Local gov page: failed to load data", error);
      if (dateEl && !lastUpdated) {
        dateEl.textContent = "Could not load consultation data";
      }
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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      bootstrap();
    });
  } else {
    bootstrap();
  }
})();
