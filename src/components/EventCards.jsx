import { useEffect, useState } from "react";

function EventCards({
  events,
  participants,
}) {
  const [currentTime, setCurrentTime] =
    useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getCountdown = (date) => {
    const targetDate = new Date(date);
    const difference =
      targetDate - currentTime;

    if (difference <= 0) {
      return "Event Started";
    }

    const days = Math.floor(
      difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (difference %
        (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (difference %
        (1000 * 60 * 60)) /
        (1000 * 60)
    );

    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <section>
      <h2 className="section-title">
        Upcoming Workshops
      </h2>

      <div className="event-grid">
        {events.map((event) => {
          const registeredCount =
            participants.filter(
              (participant) =>
                participant.event ===
                event.name
            ).length;

          const availableSeats =
            event.seats -
            registeredCount;

          let status =
            "Registration Open";

          if (availableSeats <= 0) {
            status = "Full";
          }

          if (
            new Date(event.date) <
            currentTime
          ) {
            status = "Completed";
          }

          return (
            <div
              key={event.id}
              className="event-card"
            >
              <h3>{event.name}</h3>

              <p>
                📅{" "}
                {new Date(
                  event.date
                ).toLocaleDateString()}
              </p>

              <div className="countdown">
                ⏳{" "}
                {getCountdown(
                  event.date
                )}
              </div>

              <p>
                👥 Registered:{" "}
                {registeredCount}
              </p>

              <p>
                💺 Available:{" "}
                {availableSeats}
              </p>

              <span
                className={`status ${
                  status ===
                  "Registration Open"
                    ? "open"
                    : status === "Full"
                    ? "full"
                    : "completed"
                }`}
              >
                {status}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default EventCards;