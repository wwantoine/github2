import React from "react";

const IssueList = ({ issues, selectIssue }) => {
  if (!issues) {
    return <div></div>;
  }
  return (
    <div>
      {issues.map((item) => (
        <li className="issueItem" onClick={() => selectIssue(item.url)}>
          <h3>{item.title}</h3>
        </li>
      ))}
    </div>
  );
};

export default IssueList;
