(function (global) {
  "use strict";

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function toIcsUtc(date) {
    return (
      date.getUTCFullYear() +
      pad(date.getUTCMonth() + 1) +
      pad(date.getUTCDate()) +
      "T" +
      pad(date.getUTCHours()) +
      pad(date.getUTCMinutes()) +
      pad(date.getUTCSeconds()) +
      "Z"
    );
  }

  function escapeIcs(text) {
    return String(text)
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\n/g, "\\n");
  }

  function closeDateToReminder(isoDate) {
    const close = new Date(isoDate + "T17:00:00");
    const reminder = new Date(close);
    reminder.setDate(reminder.getDate() - 1);
    reminder.setHours(9, 0, 0, 0);
    return reminder;
  }

  /**
   * Build calendar reminder options for a consultation closing date.
   * Reminder is set for 9:00 AM local time, one day before submissions close.
   */
  function buildCalendarReminder(options) {
    const { title, isoCloseDate, participateUrl, description, location } = options;
    if (!isoCloseDate || !title) return null;

    const reminderStart = closeDateToReminder(isoCloseDate);
    const reminderEnd = new Date(reminderStart.getTime() + 30 * 60 * 1000);
    const uid = `legislation-watch-${Date.now()}-${Math.random().toString(36).slice(2)}@legislationwatch.au`;

    const closeFormatted = new Date(isoCloseDate + "T12:00:00").toLocaleDateString("en-AU", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    const body =
      (description || "") +
      `\n\nSubmissions close: ${closeFormatted}` +
      (participateUrl ? `\n\nParticipate: ${participateUrl}` : "") +
      "\n\nAlways verify the deadline on the official government page before submitting.";

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Legislation Watch Australia//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${toIcsUtc(new Date())}`,
      `DTSTART:${toIcsUtc(reminderStart)}`,
      `DTEND:${toIcsUtc(reminderEnd)}`,
      `SUMMARY:${escapeIcs(`Reminder: ${title} closes tomorrow`)}`,
      `DESCRIPTION:${escapeIcs(body)}`,
      location ? `LOCATION:${escapeIcs(location)}` : "",
      participateUrl ? `URL:${participateUrl}` : "",
      "END:VEVENT",
      "END:VCALENDAR"
    ]
      .filter(Boolean)
      .join("\r\n");

    const googleParams = new URLSearchParams({
      action: "TEMPLATE",
      text: `Reminder: ${title} closes tomorrow`,
      dates: `${toIcsUtc(reminderStart)}/${toIcsUtc(reminderEnd)}`,
      details: body
    });
    if (participateUrl) googleParams.set("location", participateUrl);

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?${googleParams.toString()}`;
    const icsBlob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const icsDownloadUrl = URL.createObjectURL(icsBlob);

    return {
      ics,
      googleCalendarUrl,
      icsDownloadUrl,
      reminderLabel: `Reminder: 9 am the day before close (${closeFormatted})`
    };
  }

  function renderCalendarButtons(options) {
    const reminder = buildCalendarReminder(options);
    if (!reminder) return "";

    const safeTitle = options.title.replace(/[^a-z0-9]+/gi, "-").slice(0, 40);
    const filename = `legislation-watch-reminder-${safeTitle}.ics`;

    return `
      <div class="calendar-actions" data-calendar-title="${encodeURIComponent(options.title)}">
        <a class="btn-calendar" href="${reminder.googleCalendarUrl}" target="_blank" rel="noopener noreferrer">
          Add reminder to Google Calendar
        </a>
        <a class="btn-calendar btn-calendar--secondary" href="#" data-ics-download="${filename}" role="button">
          Download calendar reminder (.ics)
        </a>
        <p class="calendar-actions__note">${reminder.reminderLabel}. Verify the official deadline before submitting.</p>
      </div>`;
  }

  function setupCalendarDownloads(root) {
    (root || document).querySelectorAll("[data-ics-download]").forEach((link) => {
      if (link.dataset.bound) return;
      link.dataset.bound = "true";
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const container = link.closest(".calendar-actions");
        const title = decodeURIComponent(container?.dataset.calendarTitle || "Consultation");
        const card = link.closest("article");
        const participate =
          card?.querySelector(".btn-participate")?.getAttribute("href") ||
          card?.querySelector('a[href^="http"]')?.getAttribute("href");
        const closeIso = card?.dataset.closeDate;
        const summary = card?.querySelector(".upcoming-card__summary")?.textContent?.trim();
        if (!closeIso) return;

        const reminder = buildCalendarReminder({
          title,
          isoCloseDate: closeIso,
          participateUrl: participate,
          description: summary
        });
        if (!reminder) return;

        const blob = new Blob([reminder.ics], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = link.dataset.icsDownload || "reminder.ics";
        anchor.click();
        URL.revokeObjectURL(url);
      });
    });
  }

  global.LegislationWatchCalendar = {
    buildCalendarReminder,
    renderCalendarButtons,
    setupCalendarDownloads
  };
})(window);
