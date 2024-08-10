import React, { useEffect, useState } from "react";
import "./Starting.css";
import axios from "axios";

const Starting = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
    category: "Food", // Setting a default value
  });

  // Fetch expenses on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/expenses")
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the expenses!", error);
      });
  }, []);

  // Handle input change
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5001/api/expenses", formData)
      .then((response) => {
        // Re-fetch the expenses after a successful post or update the state
        axios
          .get("http://localhost:5001/api/expenses")
          .then((response) => {
            setExpenses(response.data);
          })
          .catch((error) => {
            console.error("There was an error fetching the expenses!", error);
          });
      })
      .catch((err) => {
        console.log("There was an error saving the expense!", err);
      });
    alert("Form submitted successfully");
  };

  return (
    <div>
      <center>
        <h1>Expense Tracker</h1>
      </center>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Expense Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="money">Amount Spent</label>
          <input
            type="text"
            id="money"
            name="amount"
            placeholder="Enter the amount spent"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Enter your description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Expenses List</h2>
        <ul className="expense-list">
          {expenses.map((expense) => (
            <li key={expense.id}>
              <span className="expense-title">{expense.id}</span>
              <span className="expense-title">{expense.title}</span>
              <span className="expense-amount">{expense.amount}</span>
              <span className="expense-description">{expense.description}</span>
              <span className="expense-category">{expense.category}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Starting;
