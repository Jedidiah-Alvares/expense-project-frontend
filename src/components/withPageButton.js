import React, { Component, createRef } from "react";

const withPageButton = (WrappedComponent) => {
  class withPageButton extends Component {
    constructor(props) {
      super(props);

      // prev and next are the button visiblity
      this.state = {
        pageNo: 0,
        prev: "hidden",
        next: "hidden",
      };

      // this ref is attached to the wrapper component
      this.child = createRef();
    }

    // changes the button visiblity of previous and next button
    setButtonVisiblity = (prev, next) => {
      if (prev === 0) this.setState({ prev: "hidden" });
      else this.setState({ prev: "visible" });

      if (next <= 0) this.setState({ next: "hidden" });
      else this.setState({ next: "visible" });
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
          {...this.props}
        >
          <div className="page">
            <button
              type="button"
              className="btn btn-dark"
              id="prev"
              onClick={this.handleButton}
              style={{ visibility: this.state.prev }}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn-dark"
              id="next"
              onClick={this.handleButton}
              style={{ visibility: this.state.next }}
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
