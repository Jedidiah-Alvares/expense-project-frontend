import { useEffect } from "react";

// contains the Expense addition form
export const ExpenseForm = (props) => {
  const form = props.refs;
  const categories = props.categories;

  const dateToday = new Date();

  let day = dateToday.getDate();
  day = day < 10 ? "0" + day : day;
  let month = dateToday.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let year = dateToday.getFullYear();

  useEffect(() => {
    document.getElementById("success").style.display = "none";
    document.getElementById("danger").style.display = "none";
  }, []);

  const handleForm = () => {
    document.getElementById("success").style.display = "none";
    document.getElementById("danger").style.display = "none";
  };

  return (
    <form
      className="text-start mx-auto"
      onSubmit={props.handleSubmit}
      ref={form}
      onFocus={handleForm}
    >
      <div className="mb-3">
        <label className="form-label">Category</label>
        <input
          list="category"
          className="form-control"
          id="catselected"
          placeholder="Enter The Category"
          autoComplete="off"
        />
        <datalist id="category">
          {categories.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>
      </div>
      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          placeholder="Enter the Date"
          max={`${year}-${month}-${day}`}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Amount</label>
        <input
          type="number"
          className="form-control"
          id="amnt"
          placeholder="Enter the Amount Expended"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <div className="alert alert-success mt-2" role="alert" id="success">
        The Expense has been Added
      </div>
      <div className="alert alert-danger mt-2" role="alert" id="danger">
        The Category doesn't Exist
      </div>
    </form>
  );
};
