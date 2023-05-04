import React from "react";
import { connect } from "react-redux";

const Loading = (props) => {
  return (
    <>
      {props.isLoading ? (
        <div
          class="spinner-grow text-secondary"
          style={{ width: "10rem", height: "10rem" }}
          role="status"
        ></div>
      ) : (
        props.children
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.loading.isLoading,
});

export default connect(mapStateToProps)(Loading);
