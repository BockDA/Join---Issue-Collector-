const timeState = {
  entries: [],
  editingId: null,
};

const employeeDefaults = ["Max Schneider", "Lea Hoffmann", "Samir Yildiz", "Nina Becker"];
const projectDefaults = ["BV Mueller", "EFH Klein", "Industriehalle Nord", "Wartung Stadtwerke"];

document.addEventListener("DOMContentLoaded", initTimeTracking);

async function initTimeTracking() {
  setInitialDates();
  bindEvents();
  await loadTimeEntries();
}

function bindEvents() {
  document.getElementById("time-form").addEventListener("submit", saveTimeEntry);
  document.getElementById("filter-from").addEventListener("input", renderEntries);
  document.getElementById("filter-to").addEventListener("input", renderEntries);
  document.getElementById("filter-query").addEventListener("input", renderEntries);
  document.getElementById("export-csv").addEventListener("click", exportCsv);

  document.querySelectorAll("[data-now]").forEach((button) => {
    button.addEventListener("click", () => {
      document.getElementById(`${button.dataset.now}-time`).value = getCurrentTime();
    });
  });

  document.querySelector("[data-preset='full-day']").addEventListener("click", () => {
    document.getElementById("start-time").value = "07:00";
    document.getElementById("end-time").value = "16:00";
    document.getElementById("break-minutes").value = "60";
  });
}

function setInitialDates() {
  const today = new Date().toISOString().slice(0, 10);
  document.getElementById("work-date").value = today;
  document.getElementById("filter-from").value = today.slice(0, 8) + "01";
  document.getElementById("filter-to").value = today;
  document.getElementById("today-date").textContent = new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());
}

async function loadTimeEntries() {
  setSyncState("Lade Daten...");
  try {
    const data = await firebaseRequest("/timeEntries");
    timeState.entries = Object.entries(data || {}).map(([id, entry]) => ({ id, ...entry }));
    timeState.entries.sort((a, b) => `${b.date}${b.start}`.localeCompare(`${a.date}${a.start}`));
    renderDatalists();
    renderEntries();
    setSyncState("Firebase synchron");
  } catch (error) {
    console.error(error);
    setSyncState("Firebase Fehler", true);
    renderEntries();
  }
}

async function saveTimeEntry(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const entry = collectEntry(form);
  if (!entry) return;

  const id = timeState.editingId || createId();
  setSyncState("Speichere...");

  try {
    await firebaseRequest(`/timeEntries/${id}`, "PUT", entry);
    const existingIndex = timeState.entries.findIndex((item) => item.id === id);
    const nextEntry = { id, ...entry };
    if (existingIndex >= 0) {
      timeState.entries[existingIndex] = nextEntry;
    } else {
      timeState.entries.unshift(nextEntry);
    }
    timeState.editingId = null;
    form.reset();
    setInitialDates();
    renderDatalists();
    renderEntries();
    setSyncState("Gespeichert");
  } catch (error) {
    console.error(error);
    setSyncState("Speichern fehlgeschlagen", true);
  }
}

function collectEntry(form) {
  const formData = new FormData(form);
  const start = formData.get("start");
  const end = formData.get("end");
  const breakMinutes = Number(formData.get("breakMinutes") || 0);
  const grossMinutes = calculateMinutes(start, end);
  const netMinutes = grossMinutes - breakMinutes;

  if (netMinutes <= 0) {
    setSyncState("Zeitangaben pruefen", true);
    return null;
  }

  return {
    employee: formData.get("employee").trim(),
    project: formData.get("project").trim(),
    date: formData.get("date"),
    activity: formData.get("activity"),
    start,
    end,
    breakMinutes,
    note: formData.get("note").trim(),
    netMinutes,
    updatedAt: new Date().toISOString(),
  };
}

function renderEntries() {
  const body = document.getElementById("entries-body");
  const entries = getFilteredEntries();
  body.innerHTML = entries.map(getEntryRow).join("");
  document.getElementById("empty-state").classList.toggle("visible", entries.length === 0);
  updateStats(entries);
  bindRowActions();
}

function getEntryRow(entry) {
  return `
    <tr>
      <td>${formatDate(entry.date)}<span class="table-note">${entry.activity}</span></td>
      <td>${escapeHtml(entry.employee)}</td>
      <td>${escapeHtml(entry.project)}${entry.note ? `<span class="table-note">${escapeHtml(entry.note)}</span>` : ""}</td>
      <td>${entry.start} - ${entry.end}</td>
      <td>${entry.breakMinutes} Min.</td>
      <td><strong>${formatMinutes(entry.netMinutes)}</strong></td>
      <td>
        <div class="row-actions">
          <button class="icon-button" type="button" data-edit="${entry.id}" aria-label="Eintrag bearbeiten">
            <img src="../assets/icons/edit.svg" alt="">
          </button>
          <button class="icon-button danger" type="button" data-delete="${entry.id}" aria-label="Eintrag loeschen">
            <img src="../assets/icons/delete.svg" alt="">
          </button>
        </div>
      </td>
    </tr>
  `;
}

