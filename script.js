// List of all available timezones
const TIMEZONES = [
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Anchorage',
    'Pacific/Honolulu',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Moscow',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Bangkok',
    'Asia/Hong_Kong',
    'Asia/Shanghai',
    'Asia/Tokyo',
    'Asia/Seoul',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Australia/Brisbane',
    'Pacific/Auckland',
    'Pacific/Fiji',
    'Africa/Cairo',
    'Africa/Johannesburg',
    'Africa/Lagos',
    'America/Toronto',
    'America/Mexico_City',
    'America/Sao_Paulo',
    'America/Buenos_Aires',
    'Asia/Singapore',
];

// Local storage key
const STORAGE_KEY = 'selectedTimezones';

// DOM Elements
const timezoneSelect = document.getElementById('timezoneSelect');
const timezoneInput = document.getElementById('timezoneInput');
const addBtn = document.getElementById('addBtn');
const clocksContainer = document.getElementById('clocksContainer');
const presetBtns = document.querySelectorAll('.preset-btn');

// Initialize
let selectedTimezones = [];

// Initialize the application
function init() {
    populateTimezoneSelect();
    loadFromLocalStorage();
    setupEventListeners();
    updateAllClocks();
    setInterval(updateAllClocks, 1000);
}

// Populate timezone select dropdown
function populateTimezoneSelect() {
    TIMEZONES.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz;
        option.textContent = tz.replace(/_/g, ' ');
        timezoneSelect.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    addBtn.addEventListener('click', addTimezone);
    timezoneSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            addTimezone(e.target.value);
            timezoneSelect.value = '';
        }
    });

    // Search/filter functionality
    timezoneInput.addEventListener('input', filterTimezones);

    // Preset timezone buttons
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            addTimezone(btn.dataset.tz);
        });
    });
}

// Filter timezones based on search input
function filterTimezones() {
    const searchTerm = timezoneInput.value.toLowerCase();
    const options = timezoneSelect.querySelectorAll('option');

    options.forEach(option => {
        if (option.value === '') return; // Skip the placeholder
        const text = option.textContent.toLowerCase();
        option.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// Add a timezone to the selected list
function addTimezone(timezone = null) {
    const tz = timezone || timezoneSelect.value;

    if (!tz) {
        alert('Please select a timezone');
        return;
    }

    // Check if timezone is already added
    if (selectedTimezones.includes(tz)) {
        alert('This timezone is already added');
        return;
    }

    selectedTimezones.push(tz);
    saveToLocalStorage();
    renderClocks();
    timezoneInput.value = '';
    timezoneSelect.value = '';
}

// Remove a timezone
function removeTimezone(timezone) {
    selectedTimezones = selectedTimezones.filter(tz => tz !== timezone);
    saveToLocalStorage();
    renderClocks();
}

// Render all clock cards
function renderClocks() {
    clocksContainer.innerHTML = '';

    if (selectedTimezones.length === 0) {
        clocksContainer.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <h2>No Timezones Added</h2>
                <p>Select timezones above or click preset buttons to add clocks</p>
            </div>
        `;
        return;
    }

    selectedTimezones.forEach(timezone => {
        const card = createClockCard(timezone);
        clocksContainer.appendChild(card);
    });
}

// Create a single clock card
function createClockCard(timezone) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.dataset.timezone = timezone;

    card.innerHTML = `
        <button class="remove-btn" title="Remove timezone">×</button>
        <div class="timezone-name">${timezone.replace(/_/g, ' ')}</div>
        <div class="timezone-offset" id="offset-${timezone}"></div>
        <div class="digital-clock" id="digital-${timezone}">--:--:--</div>
        <div class="analog-clock">
            <div class="hand hour-hand" id="hour-${timezone}"></div>
            <div class="hand minute-hand" id="minute-${timezone}"></div>
            <div class="hand second-hand" id="second-${timezone}"></div>
        </div>
        <div class="date-info">
            <span class="date-display" id="date-${timezone}">--/--/--</span>
            <span class="day-display" id="day-${timezone}">--</span>
        </div>
    `;

    // Remove button functionality
    card.querySelector('.remove-btn').addEventListener('click', () => {
        removeTimezone(timezone);
    });

    return card;
}

// Update all clocks
function updateAllClocks() {
    selectedTimezones.forEach(timezone => {
        updateClock(timezone);
    });
}

// Update a single clock
function updateClock(timezone) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const timeString = formatter.format(now);
    const [hours, minutes, seconds] = timeString.split(':').map(Number);

    // Update digital clock
    const digitalClock = document.getElementById(`digital-${timezone}`);
    if (digitalClock) {
        digitalClock.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    // Update analog clock hands
    updateAnalogClock(timezone, hours, minutes, seconds);

    // Update date and day
    updateDateDisplay(timezone);

    // Update timezone offset
    updateTimezoneOffset(timezone);
}

// Update analog clock hands
function updateAnalogClock(timezone, hours, minutes, seconds) {
    const hourHand = document.getElementById(`hour-${timezone}`);
    const minuteHand = document.getElementById(`minute-${timezone}`);
    const secondHand = document.getElementById(`second-${timezone}`);

    if (hourHand) {
        const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
        hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }

    if (minuteHand) {
        const minuteDegrees = minutes * 6 + seconds * 0.1;
        minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    }

    if (secondHand) {
        const secondDegrees = seconds * 6;
        secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    }
}

// Update date display
function updateDateDisplay(timezone) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });

    const parts = formatter.formatToParts(now);
    const dateObj = {};
    parts.forEach(part => {
        dateObj[part.type] = part.value;
    });

    const dateStr = `${dateObj.month}/${dateObj.day}/${dateObj.year}`;
    const dayStr = dateObj.weekday;

    const dateDisplay = document.getElementById(`date-${timezone}`);
    const dayDisplay = document.getElementById(`day-${timezone}`);

    if (dateDisplay) dateDisplay.textContent = dateStr;
    if (dayDisplay) dayDisplay.textContent = dayStr;
}

// Update timezone offset
function updateTimezoneOffset(timezone) {
    const now = new Date();
    const tzFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const utcFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    const tzTime = tzFormatter.format(now);
    const utcTime = utcFormatter.format(now);

    const [tzH, tzM] = tzTime.split(':').map(Number);
    const [utcH, utcM] = utcTime.split(':').map(Number);

    let offsetHours = tzH - utcH;
    let offsetMinutes = tzM - utcM;

    if (offsetMinutes < 0) {
        offsetHours--;
        offsetMinutes += 60;
    } else if (offsetMinutes > 0) {
        if (offsetHours < 0) {
            offsetHours++;
        }
    }

    if (offsetHours < 0) {
        offsetHours = ((offsetHours % 24) + 24) % 24;
    }

    const sign = offsetHours >= 0 && offsetMinutes >= 0 ? '+' : '-';
    const offset = `UTC ${sign}${String(Math.abs(offsetHours)).padStart(2, '0')}:${String(Math.abs(offsetMinutes)).padStart(2, '0')}`;

    const offsetDisplay = document.getElementById(`offset-${timezone}`);
    if (offsetDisplay) offsetDisplay.textContent = offset;
}

// Save to local storage
function saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedTimezones));
}

// Load from local storage
function loadFromLocalStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            selectedTimezones = JSON.parse(saved);
            renderClocks();
        } catch (e) {
            console.error('Error loading from localStorage:', e);
        }
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);