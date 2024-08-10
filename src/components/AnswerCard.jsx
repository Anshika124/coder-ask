import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment/moment';
import { localDBUrl } from '../controller/URLManager';
import { getLocal } from '../controller/ProjectData';
import { useNavigate } from 'react-router-dom';



function AnswerCard({ answer }) {

    const [upvotes, setUpvotes] = useState(0);
    const [voteStatus, setVoteStatus] = useState('');

    const Navigate = useNavigate()

    let local = getLocal();

    console.log(answer)

    const handleUpvote = async () => {
        if (!local) {
            alert("Please Login to vote")
            return
        }
        try {
            let res = await axios.put(localDBUrl + "/answers/updateupvotecount", { answerId: answer._id, userId: local._id, isUpvote: true });
            setUpvotes(res.data.VoteCount);
            setVoteStatus('upvote')
        } catch (err) {
            console.error(err);
        }
    };

    const handleDownvote = async () => {
        if (!local) {
            alert("Please Login to vote")
            return
        }
        try {
            let res = await axios.put(localDBUrl + "/answers/updateupvotecount", { answerId: answer._id, userId: local._id, isUpvote: false });
            setUpvotes(res.data.VoteCount);
            setVoteStatus('downvote')

        } catch (err) {
            console.error(err);
        }
    };

    const handleAnswerDelete = async () => {
        try {

            let deleteAnswer = await axios.delete(
                localDBUrl + "/answers/deleteanswer",
                { params: { answerId: answer._id } }
            );
            console.log(deleteAnswer);
            Navigate("/");
        } catch (err) { }
    }

    useEffect(() => {
        const fetchAnswerData = () => {
            let upvoteCountList = answer.upvotesList.filter(upvotes => upvotes.isUpvote)
            let downvoteCountList = answer.upvotesList.filter(downvotes => !downvotes.isUpvote)
            setUpvotes(upvoteCountList.length - downvoteCountList.length)
            let userId = local !== null ? local._id : local;

            let upd = answer.upvotesList.filter(user => user.userId === userId);

            if (upd.length > 0) {
                console.log("reached " + upd[0].isUpvote);
                if (upd[0].isUpvote) {
                    setVoteStatus('upvote');
                } else {
                    setVoteStatus('downvote');
                }
            }
        }
        fetchAnswerData();
    }, []);

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
                <button className="upvote-button" onClick={handleUpvote} disabled={voteStatus == 'upvote'}>▲</button>
                <span>{upvotes}</span>
                <button className="downvote-button" onClick={handleDownvote} disabled={voteStatus == 'downvote'}>▼</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <div>
                    <p style={{ color: 'grey' }}>{String(answer.answeredBy.userName)} • {moment(new Date(answer.answeredOn).toLocaleString()).fromNow()}</p>
                    <p> {answer.description}</p>
                    {/* <p><strong>Upvotes:</strong> {answer.upvotesList.length}</p> */}
                </div>
                {answer.answeredBy._id == local._id &&
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <button >Edit</button>
                        <button onClick={handleAnswerDelete}>Delete</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default AnswerCard