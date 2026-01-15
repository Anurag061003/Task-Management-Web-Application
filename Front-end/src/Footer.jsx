import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "#343a40",
        color: "#fff",
        textAlign: "center",
        padding: "20px 0",
        marginTop: "10px", // space from content above
        boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
      }}
    >
      <div className="container">
        <small>
          &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
