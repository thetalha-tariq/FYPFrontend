import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const initialMessages = [
            { text: 'How can I make an appointment?', sender: 'suggestion' },
            { text: 'Can I buy pet food?', sender: 'suggestion' },
        ];
        setChatHistory(initialMessages);
    }, []);

    const handleSuggestionClick = async (suggestion) => {
        const userMessage = { text: suggestion, sender: 'user' };
        setChatHistory([...chatHistory, userMessage]);
        setIsTyping(true);

        try {
            const res = await axios.post('http://localhost:5000/api/chatbot', { prompt: suggestion });
            const botResponse = { text: res.data.candidates[0].content.parts[0].text, sender: 'bot' };
            setChatHistory((prevHistory) => [...prevHistory, botResponse]);
        } catch (error) {
            console.error('Error calling chatbot API:', error);
            const errorMessage = { text: 'Error calling chatbot API', sender: 'bot' };
            setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userMessage = { text: message, sender: 'user' };
        setChatHistory([...chatHistory, userMessage]);
        setMessage('');
        setIsTyping(true);

        try {
            const res = await axios.post('http://localhost:5000/api/chatbot', { prompt: message });
            const botResponse = { text: res.data.candidates[0].content.parts[0].text, sender: 'bot' };
            setChatHistory((prevHistory) => [...prevHistory, botResponse]);
        } catch (error) {
            console.error('Error calling chatbot API:', error);
            const errorMessage = { text: 'Error calling chatbot API', sender: 'bot' };
            setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-16 right-4 z-50 w-96 h-[450px] bg-white shadow-lg rounded-lg flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-2">PetMedi Chatbot</h1>
            <div className="mb-4 h-32 overflow-y-auto bg-gray-50 p-2 rounded-lg flex-grow">
                {chatHistory.map((msg, index) => (
                    <div
                        key={index}
                        className={`mb-2 p-2 rounded-lg ${
                            msg.sender === 'user'
                                ? 'bg-blue-500 text-white self-end'
                                : msg.sender === 'suggestion'
                                ? 'bg-yellow-500 text-white self-start cursor-pointer'
                                : 'bg-gray-200 text-gray-900 self-start'
                        }`}
                        onClick={() => msg.sender === 'suggestion' && handleSuggestionClick(msg.text)}
                    >
                        {msg.text}
                    </div>
                ))}
                {isTyping && (
                    <div className="mb-2 p-2 rounded-lg bg-gray-200 text-gray-900 self-start">
                        ...
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200" style={{ backgroundColor: '#eab308', color: '#000000' }}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chatbot;
