# Digital Clock - Multiple Time Zones 🌍

A beautiful, responsive web application that displays the current time across different time zones simultaneously. Features both digital and analog clock displays with local storage persistence.

## Features ✨

- **Multiple Time Zones**: Display current time in any timezone worldwide
- **Dual Display**: Each timezone shows both digital (HH:MM:SS) and analog clock representations
- **Real-time Updates**: Clocks update every second automatically
- **Local Storage**: Your selected timezones are saved automatically and restored on page reload
- **Quick Add Presets**: Popular timezone buttons for fast selection (New York, London, Tokyo, Sydney, etc.)
- **Search & Filter**: Search for timezones by name
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Date & Day Display**: Shows current date and day of the week for each timezone
- **UTC Offset Display**: Shows the UTC offset for each timezone
- **Remove Timezones**: Delete any timezone from your list with a single click
- **Beautiful UI**: Modern gradient design with smooth animations and transitions

## Usage 🚀

### Adding Timezones

1. **Using Preset Buttons**: Click any of the quick-add buttons (New York, London, Tokyo, etc.)
2. **Using Dropdown**: Select a timezone from the dropdown menu
3. **Using Search**: Type in the search box to filter timezones, then select one

### Removing Timezones

Click the **×** button in the top-right corner of any clock card to remove it.

### Persistence

Your selected timezones are automatically saved to your browser's local storage and will be restored when you revisit the page.

## Supported Timezones

The application supports all major timezones, including:

**Americas**
- America/New_York, America/Chicago, America/Denver, America/Los_Angeles
- America/Anchorage, Pacific/Honolulu
- America/Toronto, America/Mexico_City, America/Sao_Paulo, America/Buenos_Aires

**Europe**
- Europe/London, Europe/Paris, Europe/Berlin, Europe/Moscow

**Asia**
- Asia/Dubai, Asia/Kolkata, Asia/Bangkok, Asia/Hong_Kong
- Asia/Shanghai, Asia/Tokyo, Asia/Seoul, Asia/Singapore

**Africa**
- Africa/Cairo, Africa/Johannesburg, Africa/Lagos

**Oceania**
- Australia/Sydney, Australia/Melbourne, Australia/Brisbane
- Pacific/Auckland, Pacific/Fiji

## Technology Stack 🛠️

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients, flexbox, and grid
- **JavaScript**: Vanilla JS (no frameworks)
- **APIs Used**:
  - `Intl.DateTimeFormat`: For timezone conversions
  - `localStorage`: For data persistence

## File Structure 📁

```
├── index.html          # Main HTML structure
├── styles.css          # Styling and animations
├── script.js           # JavaScript logic
└── README.md           # This file
```

## How It Works 🔧

### Timezone Conversion

The application uses the JavaScript `Intl.DateTimeFormat` API with the `timeZone` option to convert the current UTC time to the selected timezone:

```javascript
const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
});
```

### Analog Clock Calculation

The analog clock hands are rotated based on the current time:
- **Hour hand**: Rotates 30° per hour + 0.5° per minute
- **Minute hand**: Rotates 6° per minute + 0.1° per second
- **Second hand**: Rotates 6° per second

### Local Storage

Selected timezones are stored as a JSON array:

```javascript
localStorage.setItem('selectedTimezones', JSON.stringify([
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo'
]));
```

## Browser Compatibility 🌐

- Chrome/Edge 24+
- Firefox 29+
- Safari 9.1+
- Opera 15+
- All modern browsers with ES6 support

## Features Coming Soon 🔄

- [ ] Time format preferences (12/24 hour)
- [ ] Custom timezone labels
- [ ] Alarm functionality
- [ ] Export/import timezone lists
- [ ] Dark mode toggle
- [ ] Timezone comparison (time difference calculator)

## License 📄

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing 🤝

Contributions are welcome! Feel free to open issues and submit pull requests.

## Author

Created with ❤️ for timezone enthusiasts and remote teams.

---

**Enjoy tracking time across the world!** 🌍✨