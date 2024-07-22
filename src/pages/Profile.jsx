import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '@picocss/pico/css/pico.min.css';
import { localDBUrl, profileUrl } from '../controller/URLManager';
import Loading from '../components/Loading';
import EditProfile from '../components/EditProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const socialMediaIcons = {
  linkedin: faLinkedin,
  github: faGithub,
  twitter: faTwitter,
};


const Profile = () => {
  const [profile, setProfile] = useState(null);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post(localDBUrl+'/users/getuser',{
            userId: JSON.parse(localStorage.getItem("userData"))._id
        }); 
        // console.log(response)
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  
  if (!profile ) {
    return <Loading />;
  }
  

  return (
    <div className="container">
      <div className="grid" style={{
        gridTemplateColumns: "25% 75%",
      }}>
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
              return (icon && url) ? (
                <a href={url || '#'} target="_blank" rel="noopener noreferrer" key={platform}>
                  <FontAwesomeIcon icon={icon} size="2x" />
                </a>
              ) : null;
            })}
          </div>
            <p>{profile.questionsList.length} Question Asked</p>
            <p>{profile.answersList.length} Answers Given</p>
            <button className="outline" onClick={() => alert('Edit Profile Clicked')}>Edit Profile</button>
          </div>
        </div>
        <div className="column">
          <div className="profile-content">
            <EditProfile UserProfile={profile}  setProfileData={setProfile}/>            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
