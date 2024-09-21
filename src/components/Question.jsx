import React, { useState, useEffect } from "react";
import axios from "axios";
import { convert } from "html-to-text";
import moment from "moment/moment";
import { NavLink } from "react-router-dom";
import { localDBUrl } from "../controller/URLManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownLong,
  faReply,
  faUpDown,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";

function Question({ question }) {
  let descriptionPreview = convert(question.description);
  let word_list = descriptionPreview.split(" ").slice(0, 15)
  let desc = word_list.join(" ");
  // if (desc.length > 150) {
  //   desc = desc.slice(0, 150);
  // }
  if (word_list.length>=15)
  {
    desc += "..."
  }
  else{
    if (desc.length > 150) {
      desc = desc.slice(0, 150);
      desc += "..."
    }
  }

  const [voteCount, setVoteCount] = useState(0);

  useEffect(() => {
    const countvotes = async () => {
      try {
        const votecount = await axios.get(localDBUrl + "/questions/votecount", {
          params: { questionId: question._id },
        });
        setVoteCount(votecount.data.VoteCount);
      } catch (e) {}
    };
    countvotes();
  }, []); 

  return (
    <NavLink
      to={`/question/${question.title.replace(/[?\/]/g, "")}/${question._id}`}
      style={{ textDecoration: "none", color: "white" }}
    >
      <div
        className="question"
        style={{
          padding: "10px 20px",
          background: "#1a1f27",
          borderRadius: "10px",
          marginBottom: "15px",
        }}
      >
        <h3>{question.title}</h3>
        <div style={{ marginBottom: "10px" }}>
          {question.tags.map((tag, index) => {
            return (
              <span
                key={index}
                style={{
                  background: "#72727245",
                  marginRight: "10px",
                  borderRadius: "5px",
                  padding: "4px 8px",
                  textAlign: "center",
                  fontSize: "1rem",
                  color: "#a6a6a6",
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
        <p style={{ color: "grey" }}>
          {String(question.postedBy.userName)} •{" "}
          {moment(new Date(question.postedOn)).fromNow()}
        </p>
        <div style={{ color: "#c2c7d0" }}> {desc}</div>
        <div
          style={{ paddingTop: "15px", display: "flex", alignItems: "center" }}
        >
          <p
            style={{
              paddingRight: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              width="22"
              height="22"
              style={{ marginRight: "5px" }}
              src="https://img.icons8.com/material-rounded/24/228BE6/thumb-up.png"
              alt="thumb-up"
            />{" "}
            {voteCount}
          </p>
          <p style={{ display: "flex", alignItems: "center" }}>
            <img
              width="25"
              height="25"
              style={{ marginRight: "5px" }}
              src="https://img.icons8.com/color/48/chat--v1.png"
              alt="chat--v1"
            />{" "}
            {question.answersList.length}
          </p>
        </div>
        {/* <hr/> */}
      </div>
    </NavLink>
  );
}

export default Question;
