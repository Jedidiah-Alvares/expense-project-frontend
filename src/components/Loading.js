import React from "react";
import { connect } from "react-redux";

const Loading = (Component) => {
  return (
    <>
      {/*
      {props.isLoading ? (
        <div
          class="spinner-grow text-secondary"
          style={{ width: "10rem", height: "10rem" }}
          role="status"
        ></div>
      ) : (
        props.children
      )}*/}
      <Component test="hello"></Component>
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.loading.isLoading,
});

export default Loading;
