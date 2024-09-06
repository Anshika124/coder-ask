import { useSearchParams } from 'react-router-dom';
import { localDBUrl } from '../controller/URLManager';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Question from '../components/Question';
import Loading from '../components/Loading';

function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q'); 
    const [questionList, setQuestionList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const searchedQuestion = async()=> {
            try {
                setLoading(true);
                const result = await axios.get(localDBUrl + '/questions/searchquestion', {params:{query: query}});
                setQuestionList(result.data);
                // console.log(result);
                setLoading(false);
            }
            catch (err) {
            }
        }

        searchedQuestion();
    }, [query])

    if (loading)
    {
        return <Loading />
    }

    return (
        <div className="container py-100" style={{
            maxWidth: '70vw',
            margin: 'auto',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 8px'
        }}>
            <header className="header">
                <h2>Search Results for: '{query}'</h2>
            </header>
            {questionList.length > 0 ? (
                questionList.map((question) => (
                    <Question key={question._id} question={question} />
                ))
            ) : (
                <p>No questions found.</p>
            )}
        </div>
    );
}

export default Search