// import React from "react";
import PropTypes from "prop-types";

/**
 * Error component
 * with retry functionality
 */
export default function ErrorMessage({ error, onRetry }) {
  return (
    <div className="error" role="alert">
      <svg className="error_icon" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
      <p>Error fetching characters: {error}</p>
      <button onClick={onRetry} aria-label="Retry loading data">
        Retry ⟲
      </button>
    </div>
  );
}

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};
