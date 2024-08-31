import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { convert } from 'html-to-text';
import moment from 'moment/moment';
import { NavLink } from 'react-router-dom';
import { localDBUrl } from '../controller/URLManager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownLong, faReply, faUpDown, faUpLong } from '@fortawesome/free-solid-svg-icons';

function Question({ question }) {

    let descriptionPreview = convert(question.description);
    let desc = descriptionPreview.split(' ').slice(0, 15).join(' ')
    if (desc.length > 150) {
        desc = desc.slice(0, 150)
    }

    const [voteCount, setVoteCount] = useState(0);

    useEffect(() => {
        const countvotes = async () => {
            try {
                const votecount = await axios.get(localDBUrl + '/questions/votecount', { params: { questionId: question._id } });
                setVoteCount(votecount.data.VoteCount);
            }
            catch (e) {

            }
        }
        countvotes();
    }, [])

    return (
        <NavLink to={`/question/${question.title.replace(/[?\/]/g, '')}/${question._id}`} style={{ textDecoration: 'none', color: 'white' }}>
            <div className="question" style={{
                padding: '10px 20px',
                background: '#161b24',
                borderRadius: '10px',
                marginBottom: '15px'
            }}>
                

                <h3>{question.title}</h3>
                <div style={{ marginBottom: '10px' }}>
                    {
                        question.tags.map((tag, index) => {
                            return <span key={index} style={{
                                background: '#72727245',
                                marginRight: '10px',
                                borderRadius: '5px',
                                padding: '4px 8px',
                                textAlign: 'center',
                                fontSize: '1rem',
                                color: '#a6a6a6'
                             }}>{tag}</span>
                        })
                    }
                </div>
                <p style={{ color: 'grey' }}>{String(question.postedBy.userName)} • {moment(new Date(question.postedOn)).fromNow()}</p>
                <div style={{ color: '#c2c7d0' }}> {desc}</div>
                <div style={{ paddingTop: '15px', display: 'flex' }}>
                    <p style={{ paddingRight: '20px' }}><img width="25" height="25" src="https://img.icons8.com/fluency/48/sort-up.png" alt="sort-up" /> {voteCount}</p>
                    <p><img width="25" height="25" src="https://img.icons8.com/color/48/chat--v1.png" alt="chat--v1" /> {question.answersList.length}</p>
                </div>
{/* <hr/> */}
            </div>
        </NavLink>
    );
}

export default Question;
