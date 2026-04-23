import React, { useState } from "react";
import getTodayDate from "../../../utils/getTodayDate";
import { useDispatch } from "react-redux";
import { addUser } from "../userSlice";
import Modal from "../../../shared/components/Modal";

const AddUser = () => {
  const dispatch = useDispatch();
  const initialState = {
    id: null,
    name: "",
    email: "",
    role: "",
    status: "",
    joinDate: null,
  };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = {
      name: "",
      email: "",
    };

    if (formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      errors.email = "Email should include '@' and '.'";
    }

    setError(errors);

    const hasErrors = Object.values(errors).some((value) => value);

    if (hasErrors) return;

    const date = getTodayDate();
    const newUser = {
      ...formData,
      id: Date.now(),
      status: "active",
      joinDate: date,
    };

    dispatch(addUser(newUser));
    setFormData(initialState);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnClose = () => {
    setError({});
    setFormData(initialState);
  };
  return (
    <Modal
      title={"Create new user"}
      buttonTitle={"Add User"}
      onClose={handleOnClose}
    >
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div>
          {error.name && <p className="text-red-500">{error.name}</p>}
          <label htmlFor="name">Name:</label>
          <input
            value={formData.name}
            onChange={handleOnChange}
            type="text"
            className="border rounded-md ms-2 ps-1"
            id="name"
            name="name"
          />
        </div>
        <div>
          {error.email && <p className="text-red-500">{error.email}</p>}
          <label htmlFor="email">Email:</label>
          <input
            value={formData.email}
            onChange={handleOnChange}
            type="email"
            className="border rounded-md ms-3 ps-1"
            id="email"
            name="email"
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select
            value={formData.role}
            onChange={handleOnChange}
            className=" focus-visible:outline-0 bg-gray-300 border rounded-md ms-5"
            id="role"
            name="role"
          >
            <option value="">Please choose an option</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
          <div className="text-center">
            <button
              type="submit"
              className=" mt-5 cursor-pointer bg-gray-200 rounded-md text-nowrap px-2 outline-1  w-full"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddUser;
