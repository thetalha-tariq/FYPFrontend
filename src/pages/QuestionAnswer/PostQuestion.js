import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostQuestion = ({ userId }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handlePostQuestion = async () => {
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch('http://localhost:5000/api/questionAnswer/createQuestion', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                navigate('/communityForum');
            }
        } catch (error) {
            console.error("Error posting question:", error);
        }
    };

    return (
        <div className="flex flex-col items-center mt-8">
            <input
                className="w-full max-w-lg p-2 border rounded mb-4"
                type="text"
                placeholder="Enter the title of your question..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                className="w-full max-w-lg p-2 border rounded mb-4"
                placeholder="Enter the description of your question..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <select
                className="w-full max-w-lg p-2 border rounded mb-4"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Select Category</option>
                <option value="petCare">Pet Care</option>
                <option value="petHealth">Pet Health</option>
                <option value="petSale">Pet Sale</option>
                <option value="emergencyCare">Emergency Care</option> 
                <option value="petProducts">Pet Products</option>
                <option value="breed">Breeds & Characteristics</option>
                <option value="adoption">Adoption & Rescue</option>
                <option value="petSafety"> Pet Safety</option>
                <option value="petGrooming">Pet Grooming</option>
                <option value="other">Other</option>

            </select>
            <input
                type="file"
                onChange={handleImageChange}
                className="mb-4"
            />
            <button
                onClick={handlePostQuestion}
                className="m-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
                Post Question
            </button>
        </div>
    );
};

export default PostQuestion;
