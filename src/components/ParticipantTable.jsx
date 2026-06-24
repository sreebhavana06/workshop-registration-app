function ParticipantTable({
  participants,
  deleteParticipant,
}) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Degree</th>
            <th>Year</th>
            <th>College</th>
            <th>Workshop</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {participants.length === 0 ? (
            <tr>
              <td
                colSpan="8"
                style={{
                  textAlign: "center",
                }}
              >
                No registrations found
              </td>
            </tr>
          ) : (
            participants.map(
              (participant, index) => (
                <tr key={index}>
                  <td>
                    {participant.name}
                  </td>

                  <td>
                    {participant.contact}
                  </td>

                  <td>
                    {participant.email}
                  </td>

                  <td>
                    {participant.degree}
                  </td>

                  <td>
                    {participant.year}
                  </td>

                  <td>
                    {participant.college}
                  </td>

                  <td>
                    {participant.event}
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteParticipant(
                          index
                        )
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ParticipantTable;