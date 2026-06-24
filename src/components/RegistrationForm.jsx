function RegistrationForm({
  form,
  handleChange,
  handleSubmit,
  events,
  message,
  messageType,
}) {
  return (
    <section className="form-container">
      <h2>Workshop Registration</h2>

      {message && (
        <div
          className={`message-box ${messageType}`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <select
          name="degree"
          value={form.degree}
          onChange={handleChange}
          required
        >
          <option value="">
            Select Degree
          </option>
          <option>BCA</option>
          <option>BSc</option>
          <option>B.Tech</option>
          <option>BE</option>
          <option>MCA</option>
          <option>MSc</option>
        </select>

        <select
          name="year"
          value={form.year}
          onChange={handleChange}
          required
        >
          <option value="">
            Year of Study
          </option>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>

        <input
          type="text"
          name="college"
          placeholder="College Name"
          value={form.college}
          onChange={handleChange}
          required
        />

        <select
          name="event"
          value={form.event}
          onChange={handleChange}
          required
        >
          <option value="">
            Select Workshop
          </option>

          {events.map((event) => (
            <option
              key={event.id}
              value={event.name}
            >
              {event.name}
            </option>
          ))}
        </select>

        <button type="submit">
          Register Now
        </button>
      </form>
    </section>
  );
}

export default RegistrationForm;