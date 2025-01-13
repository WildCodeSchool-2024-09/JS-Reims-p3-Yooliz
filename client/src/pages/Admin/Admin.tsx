import { useEffect, useState } from "react";
import "./Admin.css";

type Query = {
  id: number;
  contact_email: string;
  submit_date: string;
  category: string;
  message: string;
};

function Admin() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/queries`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch queries");
        }
        const data = await response.json();
        setQueries(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchQueries();
  }, []);

  const handleEdit = async (id: number) => {
    const newMessage = prompt("Message à modifier :");
    if (newMessage) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/queries/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: newMessage }),
          },
        );
        if (response.ok) {
          setQueries((prevQueries) =>
            prevQueries.map((query) =>
              query.id === id ? { ...query, message: newMessage } : query,
            ),
          );
        } else {
          alert("Failed to update the query");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while updating the query");
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/queries/${id}`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        setQueries((prevQueries) =>
          prevQueries.filter((query) => query.id !== id),
        );
      } else {
        alert("Failed to delete the query");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the query");
    }
  };

  return (
    <div className="admin-container">
      <h2>Formulaires de contact</h2>
      {error && <p className="error">{error}</p>}
      <ul className="queries-list">
        {queries.map((query) => (
          <li key={query.id} className="query-item">
            <p>
              <strong>Email :</strong> {query.contact_email}
            </p>
            <p>
              <strong>Date de soumission :</strong>{" "}
              {new Date(query.submit_date).toLocaleString()}
            </p>
            <p>
              <strong>Catégorie :</strong> {query.category}
            </p>
            <p>
              <strong>Message :</strong> {query.message}
            </p>
            <div className="admin-buttons-container">
              <button
                type="button"
                className="admin-edit-button"
                onClick={() => handleEdit(query.id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="admin-delete-button"
                onClick={() => handleDelete(query.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
