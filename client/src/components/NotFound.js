import React from "react";

export default function notFound() {
  return (
    <div
      style={{ textAlign: "center", fontWeight: "bold" }}
      className="inner-wrapper col error"
    >
      <div style={{ fontSize: "100px" }}>404</div>
      <div style={{ fontSize: "30px" }}>Page not found</div>
    </div>
  );
}
