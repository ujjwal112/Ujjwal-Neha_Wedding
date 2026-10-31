const TARGET = new Date("2026-12-02T18:00:00+05:30").getTime();

const BASE = window.INVITE_BASE || "/";

function inviteMode() {
  const parts = decodeURIComponent(location.pathname || "/")
    .replace(/\/+$/, "")
    .split("/")
    .filter(Boolean);
  let key = (parts.pop() || "").toLowerCase();
  if (key === "index.html") key = (parts.pop() || "").toLowerCase();
  if (key === "wedding") return "wedding";
  if (key === "ujjwal&nehawedding") return "full";
  return "none";
}

const MODE = inviteMode();
if (MODE === "none") {
  document.documentElement.replaceChildren();
}

document.querySelectorAll("img[src]").forEach((img) => {
  const s = img.getAttribute("src") || "";
  if (!s || s.startsWith("http") || s.startsWith("data:")) return;
  img.setAttribute("src", BASE + s.replace(/^\//, ""));
});

const allRituals = [
  {
    title: "Tilak",
    sanskrit: "तिलक",
    phase: "Before",
    image: BASE + "assets/ritual-tilak.webp",
    meaning:
      "In a Bihari house the tilak is not a courtesy visit. The bride’s people come to the groom’s home with a thali of chandan, roli, and rice. They apply the mark to his forehead, present clothes, coconut, and sweets, and the two families sit as one. After this evening, the wedding has begun.",
  },
  {
    title: "Matkor",
    sanskrit: "मटकोर",
    phase: "Before",
    image: BASE + "assets/ritual-matkor.webp",
    meaning:
      "The women of the house walk to a pond or the nearest earth with a soop, sindoor, and song. They fetch auspicious clay for the madwa. Without this soil the mandap does not stand.",
  },
  {
    title: "Madwa",
    sanskrit: "मड़वा",
    phase: "Before",
    image: BASE + "assets/ritual-madwa.webp",
    meaning:
      "The madwa is raised with puja, not by a contractor alone. Four bamboo poles, mango leaves, and a clay bedi. Before it stands, the women go for matkor. They fetch auspicious earth, singing, so the mandap sits on living soil.",
  },
  {
    title: "Haldi",
    sanskrit: "हल्दी",
    phase: "Before",
    image: BASE + "assets/ritual-haldi.webp",
    meaning:
      "Haldi is ubtan: turmeric, rosewater, and a house full of aunts. It is antiseptic and auspicious, and in Bihar it is also a license to sing loudly. The paste is applied to Ujjwal and Neha on the same morning, at home.",
  },
  {
    title: "Mehendi",
    sanskrit: "मेहंदी",
    phase: "Before",
    image: BASE + "assets/ritual-mehendi.webp",
    meaning:
      "Mehendi cools the skin and marks a threshold. At home the evening is geet: sohar and lagan on the dholak, more than a salon. Paisley and paan-leaf climb the hands. Someone will hide a name in the vines.",
  },
  {
    title: "Paricchan",
    sanskrit: "परिच्छन",
    phase: "The day",
    image: BASE + "assets/ritual-baraat.webp",
    meaning:
      "Ujjwal arrives with his baraat at OM Garden. At the gate the bride’s mother and the women of the house circle a thaali of aarti, rice, and water around his head (paricchan), so nothing unkind follows him to the mandap. Only then does he step inside.",
  },
  {
    title: "Jaimala",
    sanskrit: "जयमाला",
    phase: "The day",
    image: BASE + "assets/ritual-jaimala.webp",
    meaning:
      "Each places a garland of white and blush roses with jasmine around the other’s neck. Friends may lift; you still have to reach. Under the play is consent, spoken in flowers, before the fire is lit.",
  },
  {
    title: "Kanyadaan",
    sanskrit: "कन्यादान",
    phase: "The day",
    image: BASE + "assets/ritual-mandap.webp",
    meaning:
      "The bride’s father pours sacred water over the joined hands and entrusts his daughter with his witness. In a Bihari vivah this is quiet, Vedic, and heavy with the room. She walks forward; she is not given away as property.",
  },
  {
    title: "Bhanwar",
    sanskrit: "भांवर",
    phase: "The day",
    image: BASE + "assets/ritual-agni.webp",
    meaning:
      "Bhanwar is typically four pheras around the sacred fire, with lawa (puffed rice) offered as they walk. Each round is a vow: dharma, strength, prosperity, and a life walked together. The cloth is knotted. The priest keeps time. This is the walking of the marriage. Sindurdaan is its seal.",
  },
  {
    title: "Sindurdaan",
    sanskrit: "सिंदूरदान",
    phase: "The day",
    image: BASE + "assets/ritual-sindoor.webp",
    meaning:
      "Ujjwal applies sindoor to the parting of Neha’s hair, often under a cloth held by the women so the moment stays between them and Agni. In our house this is the rite that makes a wife. The room exhales after.",
  },
  {
    title: "Kohbar",
    sanskrit: "कोहबर",
    phase: "The day",
    image: BASE + "assets/ritual-kohbar.webp",
    meaning:
      "After sindurdaan the couple is led to the kohbar ghar. The walls are painted in the simple Bihari way: tikuli discs, a kalash, sun and moon, paan. The women of the house sing kohbar geet. They feed Ujjwal and Neha gur-dahi so the married life is sweet, offer paan, tease the groom, and take the first blessings as a pair.",
  },
  {
    title: "Bidai",
    sanskrit: "विदाई",
    phase: "After",
    image: BASE + "assets/ritual-bidai.webp",
    meaning:
      "Neha throws rice toward the house she leaves, so it stays abundant. Bidai is allowed to ache. The dholak does not cover it. It walks beside it.",
  },
  {
    title: "Reception",
    sanskrit: "स्वागत",
    phase: "After",
    image: BASE + "assets/ritual-reception.webp",
    meaning:
      "Three days after the pheras, both families open the house to everyone who could not stand at the mandap, and to everyone who did. Signature Garden, Sonia Vihar. A garden lawn, ivory tables, and the first evening of Ujjwal and Neha as a married home.",
  },
];

const rituals =
  MODE === "wedding" ? allRituals.filter((r) => r.title !== "Reception") : allRituals;

if (MODE === "wedding") {
  document.documentElement.classList.add("mode-wedding");
  const reception = document.getElementById("event-reception");
  if (reception) reception.remove();
}

function tick() {
  const s = Math.max(0, Math.floor((TARGET - Date.now()) / 1000));
  document.getElementById("d").textContent = String(Math.floor(s / 86400));
  document.getElementById("h").textContent = String(Math.floor((s % 86400) / 3600)).padStart(2, "0");
  document.getElementById("m").textContent = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  document.getElementById("s").textContent = String(s % 60).padStart(2, "0");
}
tick();
setInterval(tick, 1000);

const envelope = document.getElementById("envelope");
const envBox = envelope && envelope.querySelector(".env");
const seal = document.getElementById("seal");
let opened = false;

function openEnvelope() {
  if (opened || !envelope || !envBox) return;
  opened = true;
  envBox.classList.add("env-open");
  envelope.classList.add("env-out");
  document.body.style.overflow = "";
  setTimeout(() => {
    if (envelope.parentNode) envelope.remove();
  }, 1500);
}

document.body.style.overflow = "hidden";
if (seal) {
  seal.addEventListener(
    "click",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      openEnvelope();
    },
    { passive: false },
  );
}

const menuBtn = document.getElementById("menu-btn");
const navMob = document.getElementById("nav-mob");
const iconMenu = document.getElementById("icon-menu");
const iconClose = document.getElementById("icon-close");

menuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const open = navMob.classList.toggle("hidden") === false;
  iconMenu.classList.toggle("hidden", open);
  iconClose.classList.toggle("hidden", !open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

navMob.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    navMob.classList.add("hidden");
    iconMenu.classList.remove("hidden");
    iconClose.classList.add("hidden");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", location.pathname + location.search + "#" + id);
  });
});

