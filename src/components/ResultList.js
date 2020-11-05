import React from "react";

function ResultList(props) {
    console.log("props.results", props.results)
    return (
    <table className="table">
        <br />
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Pic</th>
        </tr>
          {props.results.map(result => (
              <tr>
              <th>{result.name.first} {result.name.last}</th>
              <th>{result.email}</th>
              <th>{result.phone}</th>
              <th><img src={result.picture.thumbnail}/></th>
              </tr>
          ))}
    </table>
    );
  }

export default ResultList;