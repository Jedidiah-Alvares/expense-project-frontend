// contains the Expense addition form
export const ExpenseForm = (props) => {
  const { category, date, amount } = props.refs;
  return (
    <form className="text-start mx-auto" onSubmit={props.handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <input
          list="category"
          className="form-control"
          id="catselected"
          placeholder="Enter The Category"
          ref={category}
        />
        <datalist id="category">
          <option value="Food" />
          <option value="Fuel" />
          <option value="Rent" />
        </datalist>
      </div>
      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          className="form-control"
          id="date"
          placeholder="Enter the Date"
          ref={date}
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
          ref={amount}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};
