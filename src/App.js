import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./searchBar";
import "bootstrap/dist/css/bootstrap.min.css";
import IssueList from "./issueList";
import Pagination from "react-js-pagination";
import SingleIssue from "./singleIssue";

function App() {
  let [keyword, setKeyword] = useState("");
  let [owner, setOwner] = useState("");
  let [repo, setRepo] = useState("");
  let [issues, setIssues] = useState(null);
  let [error, setError] = useState("");
  let [pageNum, setPageNum] = useState(1);
  let [totalPageNum, setTotalPageNum] = useState(1);
  const [show, setShow] = useState(false);
  let [issue, setIssue] = useState(null);
  let [comments, setComments] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let handleSubmit = () => {
    setOwner(keyword.split("/")[0]);
    setRepo(keyword.split("/")[1]);
  };

  let getIssueList = async () => {
    try {
      setError(null);
      let url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${pageNum}`;
      let response = await fetch(url);
      if (response.status === 200) {
        const link = response.headers.get("link");
        console.log("link", link);
        if (link) {
          const getTotalPage = link.match(/page=(\d+)>; rel="last"/);
          if (getTotalPage) {
            console.log("getTotalpage", getTotalPage);
            setTotalPageNum(parseInt(getTotalPage[1]));
          }
        }
        let data = await response.json();
        console.log(data);
        setIssues(data);
      } else {
        setError(`ERROR: ${response.status}`);
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  // let fetchCommentData = async () => {
  //   if (!urlFetchComments && !show) {
  //     return;
  //   }
  //   try {
  //     let url = urlFetchComments;
  //     let response = await fetch(url);
  //     if (response.status === 200) {
  //       const link = response.headers.get("link");
  //       console.log("link", link);
  //       if (link) {
  //         const getTotalPage = link.match(/page=(\d+)>; rel="last"/);
  //         if (getTotalPage) {
  //           console.log("getTotalpage", getTotalPage);
  //           setCommentTotalPageNum(parseInt(getTotalPage[1]));
  //         }
  //       }
  //       let data = await response.json();
  //       console.log(data);
  //     } else {
  //       setError(`ERROR: ${response.status}`);
  //     }
  //   } catch (err) {
  //     setError(`Error: ${err.message}`);
  //   }
  // };

  let selectIssue = async (id) => {
    let response = await fetch(id);
    let data = await response.json();
    console.log("issue", data);
    handleShow();
    setIssue(data);
    if (data) {
      let cResponse = await fetch(data.comments_url);
      let cData = await cResponse.json();
      console.log("comments", cData);
      setComments(cData);
    }
  };

  useEffect(() => {
    if (owner === "" || repo === "") {
      return;
    }
    getIssueList();
  }, [owner, repo, pageNum]);

  return (
    <div>
      <SearchBar handleSubmit={handleSubmit} setKeyword={setKeyword} />
      {error}
      <IssueList issues={issues} selectIssue={selectIssue} />
      {issues && (
        <Pagination
          activePage={pageNum}
          itemsCountPerPage={30}
          totalItemsCount={30 * totalPageNum}
          pageRangeDisplayed={5}
          onChange={(item) => setPageNum(item)}
        />
      )}
      {issue && (
        <SingleIssue
          handleClose={handleClose}
          show={show}
          issue={issue}
          selectIssue={selectIssue}
          comments={comments}
        />
      )}
    </div>
  );
}

export default App;