function bindRowActions() {
  document.querySelectorAll("[data-edit]").forEach((button) => {
    button.addEventListener("click", () => editEntry(button.dataset.edit));
  });
  document.querySelectorAll("[data-delete]").forEach((button) => {
    button.addEventListener("click", () => deleteEntry(button.dataset.delete));
  });
}

function editEntry(id) {
  const entry = timeState.entries.find((item) => item.id === id);
  if (!entry) return;

  timeState.editingId = id;
  document.getElementById("employee").value = entry.employee;
  document.getElementById("project").value = entry.project;
  document.getElementById("work-date").value = entry.date;
  document.getElementById("activity").value = entry.activity;
  document.getElementById("start-time").value = entry.start;
  document.getElementById("end-time").value = entry.end;
  document.getElementById("break-minutes").value = entry.breakMinutes;
  document.getElementById("note").value = entry.note || "";
  document.getElementById("employee").focus();
  setSyncState("Bearbeitungsmodus");
}

async function deleteEntry(id) {
  const entry = timeState.entries.find((item) => item.id === id);
  if (!entry) return;

  const confirmed = window.confirm(`Arbeitszeit von ${entry.employee} am ${formatDate(entry.date)} loeschen?`);
  if (!confirmed) return;

  setSyncState("Loesche...");
  try {
    await firebaseRequest(`/timeEntries/${id}`, "DELETE");
    timeState.entries = timeState.entries.filter((item) => item.id !== id);
    renderDatalists();
    renderEntries();
    setSyncState("Geloescht");
  } catch (error) {
    console.error(error);
    setSyncState("Loeschen fehlgeschlagen", true);
  }
}

function getFilteredEntries() {
  const from = document.getElementById("filter-from").value;
  const to = document.getElementById("filter-to").value;
  const query = document.getElementById("filter-query").value.trim().toLowerCase();

  return timeState.entries.filter((entry) => {
    const inRange = (!from || entry.date >= from) && (!to || entry.date <= to);
    const haystack = `${entry.employee} ${entry.project} ${entry.activity} ${entry.note}`.toLowerCase();
    return inRange && (!query || haystack.includes(query));
  });
}

function updateStats(entries) {
  const totalMinutes = entries.reduce((sum, entry) => sum + Number(entry.netMinutes || 0), 0);
  const projects = new Set(entries.map((entry) => entry.project).filter(Boolean));
  const today = new Date().toISOString().slice(0, 10);
  const todayMinutes = timeState.entries
    .filter((entry) => entry.date === today)
    .reduce((sum, entry) => sum + Number(entry.netMinutes || 0), 0);

  document.getElementById("entry-count").textContent = entries.length;
  document.getElementById("total-hours").textContent = formatMinutes(totalMinutes);
  document.getElementById("project-count").textContent = projects.size;
  document.getElementById("today-total").textContent = formatMinutes(todayMinutes);
}

function renderDatalists() {
  renderDatalist("employee-list", [...employeeDefaults, ...timeState.entries.map((entry) => entry.employee)]);
  renderDatalist("project-list", [...projectDefaults, ...timeState.entries.map((entry) => entry.project)]);
}

function renderDatalist(id, values) {
  const uniqueValues = [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, "de"));
  document.getElementById(id).innerHTML = uniqueValues.map((value) => `<option value="${escapeHtml(value)}"></option>`).join("");
}

function exportCsv() {
  const rows = getFilteredEntries();
  const header = ["Datum", "Mitarbeiter", "Baustelle", "Taetigkeit", "Start", "Ende", "Pause", "Stunden", "Notiz"];
  const csvRows = rows.map((entry) => [
    entry.date,
    entry.employee,
    entry.project,
    entry.activity,
    entry.start,
    entry.end,
    entry.breakMinutes,
    (entry.netMinutes / 60).toFixed(2).replace(".", ","),
    entry.note || "",
  ]);
  const csv = [header, ...csvRows].map((row) => row.map(escapeCsv).join(";")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `arbeitszeiten-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

async function firebaseRequest(path, method = "GET", body = undefined) {
  if (typeof Base_URL === "undefined") {
    throw new Error("Base_URL ist nicht definiert.");
  }

  const response = await fetch(`${Base_URL}${path}.json`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Firebase request failed: ${response.status}`);
  }

  return response.json();
}

function calculateMinutes(start, end) {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  let startMinutes = startHour * 60 + startMinute;
  let endMinutes = endHour * 60 + endMinute;
  if (endMinutes < startMinutes) endMinutes += 24 * 60;
  return endMinutes - startMinutes;
}

function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `${hours}:${String(rest).padStart(2, "0")} h`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("de-DE").format(new Date(`${date}T12:00:00`));
}

function getCurrentTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function createId() {
  return `time-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function setSyncState(message, isError = false) {
  const element = document.getElementById("sync-state");
  element.textContent = message;
  element.classList.toggle("error", isError);
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeCsv(value) {
  const text = String(value || "").replaceAll('"', '""');
  return `"${text}"`;
}
