import React, { Component } from "react";
import { AddCategory } from "./AddCategory";
import axios from "axios";
import { EditCategory } from "./EditCategory";

export class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.getmonthdata();
  }

  getmonthdata = () => {
    axios.get("http://localhost:4000/category/get/jed").then((res) => {
      this.setState({
        data: res.data,
      });
    });
  };

  render() {
    return (
      <div className="container my-5">
        <button
          className="btn btn-secondary my-2 text-center"
          data-bs-toggle="modal"
          data-bs-target="#addcategory"
        >
          + Add Category
        </button>
        <table class="table w-100 bg-light">
          <thead>
            <tr>
              <th scope="col">NO.</th>
              <th scope="col">Category</th>
              <th scope="col">Budget</th>
              <th scope="col" style={{ width: "10%" }}></th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            {this.state.data.map((data, i) => (
              <tr>
                <th scope="row">{i + 1}</th>
                <td>{data._id}</td>
                <td className="d-flexs">
                  <span className="flex-grow-1">
                    {data.budget >= 0 ? data.budget : "-"}
                  </span>
                </td>
                <td>
                  <div class="dropdown">
                    <button
                      type="button"
                      class="btn"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-bs-auto-close="outside"
                    >
                      &#128393;
                    </button>
                    <EditCategory
                      getmonthdata={this.getmonthdata}
                      category={data._id}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AddCategory getmonthdata={this.getmonthdata} />
      </div>
    );
  }
}

export default Category;
