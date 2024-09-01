import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "@picocss/pico/css/pico.min.css";
import { localDBUrl, profileUrl } from "../controller/URLManager";
import Loading from "../components/Loading";
import EditProfile from "../components/EditProfile";
import Bookmark from "../components/Bookmark";
import Note from "../components/Note";
import QuestionList from "../components/QuestionList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import AnswerList from "../components/AnswerList";
import { useNavigate } from "react-router-dom";
import "../css/Profile.css";

const socialMediaIcons = {
  linkedin: faLinkedin,
  github: faGithub,
  twitter: faTwitter,
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [typeClicked, setTypeClicked] = useState("question");

  const Navigate = useNavigate();

  const handleButtonController = (buttonType) => {
    setTypeClicked(buttonType);
  };

  const renderProfileContent = () => {
    switch (typeClicked) {
      case "question":
        return <QuestionList userId={profile.userId} />;
      case "answer":
        return <AnswerList userId={profile.userId} />;
      case "bookmark":
        return <Bookmark bookmarks={profile.bookmarkedQuestions} />;
      case "note":
        return <Note notes={profile.savedNotes} />;
      case "editProfile":
        return (
          <EditProfile UserProfile={profile} setProfileData={setProfile} />
        );
      case "signout":
        Navigate("/signout");
      default:
        return null;
    }
  };

  const fetchProfile = useCallback(async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userData"))._id;
      const response = await axios.post(`${localDBUrl}/users/getuser`, {
        userId,
      });
      console.log(response);
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!profile) {
    return <Loading />;
  }

  return (
    <div className="container py-100">
      <div className="grid profile">
        <div className="column" style={{ textAlign: "center" }}>
          <div className="profile-sidebar">
            <div className="profile-info">
              <div>
                <img
                  src={profile.profilePicture || profileUrl}
                  alt="Profile"
                  className="profile-picture"
                />
              </div>
              <div className="profile-info-right">
                <div className="fullname">{profile.userId.fullName}</div>
                <div className="username">{profile.userId.userName}</div>
              </div>
            </div>

            <p className="profile-bio">{profile.bio}</p>
            <p className="social-media-links"> Follow me on:
              {Object.entries(profile.socialMediaLinks).map(
                ([platform, url]) => {
                  const icon = socialMediaIcons[platform];
                  return icon && url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={platform}
                    >
                      <FontAwesomeIcon icon={icon} />
                    </a>
                  ) : null;
                }
              )}
            </p>
            <div className="line"></div>
            {/* <p>{profile.questionsList.length} Questions Asked</p>
            <p>{profile.answersList.length} Answers Given</p> */}
            <div
              className="button-group"
              style={{ display: "flex", flexDirection: "column", gap: "5px" }}
            >
              <button
                className="profile-buttons"
                onClick={() => handleButtonController("question")}
              >
                Questions ({profile.questionsList.length})
              </button>
              <button
                className="profile-buttons"
                onClick={() => handleButtonController("answer")}
              >
                Answers ({profile.answersList.length})
              </button>
              <button
                className="profile-buttons"
                onClick={() => handleButtonController("bookmark")}
              >
                Bookmarks ({profile.bookmarkedQuestions.length})
              </button>
              {/* <button
                className="profile-buttons"
                onClick={() => handleButtonController("note")}
              >
                Notes
              </button> */}
              <div className="line"></div>
              <div className="profile-action-buttons"> 
                <button
                  className="outline"
                  onClick={() => handleButtonController("editProfile")}
                >
                  Edit Profile
                </button>
                <button
                  className="outline contrast"
                  onClick={() => handleButtonController("signout")}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="profile-content">{renderProfileContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
