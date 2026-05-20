/**
 * Interactive terminal — the creative differentiator.
 * Users can type commands to learn about Ally.
 * Supports: help, about, skills, projects, contact, experience, clear, whoami, interests
 */

const COMMANDS = {
  help: () => [
    `Available commands:`,
    `  <span class="terminal__line--cmd">about</span>       — who am I`,
    `  <span class="terminal__line--cmd">skills</span>      — what I know`,
    `  <span class="terminal__line--cmd">projects</span>    — things I've built`,
    `  <span class="terminal__line--cmd">experience</span>  — where I've worked`,
    `  <span class="terminal__line--cmd">interests</span>   — outside of code`,
    `  <span class="terminal__line--cmd">contact</span>     — how to reach me`,
    `  <span class="terminal__line--cmd">whoami</span>      — the quick version`,
    `  <span class="terminal__line--cmd">clear</span>       — clear the terminal`,
  ],

  about: () => [
    `Hi! I'm Ally — CS &amp; Math student at Northeastern University.`,
    `I build web apps, mobile apps, and data systems that solve real problems.`,
    `I've co-oped at Verisk and TJX, and I lead engineering teams at Generate,`,
    `Northeastern's student-led product studio.`,
    `This summer I'm joining Datadog as a Software Engineer Intern.`,
  ],

  whoami: () => [`ally descoteaux · software engineer · boston, ma`],

  skills: () => [
    `Languages:   Go · TypeScript · Python · Java · C# · Swift · SQL · OCaml`,
    `Frameworks:  React · React Native · Node.js · FastAPI · Next.js`,
    `Data:        PostgreSQL · MongoDB · Snowflake · Supabase · AWS`,
    `Tools:       Docker · Git · Power Platforms`,
  ],

  projects: () => [
    `🌊  Castaway     — anonymous message-in-a-bottle (HackMIT, 24hrs)`,
    `🌳  Arenius      — carbon accounting platform for SMBs`,
    `🎶  Platnm       — social music discovery app (Spotify API)`,
    `🐶  Husky404     — Stack Overflow clone with LaTeX &amp; SSO`,
    `📝  BuJo Journal — digital bullet journal in Java/JavaFX`,
    ``,
    `→ Type <span class="terminal__line--cmd">cd projects</span> or visit the projects page to see more.`,
  ],

  "cd projects": () => {
    setTimeout(() => {
      window.location.href = "./pages/projects.html";
    }, 600);
    return [`Navigating to projects...`];
  },

  experience: () => [
    `Incoming SWE Intern        Datadog                  Jun 2026`,
    `Mobile Software Engineer   Familia IO               May 2025–Present`,
    `DevOps QA Co-op            Verisk                   Jan–Jun 2025`,
    `Risk Assurance Data Co-op  TJX Companies            Jan–Jun 2024`,
    `Database Design TA         Khoury CS, Northeastern  Sept 2023–Present`,
  ],

  interests: () => [
    `🧩  Puzzles &amp; problem solving`,
    `📚  Reading &amp; literature`,
    `🍞  Baking &amp; cooking`,
    `🌿  Travel and the Outdoors`,
    `✏️  Continuous learning`,
    `🤝  Volunteer work`,
  ],

  contact: () => [
    `Email:    descoteaux.a@northeastern.edu`,
    `LinkedIn: linkedin.com/in/alexandradescoteaux`,
    `GitHub:   github.com/adescoteaux1`,
  ],

  clear: () => null, // handled separately
};

const EASTER_EGGS = {
  ls: () => [`about.txt  projects/  experience.txt  interests.txt  contact.txt`],
  pwd: () => [`/home/ally`],
  sudo: () => [`Nice try. You don't have root access here.`],
  hack: () => [
    `Hacking initiated...`,
    `jk — I'm a software engineer, not that kind.`,
    `But seriously, check out my projects.`,
  ],
  coffee: () => [`☕  Running on: iced coffee, celcius, and debugging sessions`],
  hire: () => [
    `Oh hi, recruiter 👋`,
    `I'm open to internships and new grad roles!`,
    `→ descoteaux.a@northeastern.edu`,
  ],
  "git log": () => [
    `commit a1b2c3d — Fixed production bug at 2am`,
    `commit f4e5d6c — Refactored the thing`,
    `commit 7g8h9i0 — Added comments (yes really)`,
    `commit j1k2l3m — Initial commit`,
  ],
  date: () => [new Date().toDateString()],
  echo: () => [`...`],
};

export function initTerminal() {
  const input = document.getElementById("terminalInput");
  const output = document.getElementById("terminalOutput");

  if (!input || !output) return;

  const history = [];
  let historyIndex = -1;

  const print = (lines, isCmd = false, isError = false) => {
    if (!lines) return;
    lines.forEach((line) => {
      const p = document.createElement("p");
      p.className = `terminal__line${isCmd ? " terminal__line--cmd" : ""}${isError ? " terminal__line--error" : ""}`;
      p.innerHTML = line;
      output.appendChild(p);
    });
    output.scrollTop = output.scrollHeight;
  };

  const handleCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    history.unshift(raw.trim());
    historyIndex = -1;

    // Echo the command
    print([`<span style="color:var(--clr-text-muted)">ally@terminal ~ %</span> ${raw.trim()}`]);

    if (cmd === "clear") {
      output.innerHTML = "";
      return;
    }

    const handler = COMMANDS[cmd] || EASTER_EGGS[cmd];
    if (handler) {
      const result = handler();
      if (result) print(result);
    } else {
      print(
        [
          `command not found: ${cmd}`,
          `Type <span class="terminal__line--cmd">help</span> for available commands.`,
        ],
        false,
        true
      );
    }
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleCommand(input.value);
      input.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex];
      } else {
        historyIndex = -1;
        input.value = "";
      }
    }
  });

  // Auto-focus terminal on click
  document.getElementById("terminal")?.addEventListener("click", () => input.focus());
}
