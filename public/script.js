const parentDiv = document.getElementById("events");
const numberOfChildren = parentDiv.children.length;

function showToast(message) {
  document
    .getElementById("successToast")
    .querySelector(".toast-body").textContent = message;

  var toastEl = document.getElementById("successToast");
  var toast = new bootstrap.Toast(toastEl);

  toast.show();
}

function renderEvents() {
  fetch("/event_list")
    .then((response) => response.json())
    .then((events) => {
      const eventContainer = document.getElementById("events");
      eventContainer.innerHTML = "";

      events.forEach((event) => {
        const eventDiv = document.createElement("div");
        eventDiv.className = "event-container";

        eventDiv.innerHTML = `
  <div class="card mb-4 shadow-sm">
    <div class="card-body">
      <div class="row mb-3">
        <div class="col-md-4">
          <label class="form-label">Event ID</label>
          <input type="text" class="form-control" value="${event.id}" readonly>
        </div>
        <div class="col-md-8">
          <label class="form-label">Event Name</label>
          <input type="text" class="form-control" value="${event.event_name}">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label">Event Image</label>
          <input type="text" class="form-control" value="${event.image_url}">
        </div>
        <div class="col-md-6">
          <label class="form-label">Description</label>
          <input type="text" class="form-control" value="${event.description}">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label">Rules</label>
          <input type="text" class="form-control" value="${event.rules}">
        </div>
        <div class="col-md-3">
          <label class="form-label">Entry Fee</label>
          <input type="number" class="form-control" value="${event.entry_fee}">
        </div>
        <div class="col-md-3">
          <label class="form-label">Prizes</label>
          <input type="text" class="form-control" value="${event.prize}">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-4">
          <label class="form-label">Event Lead</label>
          <input type="text" class="form-control" value="${event.event_lead}">
        </div>
        <div class="col-md-2">
          <label class="form-label">Days</label>
          <select class="form-select" aria-label="Select Day">
            <option value="Day 1" ${event.schedule_day === 'Day 1' ? 'selected' : ''}>Day 1</option>
            <option value="Day 2" ${event.schedule_day === 'Day 2' ? 'selected' : ''}>Day 2</option>
          </select>
        </div>

        <div class="col-md-3">
          <label class="form-label">Timing</label>
          <input type="text" class="form-control" value="${event.timing}">
        </div>
        <div class="col-md-3">
          <label class="form-label">Location</label>
          <input type="text" class="form-control" value="${event.location}">
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button class="btn btn-primary me-2" onclick="updateRow(${event.id})">Update</button>
        <button class="btn btn-danger" onclick="deleteRow(${event.id})">Delete</button>
      </div>
    </div>
  </div>
`;

        eventContainer.appendChild(eventDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching events:", error);
    });
}

function updateRow(eventId) {
  const eventDiv = document
    .querySelector(`.event-container input[value="${eventId}"]`)
    .closest(".event-container");
  const updatedEvent = {
    event_name: eventDiv.querySelector(".row.mb-3:nth-child(1) .col-md-8 input").value,
    image_url: eventDiv.querySelector(".row.mb-3:nth-child(2) .col-md-6:nth-child(1) input").value,
    description: eventDiv.querySelector(".row.mb-3:nth-child(2) .col-md-6:nth-child(2) input").value,
    rules: eventDiv.querySelector(".row.mb-3:nth-child(3) .col-md-6:nth-child(1) input").value,
    entry_fee: eventDiv.querySelector(".row.mb-3:nth-child(3) .col-md-3:nth-child(2) input").value,
    prize: eventDiv.querySelector(".row.mb-3:nth-child(3) .col-md-3:nth-child(3) input").value,
    event_lead: eventDiv.querySelector(".row.mb-3:nth-child(4) .col-md-4 input").value,
    schedule_day: eventDiv.querySelector(".row.mb-3:nth-child(4) .col-md-2 select").value,
    timing: eventDiv.querySelector(".row.mb-3:nth-child(4) .col-md-3:nth-child(3) input").value,
    location: eventDiv.querySelector(".row.mb-3:nth-child(4) .col-md-3:nth-child(4) input").value,
};


  fetch(`/event/${eventId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEvent),
  })
    .then((response) => {
      if (response.ok) {
        showToast("Event updated successfully");
      } else {
        showToast("Failed to update event");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function deleteRow(eventId) {
  fetch(`/event/${eventId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        showToast("Event deleted successfully");
        renderEvents();
      } else {
        showToast("Failed to delete event");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function addEvent() {
  const temp = document.getElementById("events");
  const newEvent = {
    description: "New Event Description",
    rules: "New Event Rules",
    entryFee: 0,
    prize: "New Event Prize",
    eventLead: "New Event Lead",
    scheduleDay: "New Event Day",
    timing: "12:00 PM",
    location: "New Event Location",
  };
  fetch("/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEvent),
  })
    .then((response) => {
      if (response.ok) {
        showToast("Event added successfully");
        document.location.reload();
      } else {
        showToast("Failed to add event");
      }
    })
    .catch((error) => console.error("Error:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  renderEvents();
});
