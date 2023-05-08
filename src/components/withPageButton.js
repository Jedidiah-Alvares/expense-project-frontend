import React, { Component, createRef } from "react";

const withPageButton = (WrappedComponent) => {
  class withPageButton extends Component {
    constructor(props) {
      super(props);

      this.state = {
        pageNo: 0,
        isLoading: false,
      };

      this.child = createRef();
    }

    hideButtons = () => {
      if (this.state.isLoading) {
        document.getElementById("prev").style.visibility = "hidden";
        document.getElementById("prev").style.visibility = "hidden";
      }
    };

    changeLoading = () => {
      this.setState(
        {
          isLoading: !this.state.isLoading,
        },
        () => this.hideButtons()
      );
    };

    // changes the button visiblity of previous and next button
    setButtonVisiblity = (prev, next) => {
      if (prev === 0)
        document.getElementById("prev").style.visibility = "hidden";
      else document.getElementById("prev").style.visibility = "visible";

      if (next <= 0)
        document.getElementById("next").style.visibility = "hidden";
      else document.getElementById("next").style.visibility = "visible";
    };

    resetPageNo = () => {
      this.setState(
        {
          pageNo: 0,
        },
        () => this.child.current.getData()
      );
    };

    handleButton = (e) => {
      console.log(this.child);
      this.setState(
        {
          pageNo:
            e.target.id === "prev"
              ? this.state.pageNo - 1
              : this.state.pageNo + 1,
        },
        () => this.child.current.getData()
      );
    };

    render() {
      return (
        <WrappedComponent
          ref={this.child}
          setButtonVisiblity={this.setButtonVisiblity}
          pageNo={this.state.pageNo}
          reset={this.resetPageNo}
          changeLoading={this.changeLoading}
          {...this.props}
        >
          <div className="page">
            <button
              type="button"
              class="btn btn-dark"
              id="prev"
              onClick={this.handleButton}
            >
              Previous
            </button>
            <button
              type="button"
              class="btn btn-dark"
              id="next"
              onClick={this.handleButton}
            >
              Next
            </button>
          </div>
        </WrappedComponent>
      );
    }
  }
  return withPageButton;
};

export default withPageButton;
