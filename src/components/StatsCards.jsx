function StatsCards({ participants, events }) {
  const totalParticipants = participants.length;

  const totalEvents = events.length;

  const totalSeats = events.reduce(
    (sum, event) => sum + event.seats,
    0
  );

  const availableSeats =
    totalSeats - totalParticipants;

  const colleges = new Set(
    participants.map((p) => p.college)
  ).size;

  return (
    <section className="stats-section">
      <div className="stat-card">
        <h2>{totalParticipants}</h2>
        <p>Total Participants</p>
      </div>

      <div className="stat-card">
        <h2>{totalEvents}</h2>
        <p>Total Events</p>
      </div>

      <div className="stat-card">
        <h2>{availableSeats}</h2>
        <p>Available Seats</p>
      </div>

      <div className="stat-card">
        <h2>{colleges}</h2>
        <p>Participating Colleges</p>
      </div>
    </section>
  );
}

export default StatsCards;