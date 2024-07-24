import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '@picocss/pico/css/pico.min.css';
import { localDBUrl, profileUrl } from '../controller/URLManager';
import Loading from '../components/Loading';
import EditProfile from '../components/EditProfile';
import Bookmark from '../components/Bookmark';
import Note from '../components/Note';
import QuestionList from '../components/QuestionList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import AnswerList from '../components/AnswerList';

const socialMediaIcons = {
  linkedin: faLinkedin,
  github: faGithub,
  twitter: faTwitter,
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [typeClicked, setTypeClicked] = useState('question');

  const handleButtonController = (buttonType) => {
    setTypeClicked(buttonType);
  };

  const renderProfileContent = () => {
    switch (typeClicked) {
      case 'question':
        return <QuestionList userId={profile.userId} />;
      case 'answer':
        return <AnswerList userId={profile.userId} />;
      case 'bookmark':
        return <Bookmark bookmarks={profile.bookmarkedQuestions} />;
      case 'note':
        return <Note notes={profile.savedNotes} />;
      case 'editProfile':
        return <EditProfile UserProfile={profile} setProfileData={setProfile} />;
      default:
        return null;
    }
  };

  const fetchProfile = useCallback(async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userData"))._id;
      const response = await axios.post(`${localDBUrl}/users/getuser`, { userId });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!profile) {
    return <Loading />;
  }

  return (
    <div className="container">
      <div className="grid" style={{ gridTemplateColumns: "25% 75%" }}>
        <div className="column" style={{ maxWidth: '250px' }}>
          <div className="profile-sidebar">
            <img
              src={profile.profilePicture || profileUrl}
              alt="Profile"
              className="profile-picture"
            />
            <h2>{profile.userId.fullName}</h2>
            <h3>{profile.userId.userName}</h3>
            <p>{profile.bio}</p>
            <div className="social-media-links">
              {Object.entries(profile.socialMediaLinks).map(([platform, url]) => {
                const icon = socialMediaIcons[platform];
                return icon && url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" key={platform}>
                    <FontAwesomeIcon icon={icon} size="2x" />
                  </a>
                ) : null;
              })}
            </div>
            <p>{profile.questionsList.length} Questions Asked</p>
            <p>{profile.answersList.length} Answers Given</p>
            <div className="button-group" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <button className="secondary" onClick={() => handleButtonController('question')}>Questions</button>
              <button className="secondary" onClick={() => handleButtonController('answer')}>Answers</button>
              <button className="secondary" onClick={() => handleButtonController('bookmark')}>Bookmarks</button>
              <button className="secondary" onClick={() => handleButtonController('note')}>Notes</button>
              <button className="outline" onClick={() => handleButtonController('editProfile')}>Edit Profile</button>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="profile-content">
            {renderProfileContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
