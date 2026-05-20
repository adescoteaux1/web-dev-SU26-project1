import { initNav } from "./nav.js";
import { initMarquee } from "./marquee.js";
import { initCounters } from "./counters.js";
import { initTimeline } from "./timeline.js";
import { initTerminal } from "./terminal.js";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initMarquee();
  initCounters();
  initTimeline();
  initTerminal();
});
