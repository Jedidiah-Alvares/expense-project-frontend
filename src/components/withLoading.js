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
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </WrappedComponent>
      );
    }
  }
  return withLoading;
};
