import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsCards from "./components/StatsCards";
import EventCards from "./components/EventCards";
import RegistrationForm from "./components/RegistrationForm";
import SearchBar from "./components/SearchBar";
import ParticipantTable from "./components/ParticipantTable";

import { events } from "./data";

function App() {
  const [participants, setParticipants] = useState(() => {
    const savedData = localStorage.getItem("participants");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [search, setSearch] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    degree: "",
    year: "",
    college: "",
    event: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "participants",
      JSON.stringify(participants)
    );
  }, [participants]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const duplicate = participants.find(
      (participant) =>
        participant.email.toLowerCase() ===
          form.email.toLowerCase() ||
        participant.contact === form.contact
    );

    if (duplicate) {
      setMessageType("error");

      setMessage(
        "⚠ Participant already registered with this Email or Contact Number."
      );

      setTimeout(() => {
        setMessage("");
      }, 4000);

      return;
    }

    setParticipants([
      ...participants,
      form,
    ]);

    setMessageType("success");

    setMessage(
      `✅ Registration Confirmed! Welcome ${form.name} to ${form.event}`
    );

    setTimeout(() => {
      setMessage("");
    }, 5000);

    setForm({
      name: "",
      contact: "",
      email: "",
      degree: "",
      year: "",
      college: "",
      event: "",
    });
  };

  const deleteParticipant = (index) => {
    const updatedParticipants =
      participants.filter(
        (_, i) => i !== index
      );

    setParticipants(
      updatedParticipants
    );
  };

  const filteredParticipants =
    participants.filter((participant) =>
      participant.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const downloadCSV = () => {
    const headers = [
      "Name",
      "Contact",
      "Email",
      "Degree",
      "Year",
      "College",
      "Workshop",
    ];

    const rows =
      participants.map((p) => [
        p.name,
        p.contact,
        p.email,
        p.degree,
        p.year,
        p.college,
        p.event,
      ]);

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "participants.csv";

    link.click();
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <Hero />

        <StatsCards
          participants={participants}
          events={events}
        />

        <EventCards
          events={events}
          participants={participants}
        />

        <RegistrationForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          events={events}
          message={message}
          messageType={messageType}
        />

        <div className="participant-header">
          <h2>
            Registered Participants
          </h2>

          <button
            onClick={downloadCSV}
            className="csv-btn"
          >
            Download CSV
          </button>
        </div>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <ParticipantTable
          participants={
            filteredParticipants
          }
          deleteParticipant={
            deleteParticipant
          }
        />
      </div>
    </>
  );
}

export default App;