import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import moment from "moment/moment";
import { localDBUrl } from "../controller/URLManager";
import Loading from "../components/Loading";
import AddAnswer from "../components/AddAnswer";
import AnswerCard from "../components/AnswerCard";
import { getLocal } from "../controller/ProjectData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const QuestionInfo = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upvotes, setUpvotes] = useState(0);
  const [voteStatus, setVoteStatus] = useState("");
  const [enableAnswer, setEnableAnswer] = useState(false);
  const [bookmarkEnabled, setBookmarkEnabled] = useState(false);
  const { id } = useParams();
  let local = getLocal();

  const Navigate = useNavigate();


  useEffect(() => {
    const fetchQuestionInfo = async () => {
      try {
        const questionInfo = await axios.get(
          localDBUrl + "/questions/questionbyid",
          { params: { _id: id } }
        );
        // console.log(questionInfo);
        setQuestion(questionInfo.data[0]);
        let upvoteCountList = questionInfo.data[0].upvotesList.filter(
          (upvotes) => upvotes.isUpvote
        );
        let downvoteCountList = questionInfo.data[0].upvotesList.filter(
          (downvotes) => !downvotes.isUpvote
        );
        setUpvotes(upvoteCountList.length - downvoteCountList.length);
        // console.log(typeof(local))
        let userId = local !== null ? local._id : local;

        let upd = questionInfo.data[0].upvotesList.filter(
          (user) => user.userId === userId
        );

        if (upd.length > 0) {
          console.log("reached " + upd[0].isUpvote);
          if (upd[0].isUpvote) {
            setVoteStatus("upvote");
          } else {
            setVoteStatus("downvote");
          }
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestionInfo();
  }, [id, loading]);

  const handleUpvote = async () => {
    console.log(local);
    if (!local) {
      alert("Please Login to vote");
      return;
    }
    try {
      let res = await axios.put(localDBUrl + "/questions/updateupvotecount", {
        questionId: id,
        userId: local._id,
        isUpvote: true,
      });
      setUpvotes(res.data.VoteCount);
      setVoteStatus("upvote");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownvote = async () => {
    if (!local) {
      alert("Please Login to vote");
      return;
    }
    try {
      let res = await axios.put(localDBUrl + "/questions/updateupvotecount", {
        questionId: id,
        userId: local._id,
        isUpvote: false,
      });
      setUpvotes(res.data.VoteCount);
      setVoteStatus("downvote");
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookmark = async () => {
    if (!local) {
      alert("Please Login to bookmark");
      return;
    }

    if (bookmarkEnabled == false) {
      try {
        console.log("reached if");
        let res = await axios.post(
          localDBUrl + "/questions/addbookmarkquestion",
          { questionId: id, userId: local._id }
        );
        console.log(res.data);
        setBookmarkEnabled(true);
      } catch (err) {
        console.log("not reached");
        console.log(err);
      }
    } else if (bookmarkEnabled == true) {
      try {
        console.log("reached else");
        let res = await axios.post(
          localDBUrl + "/questions/removebookmarkquestion",
          { questionId: id, userId: local._id }
        );
        console.log(res.data);
        setBookmarkEnabled(false);
      } catch (err) {
        console.log("not reached");
        console.log(err);
      }
    }
  };

  const handleEdit = async () => {
    try {
      Navigate(`/editask/${id}`);

    } catch (err) { }
  };
  const handleDelete = async () => {
    try {
      let user_reponse = window.confirm("Are you sure you want to delete?");
      if (!user_reponse) 
      { return; }

      let deleteQuestion = await axios.delete(
        localDBUrl + "/questions/deletequestion",
        { params: { questionId: id } }
      );
      console.log(deleteQuestion);
      Navigate("/");
    } catch (err) { }
  };

  if (loading) {
    return <Loading />;
  }

  if (!question) {
    return <p>Question not found</p>;
  }

  return (
    <div className="container py-100">
      <article className="question-detail" style={{ display: "flex" }}>
        <div
          className="vote-buttons"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginRight: "20px",
          }}
        >
          <button
            className="upvote-button"
            onClick={handleUpvote}
            disabled={voteStatus == "upvote"}
          >
            ▲
          </button>
          <span>{upvotes}</span>
          <button
            className="downvote-button"
            onClick={handleDownvote}
            disabled={voteStatus == "downvote"}
          >
            ▼
          </button>
          <button
            className="bookmark-button"
            style={{
              marginTop: "10px",
              backgroundColor: bookmarkEnabled ? "grey" : "transparent",
            }}
            onClick={handleBookmark}
          >
            <FontAwesomeIcon icon={faBookmark} />
          </button>
        </div>
        <div className="question-content" style={{ width: "100%" }}>
          <h1>{question.title}</h1>
          <p style={{ color: "grey" }}>
            {String(question.postedBy.userName)} ●{" "}
            {moment(new Date(question.postedOn)).fromNow()}
          </p>
          <p>
            <strong>Description:</strong> {parse(question.description)}
          </p>
          {question.tags.length > 0 && (
            <p>
              <strong>Tags:</strong> {question.tags.join(", ")}
            </p>
          )}
          <div style={{ display: "flex", gap: "5px" }}>
            {enableAnswer ? (
              <AddAnswer
                setEnableAnswer={setEnableAnswer}
                questionId={id}
                setLoading={setLoading}
              />
            ) : (
              <button
                onClick={() => {
                  local ?
                    setEnableAnswer(!enableAnswer)
                    : alert("Please login to add answer.")
                }}
              >
                Add Answer
              </button>
            )}
            {local && question.postedBy._id == local._id && !enableAnswer ? (
              <>
                <button
                  onClick={handleEdit}
                  style={{ background: "transparent", borderColor: "green" }}
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  style={{ backgroundColor: "transparent", borderColor: "red" }}
                >
                  Delete
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </article>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {question.answersList.length > 0 ? (
          question.answersList.map((answer) => <AnswerCard answer={answer} setLoading={setLoading} />)
        ) : (
          <p>Not answered yet.</p>
        )}
      </div>
    </div>
  );
};

export default QuestionInfo;
