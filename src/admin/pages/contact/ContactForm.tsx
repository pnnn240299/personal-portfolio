import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ContactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: id ? "John Doe" : "",
    email: id ? "john@example.com" : "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving contact:", formData);
    navigate("/admin/contacts");
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h1 className="text-xl font-bold mb-4">{id ? "Edit Contact" : "Create Contact"}</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </label>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
