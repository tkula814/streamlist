import { useEffect, useState } from "react";

function SavedEvents() {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem("events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const [eventName, setEventName] = useState("");

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    event.preventDefault();

    if (!eventName.trim()) {
      return;
    }

    const newEvent = {
      id: Date.now(),
      name: eventName,
    };

    setEvents([...events, newEvent]);
    setEventName("");
  };

  const deleteEvent = (id) => {
    const updatedEvents = events.filter((eventItem) => eventItem.id !== id);
    setEvents(updatedEvents);
  };

  return (
    <main className="page">
      <h1>Saved Events</h1>
      <p>
        Add an event below. The event will remain saved even after refreshing
        the page.
      </p>

      <form className="event-form" onSubmit={addEvent}>
        <input
          type="text"
          placeholder="Enter event name"
          value={eventName}
          onChange={(event) => setEventName(event.target.value)}
        />
        <button type="submit">Add Event</button>
      </form>

      <section className="event-list">
        {events.length === 0 ? (
          <p>No saved events yet.</p>
        ) : (
          <ul>
            {events.map((eventItem) => (
              <li key={eventItem.id}>
                <span>{eventItem.name}</span>
                <button type="button" onClick={() => deleteEvent(eventItem.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default SavedEvents;