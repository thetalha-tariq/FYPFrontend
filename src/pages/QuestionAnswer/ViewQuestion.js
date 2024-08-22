import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewQuestion = ({userId}) => {
    const { id } = useParams();
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswer] = useState('');

    useEffect(() => {
        const fetchQuestionAndAnswers = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/questionAnswer/getQuestion/${id}`);
                setQuestion(response.data.data.question);
                setAnswers(response.data.data.answers);
            } catch (error) {
                console.error("Error fetching question and answers:", error);
            }
        };

        fetchQuestionAndAnswers();
    }, [id]);

    const handleSubmitAnswer = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/questionAnswer/createAnswer', {
                questionId: id,
                userId: userId, 
                answerText: newAnswer
            });
            setAnswers([...answers, response.data.data]);
            setNewAnswer('');
        } catch (error) {
            console.error("Error posting answer:", error);
        }
    };

    if (!question) return <div>Loading...</div>;

    return (
        <div className="flex justify-center py-8">
            <div className="w-full max-w-2xl p-6 border rounded-lg shadow-md bg-white">
                <div className="text-sm text-gray-500 mb-2">
                    Posted by {question.userId.name} on {new Date(question.createdAt).toLocaleDateString()}
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{question.title}</h2>
                <p className="text-gray-700 mb-4">{question.description}</p>
                {question.image && (
                    <img 
                        src={`http://localhost:5000/uploads/${question.image}`} 
                        alt="Question" 
                        className="w-full h-auto rounded-lg mb-4"
                    />
                )}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Answers:</h3>
                    {answers.map((answer) => (
                        <div key={answer._id} className="mb-4 p-4 border rounded-lg bg-gray-100">
                            <div className="text-sm text-gray-500 mb-2">
                                Answered by {answer.userId.name} on {new Date(answer.createdAt).toLocaleDateString()}
                            </div>
                            <p className="text-gray-700">{answer.answerText}</p>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmitAnswer} className="mt-6">
                    <textarea
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        placeholder="Write your answer..."
                        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                    />
                    <button type="submit" className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                        Give Answer
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ViewQuestion;
