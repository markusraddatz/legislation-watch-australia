(function (global) {
  "use strict";

  /**
   * Fetch a data/*.js module and return its exported window property.
   * Uses cache-busting so visitors always receive the latest deployed file.
   */
  async function loadDataModule(path, exportName) {
    const response = await fetch(`${path}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Could not load ${path} (${response.status})`);
    }
    const source = await response.text();
    const sandbox = {};
    const runner = new Function("window", source + `\nreturn window.${exportName};`);
    const data = runner(sandbox);
    if (!data) {
      throw new Error(`Missing ${exportName} in ${path}`);
    }
    return data;
  }

  /** Read lastUpdated from a data file without executing the full module graph. */
  async function peekLastUpdated(path, fieldName = "lastUpdated") {
    const response = await fetch(`${path}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return null;
    const text = await response.text();
    const pattern = new RegExp(`const ${fieldName} = "(\\d{4}-\\d{2}-\\d{2})"`);
    const match = text.match(pattern);
    return match ? match[1] : null;
  }

  global.LegislationWatchLoader = { loadDataModule, peekLastUpdated };
})(window);
