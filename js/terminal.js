/**
 * Interactive terminal — the creative differentiator.
 * Supports commands to learn about Ally. Arrow keys for history.
 */

const COMMANDS = {
  help: () => [
    "Available commands:",
    "  <span class='t-line--cmd'>about</span>       — who I am",
    "  <span class='t-line--cmd'>skills</span>      — what I know",
    "  <span class='t-line--cmd'>projects</span>    — things I've built",
    "  <span class='t-line--cmd'>experience</span>  — where I've worked",
    "  <span class='t-line--cmd'>education</span>   — academic background",
    "  <span class='t-line--cmd'>interests</span>   — outside of code",
    "  <span class='t-line--cmd'>contact</span>     — how to reach me",
    "  <span class='t-line--cmd'>whoami</span>      — one line",
    "  <span class='t-line--cmd'>clear</span>       — clear terminal",
  ],

  whoami: () => ["ally descoteaux · software engineer · boston, ma"],

  about: () => [
    "CS + Math undergrad (B.S., Northeastern, April 2026).",
    "Finishing my MSCS via the Plus One program — done April 2027.",
    "I build web apps, mobile platforms, and data systems.",
    "Co-ops at Verisk and TJX. Lead mobile eng at Familia IO (2025–2026).",
    "Tech lead at Generate, Northeastern's product studio.",
    "Starting at Datadog in June as a SWE intern (Azure Integrations).",
  ],

  education: () => [
    "M.S. Computer Science   Northeastern University   2025–2027",
    "B.S. CS & Mathematics   Northeastern University   2022–2026",
    "",
    "Plus One program: combined BS+MS, five years total.",
    "TA for Database Design and OOD — three years.",
  ],

  skills: () => [
    "Languages:   Go · TypeScript · Python · Java · C# · Swift · SQL · OCaml",
    "Frameworks:  React · React Native · Node.js · FastAPI · Next.js",
    "Data:        PostgreSQL · MongoDB · Snowflake · Supabase · AWS",
    "Tools:       Docker · Git · Power Platform",
  ],

  projects: () => [
    "01  Castaway     HackMIT · 24hrs · Go + React + PostgreSQL",
    "02  Arenius      Generate Studio · carbon accounting · Go + TypeScript",
    "03  Platnm       Generate Studio · social music · React Native + Go",
    "04  Husky404     Course project · Stack Overflow clone · MERN",
    "05  BuJo         Course project · bullet journal · Java + JavaFX",
    "",
    "→ <a href='./pages/projects.html' style='color:var(--red)'>View all projects</a>",
  ],

  experience: () => [
    "Jun–Aug 2026       SWE Intern              Datadog (Azure Integrations)",
    "Dec 2025–Present   Software Tech Lead      Generate (SkillSpark)",
    "Jul–Dec 2025       Software Tech Lead      Generate (Special Standard)",
    "May 2025–Jan 2026  Lead Mobile SWE         Familia IO",
    "Jan–Jun 2025       DevOps QA Co-op         Verisk",
    "Jan–Jun 2024       Data & Systems Co-op    TJX Companies",
    "Sept 2023–May 2026 TA (DB Design, OOD)     Khoury, Northeastern",
  ],

  interests: () => [
    "Baking and cooking",
    "Reading — fiction mostly",
    "Puzzles (crosswords, logic)",
    "Hiking when Boston allows it",
    "Teaching and explaining things well",
  ],

  contact: () => [
    "Email:    descoteaux.a@northeastern.edu",
    "LinkedIn: linkedin.com/in/alexandradescoteaux",
    "GitHub:   github.com/adescoteaux1",
  ],

  clear: () => null,
};

const EASTER_EGGS = {
  ls: () => ["about.md  projects/  experience.log  contact.txt  thesis-draft.pdf"],
  pwd: () => ["/home/ally/northeastern/mscs"],
  sudo: () => ["You're not in the sudoers file. This incident will be reported."],
  "git status": () => [
    "On branch main",
    "Changes not staged for commit:",
    "  modified: thesis.md",
    "  modified: sleep-schedule.txt",
    "nothing added to commit but untracked files present",
  ],
  "git log": () => [
    "a1b2c3d fix: null pointer at 1am",
    "f4e5d6c refactor: the thing that was bothering me",
    "7g8h9i0 feat: add feature (actually works this time)",
    "j1k2l3m chore: add comments so future me understands",
    "0000000 initial commit",
  ],
  hire: () => [
    "Oh hi 👋  Looking for new grad roles starting after I finish my MSCS in April 2027.",
    "→ descoteaux.a@northeastern.edu",
  ],
  coffee: () => ["☕  Fuel: oat milk lattes, specifically."],
  date: () => [new Date().toDateString()],
  "cd projects": () => {
    setTimeout(() => {
      window.location.href = "./pages/projects.html";
    }, 500);
    return ["Navigating to projects..."];
  },
};

export function initTerminal() {
  const input = document.getElementById("terminalInput");
  const output = document.getElementById("terminalOutput");
  const wrapper = document.getElementById("terminal");

  if (!input || !output) return;

  const history = [];
  let historyIndex = -1;

  const print = (lines, isError = false) => {
    if (!lines) return;
    lines.forEach((line) => {
      const p = document.createElement("p");
      p.className = `t-line${isError ? " t-line--err" : ""}`;
      p.innerHTML = line;
      output.appendChild(p);
    });
    output.scrollTop = output.scrollHeight;
  };

  const run = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    history.unshift(raw.trim());
    historyIndex = -1;

    // Echo command
    const echo = document.createElement("p");
    echo.className = "t-line";
    echo.innerHTML = `<span style="color:var(--rule-light)">~%</span> <span class="t-line--cmd">${raw.trim()}</span>`;
    output.appendChild(echo);

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
          `Type <span class="t-line--cmd">help</span> for available commands.`,
        ],
        true
      );
    }
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      run(input.value);
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

  wrapper?.addEventListener("click", () => input.focus());
}
