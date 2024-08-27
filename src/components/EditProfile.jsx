import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '@picocss/pico/css/pico.min.css';
import { localDBUrl } from '../controller/URLManager';

const EditProfile = ({UserProfile, setProfileData}) => {
  const [profile, setProfile] = useState(UserProfile);
  const [message, setMessage] = useState('');

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleChangeFullnameAndUsername = (e) => {
    
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      "userId" : {
        ...prevProfile.userId,
        [name]: value
      },
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      socialMediaLinks: {
        ...prevProfile.socialMediaLinks,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProfileData(null);
    try {
      const response = await axios.put(localDBUrl+'/users/editprofile', profile); 
      setProfileData(response.data.value);
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
    }
    
  };

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <header className="header">
        <h1>Edit Profile</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={profile.userId.fullName}
              onChange={handleChangeFullnameAndUsername}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={profile.userId.userName}
              onChange={handleChangeFullnameAndUsername}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={profile.socialMediaLinks.linkedin}
              onChange={handleSocialMediaChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="github">GitHub</label>
            <input
              type="url"
              id="github"
              name="github"
              value={profile.socialMediaLinks.github}
              onChange={handleSocialMediaChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="twitter">Twitter</label>
            <input
              type="url"
              id="twitter"
              name="twitter"
              value={profile.socialMediaLinks.twitter}
              onChange={handleSocialMediaChange}
            />
          </div>
          <button type="submit" className="primary">Save Changes</button>
        </form>
        {message && <p>{message}</p>}
      </main>
    </div>
  );
};

export default EditProfile;
