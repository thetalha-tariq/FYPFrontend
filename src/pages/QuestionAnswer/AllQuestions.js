import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const AllQuestions = ({ userId }) => {
    const [questions, setQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { category } = useParams();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                let response;
                if (category) {
                    response = await axios.get(`http://localhost:5000/api/questionAnswer/getQuestionsByCategory/${category}`);
                } else {
                    response = await axios.get('http://localhost:5000/api/questionAnswer/getAllQuestion');
                }
                const sortedQuestions = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setQuestions(sortedQuestions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, [category]);

    const handleUpvote = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/questionAnswer/upvote/${id}`, { userId: userId });
            const updatedQuestions = questions.map(question => 
                question._id === id ? response.data.data : question
            );
            setQuestions(updatedQuestions);
        } catch (error) {
            console.error("Error upvoting question:", error);
        }
    };

    const handleDownvote = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/questionAnswer/downvote/${id}`, { userId: userId });
            const updatedQuestions = questions.map(question => 
                question._id === id ? response.data.data : question
            );
            setQuestions(updatedQuestions);
        } catch (error) {
            console.error("Error downvoting question:", error);
        }
    };

    const filteredQuestions = questions.filter(question =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex justify-center py-8">
            <div className="w-1/6">
                <div className="p-3 mr-10 bg-white mb-4 sticky top-0">
                    <h3 className="text-lg font-semibold mb-2 ">Categories</h3>
                    <ul className="space-y-2 text-lg font-medium text-gray-600">
                        <li><Link to="/communityforum" className={`block py-2 px-4 rounded hover:bg-yellow-500 hover:text-white transition-colors ${!category && 'bg-yellow-500 text-white'}`}>All</Link></li>
                        <li><Link to="/questions/category/petCare" className={`block py-2 px-4 rounded hover:bg-yellow-500 hover:text-white transition-colors ${category === 'petCare' && 'bg-yellow-500 text-white'}`}>Pet Care</Link></li>
                        <li><Link to="/questions/category/petHealth" className={`block py-2 px-4 rounded hover:bg-yellow-500 hover:text-white transition-colors ${category === 'petHealth' && 'bg-yellow-500 text-white'}`}>Pet Health</Link></li>
                        <li><Link to="/questions/category/petSale" className={`block py-2 px-4 rounded hover:bg-yellow-500 hover:text-white transition-colors ${category === 'petSale' && 'bg-yellow-500 text-white'}`}>Pet Sale</Link></li>
                        <li><Link to="/questions/category/emergencyCare" className={`block py-2 px-4 rounded hover:bg-yellow-500 hover:text-white transition-colors ${category === 'emergencyCare' && 'bg-yellow-500 text-white'}`}>Emergency Care</Link></li>
                        <li><Link to="/questions/category/petProducts" className={`block py-2 px-4 rounded hover:bg-yellow-500 hover:text-white transition-colors ${category === 'petProducts' && 'bg-yellow-500 text-white'}`}>Pet Products</Link></li>
                        <li><Link to="/questions/category/breed" className={`block py-2 px-4 rounded hover:bg-yellow-500 hover:text-white transition-colors ${category === 'breed' && 'bg-yellow-500 text-white'}`}>Breeds & Characteristics</Link></li>
                        <li><Link to="/questions/category/adoption" className={`block py-2 px-4 rounded hover:bg-yellow-500 hover:text-white transition-colors ${category === 'adoption' && 'bg-yellow-500 text-white'}`}>Adoption & Rescue</Link></li>
                        <li><Link to="/questions/category/petSafety" className={`block py-2 px-4 rounded hover:bg-yellow-500 hover:text-white transition-colors ${category === 'petSafety' && 'bg-yellow-500 text-white'}`}>Pet Safety</Link></li>
                        <li><Link to="/questions/category/petGrooming" className={`block py-2 px-4 rounded hover:bg-yellow-500 hover:text-white transition-colors ${category === 'petGrooming' && 'bg-yellow-500 text-white'}`}>Pet Grooming</Link></li>
                        <li><Link to="/questions/category/other" className={`block py-2 px-4 rounded hover:bg-yellow-500 hover:text-white transition-colors ${category === 'other' && 'bg-yellow-500 text-white'}`}>Other</Link></li>
                    </ul>
                </div>
            </div>
            <div className="w-2/4">
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search questions..."
                        className="w-full max-w-md p-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Link to="/postQuestion" className="bg-yellow-500 text-white px-4 py-3 rounded-lg hover:bg-yellow-600 transition">
                        Post a Question
                    </Link>
                </div>
                <div className="space-y-6">
                    {filteredQuestions.map((question) => (
                        <div key={question._id} className="p-6 border rounded-lg shadow-md bg-white">
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
                            <div className="flex items-center space-x-4">
                                <button 
                                    onClick={() => handleUpvote(question._id)} 
                                    className={`text-grey-500 hover:text-yellow-600 transition ${question.upvotedBy.includes(userId) ? 'text-yellow-700' : ''}`}
                                >
                                    <FontAwesomeIcon icon={faArrowUp} /> ({question.upvotes})
                                </button>
                                <button 
                                    onClick={() => handleDownvote(question._id)} 
                                    className={`text-grey-500 hover:text-yellow-600 transition ${question.downvotedBy.includes(userId) ? 'text-yellow-700' : ''}`}
                                >
                                    <FontAwesomeIcon icon={faArrowDown} /> ({question.downvotes})
                                </button>
                            </div>
                            <Link to={`/question/${question._id}`} className="text-yellow-500 hover:underline mt-2 inline-block">
                                View Answers
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-1/4">
                {/* Right Sidebar */}
                <div className="p-4 ml-10 bg-white mb-4 sticky top-0">
                    <h3 className="text-lg font-semibold mb-2">Trending Questions</h3>
                    <ul className="space-y-2">
                        <li><Link to="/question/66c10824ee626090258aa06f" className="text-gray-700 hover:text-yellow-600">How do I care for a senior dog?</Link></li>
                        <li><Link to="/question/66c22b8eee626090258aa0c8" className="text-gray-700 hover:text-yellow-600">Best food for puppies?</Link></li>
                        <li><Link to="/question/66c22be5ee626090258aa0ce" className="text-gray-700 hover:text-yellow-600">How often should I groom my dog?</Link></li>
                        <li><Link to="/question/66c233b64d23bdeaf8599aff" className="text-gray-700 hover:text-yellow-600">What vaccinations does my puppy need?</Link></li>
                        <li><Link to="/question/66c236e9a06e6b5196b5dfff" className="text-gray-700 hover:text-yellow-600">How do I introduce a new pet to my home?</Link></li>
                        {/* Add more trending questions */}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AllQuestions;
