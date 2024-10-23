// Dark mode toggle
document.getElementById('dark-mode-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');
    document.querySelector('.hero-section-i').classList.toggle('dark-mode');
    document.querySelector('.feature-section').classList.toggle('dark-mode');
    document.querySelector('.event-section').classList.toggle('dark-mode');
  });
  const dateInput = document.getElementById('date');
        const today = new Date();
        const fiveYearsFromNow = new Date();
        fiveYearsFromNow.setFullYear(today.getFullYear() + 5);

        // Set min and max date for the input field
        dateInput.min = today.toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
        dateInput.max = fiveYearsFromNow.toISOString().split('T')[0]
  // Event form submission
// Event form submission
document.getElementById('event-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const eventType = document.getElementById('event-type').value;
    const date = document.getElementById('date').value;

    try {
        const response = await fetch(`http://localhost:5000/events?location=${location}&eventType=${eventType}&date=${date}`);
        const events = await response.json();

        const eventsTbody = document.getElementById('events-tbody');
        eventsTbody.innerHTML = ''; // Clear previous results

        if (events.length === 0) {
            eventsTbody.innerHTML = '<tr><td colspan="4">No events found.</td></tr>';
        } else {
            events.forEach(event => {
                const eventRow = document.createElement('tr');
                eventRow.innerHTML = `
                    <td>${formatDate(new Date(event.date))}</td>
                    <td>${event.location}</td>
                    <td>${event.eventType}</td>
                    <td>${event.description}</td>
                    
                `;
                eventsTbody.appendChild(eventRow);
            });
        }

    } catch (error) {
        console.error('Error fetching events:', error);
    }

    document.getElementById('location').value = '';
    document.getElementById('event-type').value = '';
});

  