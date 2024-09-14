import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
import { localDBUrl } from '../controller/URLManager';
import { getLocal } from '../controller/ProjectData';
import { useNavigate } from 'react-router-dom';

function AnswerCard({ answer, setLoading }) {
    const [upvotes, setUpvotes] = useState(0);
    const [voteStatus, setVoteStatus] = useState('');
    const [isAnswerEditable, setAnswerEditable] = useState(false);
    const newAnswerRef = useRef(null);
    const [description, setDescription] = useState(answer.description)

    const Navigate = useNavigate();
    let local = getLocal();

    const handleUpvote = async () => {
        if (!local) {
            alert("Please Login to vote");
            return;
        }
        try {
            let res = await axios.put(localDBUrl + "/answers/updateupvotecount", { answerId: answer._id, userId: local._id, isUpvote: true });
            setUpvotes(res.data.VoteCount);
            setVoteStatus('upvote');
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
            let res = await axios.put(localDBUrl + "/answers/updateupvotecount", { answerId: answer._id, userId: local._id, isUpvote: false });
            setUpvotes(res.data.VoteCount);
            setVoteStatus('downvote');
        } catch (err) {
            console.error(err);
        }
    };

    const handleAnswerDelete = async () => {
        try {
            setLoading(true)
            let deleteAnswer = await axios.delete(
                localDBUrl + "/answers/deleteanswer",
                { params: { answerId: answer._id } }
            );
            // console.log(deleteAnswer);
            setLoading(false)
            
        } catch (err) {
            console.error(err);
        }
    };

    const handleAnswerUpdate = async () => {
        try {
            const updatedAnswer = newAnswerRef.current.textContent;
            await axios.put(localDBUrl + "/answers/updateanswer", { answerId: answer._id, description: updatedAnswer });
            setAnswerEditable(false);
            setDescription(updatedAnswer);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchAnswerData = () => {
            let upvoteCountList = answer.upvotesList.filter(upvotes => upvotes.isUpvote);
            let downvoteCountList = answer.upvotesList.filter(downvotes => !downvotes.isUpvote);
            setUpvotes(upvoteCountList.length - downvoteCountList.length);

            let userId = local !== null ? local._id : null;
            let upd = answer.upvotesList.filter(user => user.userId === userId);

            if (upd.length > 0) {
                if (upd[0].isUpvote) {
                    setVoteStatus('upvote');
                } else {
                    setVoteStatus('downvote');
                }
            }
        };
        fetchAnswerData();
    }, [answer]);
    return (
        <div key={answer._id} style={{
            display: 'flex',
            marginBottom: '20px',
            background: '#212631',
            padding: '20px',
            borderRadius: '5px'
        }}>
            <div className="vote-buttons" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginRight: '20px'
            }}> 
                <button className="padding-btn-normal" onClick={handleUpvote} disabled={voteStatus === 'upvote'}>▲</button>
                <span>{upvotes}</span>
                <button className="padding-btn-normal" onClick={handleDownvote} disabled={voteStatus === 'downvote'}>▼</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ width: '82%' }}>
                    <p style={{ color: 'grey' }}>{String(answer.answeredBy.userName)} • {moment(new Date(answer.answeredOn).toLocaleString()).fromNow()}</p>

                    {isAnswerEditable
                        ? <>
                            <p
                                contentEditable={true}
                                ref={newAnswerRef}
                                style={{ border: '2px solid grey', padding: '5px', outline: 'none' }}
                            >
                                {description}
                            </p>
                            <button className="padding-btn-normal" onClick={handleAnswerUpdate}>Update</button>
                        </>
                        : <p>{description}</p>}
                </div>
                {answer.answeredBy._id === local._id && (
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <button className="padding-btn-normal" onClick={() => setAnswerEditable(true)}>Edit</button>
                        <button className="padding-btn-normal" onClick={handleAnswerDelete}>Delete</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AnswerCard;
