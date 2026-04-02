// ==================== CONSTANTS & VARIABLES ====================
const apiURL = "https://script.google.com/macros/s/AKfycbxRLGXgLuH1Wt6isqes6Cp5pWEu-G5yNO93U8sISMLpOBjXpxt-RbI5CpD73xXf0Qar/exec";

let crew = [];
let crewIndex = 0;

let y = 0;
let events = [];
let highlightEvents = [];
let highlightIndex = 0;

// ==================== CREW ====================
async function loadCrew() {
  try {
    let allFiles = [];
    let page = 1;

    while (true) {
      const res = await fetch(`https://api.github.com/repos/mediakitaproductions/foto-tim-mk/contents/?per_page=100&page=${page}`);
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) break;

      allFiles = allFiles.concat(data);
      if (data.length < 100) break;
      page++;
    }

    crew = allFiles
      .filter(file => file.name.toLowerCase().endsWith('.png'))
      .map(file => ({
        name: file.name.replace(/\.png$/i, '').toUpperCase(),
        foto: file.download_url
      }));

    crew.sort(() => Math.random() - 0.5);

    if (crew.length > 0) {
      crewIndex = 0;
      displayCrew(crewIndex);
      setInterval(rotateCrew, 5000);
    }

  } catch (err) {
    console.error("Gagal load crew:", err);
  }
}

function displayCrew(index) {
  const img = document.getElementById("crewImage");
  img.src = crew[index].foto;
}

function rotateCrew() {
  const img = document.getElementById("crewImage");

  const nextIndex = (crewIndex + 1) % crew.length;

  img.classList.add("fade-out");

  setTimeout(() => {
    crewIndex = nextIndex;
    img.src = crew[crewIndex].foto;
    img.classList.remove("fade-out");
  }, 400);
}

// ==================== INIT ====================
loadCrew();