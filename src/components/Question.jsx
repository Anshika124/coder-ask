import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { convert } from 'html-to-text';
import moment from 'moment/moment';
import { NavLink } from 'react-router-dom';
import { localDBUrl } from '../controller/URLManager';

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
                padding: '1rem',
                background: '#22262e',
                borderRadius: '20px',
                marginBottom: '25px'
            }}>

                <h2>{question.title}</h2>
                <div style={{ marginBottom: '10px' }}>
                    {
                        question.tags.map((tag) => {
                            return <span style={{ background: '#007ebd', marginRight: '5px', borderRadius: '10px', padding: '5px 8px', textAlign: 'center' }}>{tag}</span>
                        })
                    }
                </div>
                <p style={{ color: 'grey' }}>{String(question.postedBy.userName)} ● {moment(new Date(question.postedOn)).fromNow()}</p>
                <div> {desc}</div>
                <div style={{ paddingTop: '15px', display: 'flex' }}>
                    <p style={{ paddingRight: '10px' }}><strong>Votes:</strong> {voteCount}</p>
                    <p><strong>Answered:</strong> {question.answersList.length}</p>
                </div>

            </div>
        </NavLink>
    );
}

export default Question;
