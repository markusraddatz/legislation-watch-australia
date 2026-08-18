(function () {
  "use strict";

  const loader = window.LegislationWatchLoader;
  if (!loader) {
    console.error("Legislation Watch: js/data-loader.js must load before js/app.js");
    return;
  }

  const calendar = window.LegislationWatchCalendar;

  const DATA_PATH = "data/real-data.js";
  const DATA_EXPORT = "LegislationWatchData";

  let lastUpdated = null;
  let upcomingItems = [];
  let pastItems = [];
  let stateCoverage = null;
  let clientRefreshedAt = null;

  let activeFilter = "closing-soon";
  let activeStateTab = "all";
  let uiReady = false;

  const STATE_CODES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"];

  const THEME_KEY = "legislation-watch-theme";

  const externalIcon = `
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M10 2h4v4h-1.5V4.56l-5.94 5.94-1.06-1.06L11.44 3.5H10V2z"/>
      <path fill="currentColor" d="M13 8.5V13H3V3h4.5V1.5H3a1.5 1.5 0 0 0-1.5 1.5v10A1.5 1.5 0 0 0 3 14.5h10a1.5 1.5 0 0 0 1.5-1.5V8.5H13z"/>
    </svg>`;

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

  function isStateJurisdiction(jurisdiction) {
    return jurisdiction !== "Federal";
  }

  function isBillItem(item) {
    return item.type === "Bill" || /Bill 20\d{2}/i.test(item.title);
  }

  function isConsultationItem(item) {
    return (
      item.type === "Exposure Draft" ||
      item.type === "Departmental Consultation"
    );
  }

  function isAcceptingSubmissions(item) {
    const closeDate = item.keyDates.submissionsClose;
    const days = daysUntil(closeDate);
    if (closeDate && days !== null && days < 0) return false;
    return (
      /accepting|open for submissions/i.test(item.status) ||
      (closeDate && days !== null && days >= 0) ||
      (!closeDate && /open for submissions/i.test(item.status))
    );
  }

  function isClosingSoon(item) {
    const days = daysUntil(item.keyDates.submissionsClose);
    return days !== null && days >= 0 && days <= 14;
  }

  function participationLink(item) {
    const links = item.officialLinks || {};
    return links.howToParticipate || links.billPage || links.primaryDocument || links.committeeOrConsultPage;
  }

  function recordLink(item) {
    const links = item.officialLinks || {};
    return links.primaryDocument || links.billPage || links.committeeOrConsultPage;
  }

  function openedOrIntroduced(item) {
    const date = item.keyDates.introduced || item.keyDates.opened;
    return date ? formatDate(date) : null;
  }

  function nextStepLabel(item) {
    const { reportingDate, nextStep } = item.keyDates;
    if (reportingDate) return `Report due ${formatDate(reportingDate)}`;
    return nextStep || null;
  }

  function participantText(info) {
    if (!info || info.submissionsReceived == null) {
      return '<p class="participant-line">Participant numbers not publicly reported</p>';
    }
    return `<p class="participant-line participant-line--reported">${info.submissionsReceived.toLocaleString("en-AU")} submissions — ${info.note}</p>`;
  }

  function renderDeadlineBox(item) {
    const closeDate = item.keyDates.submissionsClose;
    const days = daysUntil(closeDate);
    const urgent = closeDate && days !== null && days >= 0 && days <= 14;

    if (!closeDate) {
      return `
        <div class="deadline-box">
          <span class="deadline-box__label">Submissions close</span>
          <span class="deadline-box__date">No fixed closing date</span>
          <span class="deadline-box__countdown">Check the official page for current deadlines</span>
        </div>`;
    }

    const countdown =
      days === null
        ? ""
        : days < 0
          ? "Submissions have closed"
          : days === 0
            ? "Closes today"
            : `Closes in ${days} day${days === 1 ? "" : "s"}`;

    return `
      <div class="deadline-box${urgent ? " deadline-box--urgent" : ""}">
        <span class="deadline-box__label">Submissions close</span>
        <span class="deadline-box__date">${formatDate(closeDate)}</span>
        ${countdown ? `<span class="deadline-box__countdown">${countdown}</span>` : ""}
      </div>`;
  }

  function renderUpcomingCard(item) {
    const participateUrl = participationLink(item);
    const closingSoon = isClosingSoon(item);
    const opened = openedOrIntroduced(item);
    const nextStep = nextStepLabel(item);
    const statusBadge = closingSoon
      ? '<span class="badge badge--closing">Closing soon</span>'
      : isAcceptingSubmissions(item)
        ? '<span class="badge badge--status">Open</span>'
        : "";

    const keyDatesList = [
      opened ? `<li><strong>Opened</strong> ${opened}</li>` : "",
      nextStep ? `<li><strong>Next step</strong> ${nextStep}</li>` : ""
    ]
      .filter(Boolean)
      .join("");

    const topicTags = item.topics
      .map((t) => `<span class="topic-tag">${t}</span>`)
      .join("");

    const cta = participateUrl
      ? `<a class="btn-participate" href="${participateUrl}" target="_blank" rel="noopener noreferrer">
            How to participate ${externalIcon}
          </a>`
      : `<p class="participant-line">Official participation link not available — check the committee page.</p>`;

    const calendarActions =
      calendar && item.keyDates?.submissionsClose
        ? calendar.renderCalendarButtons({
            title: item.title,
            isoCloseDate: item.keyDates.submissionsClose,
            participateUrl: participateUrl,
            description: item.shortNeutralSummary
          })
        : "";

    return `
      <article class="upcoming-card${closingSoon ? " upcoming-card--closing-soon" : ""}" data-id="${item.id}" data-close-date="${item.keyDates.submissionsClose || ""}">
        <div class="upcoming-card__body">
          <div class="upcoming-card__meta">
            <span class="badge badge--jurisdiction">${item.jurisdiction}</span>
            <span class="badge badge--type">${item.type}</span>
            ${statusBadge}
          </div>
          <h3 class="upcoming-card__title">${item.title}</h3>
          <p class="upcoming-card__summary">${item.shortNeutralSummary}</p>
          ${renderDeadlineBox(item)}
          ${keyDatesList ? `<ul class="key-dates">${keyDatesList}</ul>` : ""}
          ${participantText(item.participantInfo)}
          <div class="topic-tags">${topicTags}</div>
          ${calendarActions}
        </div>
        <div class="upcoming-card__cta">
          ${cta}
        </div>
      </article>`;
  }

  function renderPastCard(item) {
    const recordUrl = recordLink(item);
    const participants =
      item.participantInfo && item.participantInfo.submissionsReceived != null
        ? `${item.participantInfo.submissionsReceived.toLocaleString("en-AU")} submissions — ${item.participantInfo.note}`
        : "Participant numbers not publicly reported";

    const recordCta = recordUrl
      ? `<a class="past-card__link" href="${recordUrl}" target="_blank" rel="noopener noreferrer">
          View official record ${externalIcon}
        </a>`
      : "";

    return `
      <article class="past-card">
        <span class="past-card__outcome">${item.outcome}</span>
        <h3 class="past-card__title">${item.title}</h3>
        <p class="past-card__date">Decided ${formatDate(item.decisionDate)} · ${item.jurisdiction}</p>
        <p class="past-card__how">${item.howItWasDecided}</p>
        <p class="past-card__participants">${participants}</p>
        ${recordCta}
      </article>`;
  }

  function setActiveFilter(filterId, options = {}) {
    activeFilter = filterId;
    if (options.clearSearch) {
      document.getElementById("search-input").value = "";
    }
    document.querySelectorAll(".chip").forEach((chip) => {
      chip.classList.toggle("chip--active", chip.dataset.filter === filterId);
    });
    syncHeroStatHighlight();
    renderUpcoming();
  }

  function syncHeroStatHighlight() {
    const heroAction =
      activeFilter === "closing-soon" ? "closing-soon" : activeFilter === "open" ? "open" : null;
    document.querySelectorAll(".stat-pill--action").forEach((pill) => {
      pill.classList.toggle("stat-pill--active", pill.dataset.action === heroAction);
    });
  }

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function highlightSection(id) {
    const section = document.getElementById(id);
    if (!section) return;
    section.classList.add("section--highlight");
    window.setTimeout(() => section.classList.remove("section--highlight"), 1800);
  }

  function applyHeroAction(action) {
    document.querySelectorAll(".stat-pill--action").forEach((pill) => {
      pill.classList.toggle("stat-pill--active", pill.dataset.action === action);
    });

    if (action === "past") {
      scrollToSection("recent-past");
      highlightSection("recent-past");
      return;
    }

    const filterMap = {
      "closing-soon": "closing-soon",
      open: "open"
    };
    if (filterMap[action]) {
      setActiveFilter(filterMap[action], { clearSearch: true });
      scrollToSection("upcoming");
    }
  }

  function stateItemCounts() {
    const counts = { all: 0 };
    STATE_CODES.forEach((code) => {
      counts[code] = 0;
    });
    upcomingItems.forEach((item) => {
      if (!isStateJurisdiction(item.jurisdiction)) return;
      counts.all += 1;
      if (counts[item.jurisdiction] != null) {
        counts[item.jurisdiction] += 1;
      }
    });
    return counts;
  }

  function renderStateTabs() {
    const panel = document.getElementById("state-panel");
    const tabsEl = document.getElementById("state-tabs");
    const localLink = document.getElementById("state-local-link");
    if (!panel || !tabsEl) return;

    const counts = stateItemCounts();
    const tabs = [{ code: "all", label: "All states" }, ...STATE_CODES.map((code) => ({ code, label: code }))];

    tabsEl.innerHTML = tabs
      .map(({ code, label }) => {
        const count = counts[code] ?? 0;
        const countLabel = count > 0 ? ` <span class="state-tab__count">(${count})</span>` : "";
        const selected = code === activeStateTab;
        return `
          <button
            type="button"
            class="state-tab${selected ? " state-tab--active" : ""}"
            role="tab"
            id="state-tab-${code}"
            aria-selected="${selected}"
            data-state="${code}"
          >${label}${countLabel}</button>`;
      })
      .join("");

    if (localLink) {
      localLink.href =
        activeStateTab === "all" ? "local.html" : `local.html?state=${encodeURIComponent(activeStateTab)}`;
    }
  }

  function updateStatePanelVisibility(query) {
    const panel = document.getElementById("state-panel");
    if (!panel) return;
    const show = activeFilter === "state" && !query && stateCoverage?.integrated;
    panel.classList.toggle("hidden", !show);
    panel.setAttribute("aria-hidden", String(!show));
    if (show) renderStateTabs();
  }

  function setActiveStateTab(stateCode) {
    activeStateTab = stateCode;
    document.querySelectorAll("#state-tabs .state-tab").forEach((tab) => {
      const selected = tab.dataset.state === stateCode;
      tab.classList.toggle("state-tab--active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });
    const localLink = document.getElementById("state-local-link");
    if (localLink) {
      localLink.href =
        stateCode === "all" ? "local.html" : `local.html?state=${encodeURIComponent(stateCode)}`;
    }
    renderUpcoming();
  }

  function setupStateTabs() {
    document.getElementById("state-tabs")?.addEventListener("click", (event) => {
      const tab = event.target.closest(".state-tab");
      if (!tab) return;
      setActiveStateTab(tab.dataset.state);
    });
  }

  function renderStateEmptyMessage() {
    const portals = (stateCoverage?.officialPortals || [])
      .map(
        (portal) =>
          `<li><a href="${portal.url}" target="_blank" rel="noopener noreferrer">${portal.label}</a></li>`
      )
      .join("");

    const message =
      stateCoverage?.message ||
      "State and territory consultations are not in this dataset yet.";

    return `
      <p class="empty-state__lead">${message}</p>
      <p class="empty-state__sub">Official state consultation portals:</p>
      <ul class="empty-state__links">${portals}</ul>`;
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

  function matchesFilter(item) {
    switch (activeFilter) {
      case "all":
        return true;
      case "federal":
        return item.jurisdiction === "Federal";
      case "state":
        if (!isStateJurisdiction(item.jurisdiction)) return false;
        if (activeStateTab !== "all" && item.jurisdiction !== activeStateTab) return false;
        return true;
      case "open":
        return isAcceptingSubmissions(item);
      case "bills":
        return isBillItem(item);
      case "consultations":
        return isConsultationItem(item);
      case "closing-soon":
        return isClosingSoon(item);
      default:
        return true;
    }
  }

  function matchesSearch(item, query) {
    if (!query) return true;
    const haystack = [item.title, item.shortNeutralSummary, item.topics.join(" "), item.jurisdiction, item.type]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  }

  function sortUpcoming(items) {
    return [...items].sort((a, b) => {
      const aDays = daysUntil(a.keyDates.submissionsClose);
      const bDays = daysUntil(b.keyDates.submissionsClose);
      const aSort = aDays !== null && aDays >= 0 ? aDays : 9999;
      const bSort = bDays !== null && bDays >= 0 ? bDays : 9999;
      return aSort - bSort;
    });
  }

  function filterLabel(filteredCount, query) {
    const closingSoonTotal = upcomingItems.filter(isClosingSoon).length;

    if (query) {
      return `Search results: ${filteredCount} of ${upcomingItems.length} items (searching all open consultations)`;
    }
    if (activeFilter === "closing-soon") {
      return filteredCount === closingSoonTotal
        ? `Showing ${filteredCount} item${filteredCount === 1 ? "" : "s"} closing within 14 days`
        : `Showing ${filteredCount} of ${closingSoonTotal} items closing within 14 days`;
    }
    if (activeFilter === "open") {
      const openTotal = upcomingItems.filter(isAcceptingSubmissions).length;
      return filteredCount === openTotal
        ? `Showing ${filteredCount} item${filteredCount === 1 ? "" : "s"} open for input`
        : `Showing ${filteredCount} of ${openTotal} items open for input`;
    }
    if (activeFilter === "state") {
      const statePool = upcomingItems.filter((item) => {
        if (!isStateJurisdiction(item.jurisdiction)) return false;
        if (activeStateTab !== "all" && item.jurisdiction !== activeStateTab) return false;
        return true;
      });
      const stateTotal = statePool.length;
      if (!(stateCoverage?.integrated)) {
        return "No state items in dataset yet — federal only for now";
      }
      const scope =
        activeStateTab === "all" ? "state/territory" : activeStateTab;
      return filteredCount === stateTotal
        ? `Showing ${filteredCount} ${scope} item${filteredCount === 1 ? "" : "s"}`
        : `Showing ${filteredCount} of ${stateTotal} ${scope} items`;
    }
    if (activeFilter === "all" && filteredCount === upcomingItems.length) {
      return `Showing all ${upcomingItems.length} upcoming items`;
    }
    return `Showing ${filteredCount} of ${upcomingItems.length} items`;
  }

  function renderUpcoming() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    const list = document.getElementById("upcoming-list");
    const empty = document.getElementById("upcoming-empty");
    const countEl = document.getElementById("results-count");

    const filtered = sortUpcoming(
      upcomingItems.filter((item) => {
        if (!matchesSearch(item, query)) return false;
        if (query) return true;
        return matchesFilter(item);
      })
    );

    list.innerHTML = filtered.map(renderUpcomingCard).join("");
    if (calendar) calendar.setupCalendarDownloads(list);
    empty.classList.toggle("hidden", filtered.length > 0);

    if (filtered.length === 0) {
      if (!query && activeFilter === "state" && !(stateCoverage?.integrated)) {
        empty.innerHTML = renderStateEmptyMessage();
      } else if (!query && activeFilter === "state" && stateCoverage?.integrated) {
        const scope = activeStateTab === "all" ? "state or territory" : activeStateTab;
        empty.innerHTML = `
          <p class="empty-state__lead">No open consultations listed for ${scope} right now.</p>
          <p class="empty-state__sub">${stateCoverage.message || ""}</p>
          <p class="empty-state__sub"><a href="${activeStateTab === "all" ? "local.html" : `local.html?state=${activeStateTab}`}">Browse local government consultations</a></p>`;
      } else {
        empty.textContent = query
          ? "No items match your search."
          : activeFilter === "closing-soon"
            ? "Nothing is closing within the next 14 days right now. Try “All open” or “Open for submissions”."
            : "No items match your filters.";
      }
    }

    countEl.textContent = filterLabel(filtered.length, query);
    updateStatePanelVisibility(query);
  }

  function renderPast() {
    document.getElementById("past-list").innerHTML = [...pastItems]
      .sort((a, b) => b.decisionDate.localeCompare(a.decisionDate))
      .map(renderPastCard)
      .join("");
  }

  function renderHeroStats() {
    const openCount = upcomingItems.filter(isAcceptingSubmissions).length;
    const closingSoon = upcomingItems.filter(isClosingSoon).length;

    document.getElementById("hero-stats").innerHTML = `
      <button type="button" class="stat-pill stat-pill--action stat-pill--active" data-action="closing-soon">
        <strong>${closingSoon}</strong> closing within 14 days
      </button>
      <button type="button" class="stat-pill stat-pill--action" data-action="open">
        <strong>${openCount}</strong> open for input
      </button>
      <button type="button" class="stat-pill stat-pill--action" data-action="past">
        <strong>${pastItems.length}</strong> recent outcomes
      </button>`;
  }

  function setupHeroStats() {
    document.getElementById("hero-stats")?.addEventListener("click", (event) => {
      const pill = event.target.closest(".stat-pill--action");
      if (!pill) return;
      applyHeroAction(pill.dataset.action);
    });
  }

  function setupFilters() {
    document.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        setActiveFilter(chip.dataset.filter);
        scrollToSection("upcoming");
      });
    });

    document.getElementById("search-input").addEventListener("input", renderUpcoming);
  }

  function renderDataFreshness() {
    const heroDate = document.getElementById("hero-last-updated");
    const footerNote = document.getElementById("footer-data-freshness");

    if (!lastUpdated) {
      if (heroDate) heroDate.textContent = "Consultation data unavailable";
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

    if (heroDate) {
      heroDate.textContent = refreshedLabel
        ? `Data last updated: ${formatted} · Loaded ${refreshedLabel}`
        : `Data last updated: ${formatted}`;
    }
    if (footerNote) {
      footerNote.textContent =
        `Information current as of ${formatted}. Always verify deadlines and submit via the official channels linked above.`;
    }
  }

  function applyData(data) {
    lastUpdated = data.lastUpdated;
    upcomingItems = data.upcomingItems || [];
    pastItems = data.pastItems || [];
    stateCoverage = data.stateCoverage;
    clientRefreshedAt = new Date();
    renderDataFreshness();
    renderHeroStats();
    renderUpcoming();
    renderPast();
    syncHeroStatHighlight();
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
    const heroDate = document.getElementById("hero-last-updated");

    try {
      if (manual) {
        setRefreshButtonState("loading");
      } else if (!silent && heroDate) {
        heroDate.textContent = "Loading consultations…";
      }

      if (silent && lastUpdated) {
        const remoteDate = await loader.peekLastUpdated(DATA_PATH);
        if (remoteDate === lastUpdated) return;
      }

      const data = await loader.loadDataModule(DATA_PATH, DATA_EXPORT);
      applyData(data);

      if (manual) {
        setRefreshButtonState("success");
      }
    } catch (error) {
      console.error("Legislation Watch: failed to load data", error);
      if (heroDate && !lastUpdated) {
        heroDate.textContent = "Could not load consultation data";
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
    setupFilters();
    setupHeroStats();
    setupStateTabs();
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