let riteIndex = 0;
function renderRite() {
  const r = rituals[riteIndex];
  document.getElementById("rite-img").src = r.image;
  document.getElementById("rite-phase").textContent = r.phase;
  document.getElementById("rite-sanskrit").textContent = r.sanskrit;
  document.getElementById("rite-title").textContent = r.title;
  document.getElementById("rite-meaning").textContent = r.meaning;
  document.getElementById("rite-count").textContent = riteIndex + 1 + " / " + rituals.length;
}
renderRite();

document.getElementById("rite-prev").addEventListener("click", (e) => {
  e.preventDefault();
  riteIndex = riteIndex === 0 ? rituals.length - 1 : riteIndex - 1;
  renderRite();
});
document.getElementById("rite-next").addEventListener("click", (e) => {
  e.preventDefault();
  riteIndex = riteIndex === rituals.length - 1 ? 0 : riteIndex + 1;
  renderRite();
});

const days = [
  { title: "Close", image: BASE + "assets/memory-close.webp", alt: "Neha smiling, held close" },
  { title: "The bridge", image: BASE + "assets/memory-bridge.webp", alt: "Ujjwal and Neha on the bridge" },
  { title: "In the wind", image: BASE + "assets/memory-wind.webp", alt: "Neha’s dress in the wind on the bridge" },
  { title: "The river", image: BASE + "assets/memory-hands.webp", alt: "Ujjwal and Neha letting sand fall between their hands" },
  { title: "The waterfall", image: BASE + "assets/memory-falls.webp", alt: "Ujjwal and Neha at the waterfall" },
  { title: "That evening", image: BASE + "assets/memory-dinner.webp", alt: "Ujjwal kissing Neha’s hand at dinner" },
];
let dayIndex = 0;
function renderDay() {
  const d = days[dayIndex];
  const img = document.getElementById("day-img");
  img.src = d.image;
  img.alt = d.alt;
  document.getElementById("day-count").textContent = dayIndex + 1 + " / " + days.length;
}
renderDay();
document.getElementById("day-prev").addEventListener("click", (e) => {
  e.preventDefault();
  dayIndex = dayIndex === 0 ? days.length - 1 : dayIndex - 1;
  renderDay();
});
document.getElementById("day-next").addEventListener("click", (e) => {
  e.preventDefault();
  dayIndex = dayIndex === days.length - 1 ? 0 : dayIndex + 1;
  renderDay();
});
