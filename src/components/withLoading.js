import React, { Component } from "react";

export const withLoading = (WrappedComponent) => {
  class withLoading extends Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
      };
    }

    changeLoading = () =>
      this.setState({
        loading: !this.state.loading,
      });

    render() {
      return (
        <WrappedComponent>
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </WrappedComponent>
      );
    }
  }
  return withLoading;
};
