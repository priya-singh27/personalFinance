import axios from "axios";
import { useState } from "react"

const api_url = import.meta.env.VITE_API_BASE_URL;

export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const[error, setError] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitLoading(true);

        try {
            const res = await axios.post(`${api_url}/user/register`, formData);

            console.log(`User registered: ${res}`);

            setFormData({
                username: "",
                email: "",
                password: ""
            })
        } catch (err) {
            setError("Failed to register user");
            console.log(err);
        } finally {
            setSubmitLoading(false);
        }
    }

    const handleInputChange = async (event) => {
        const { name, value } = event.target;

        console.log(event.target.value);
        setFormData(prev => ({
            ...prev, [name]: value
        }));
    }
    return (
        <div className="w-full lg:max-w-md shadow-lg rounded-xl p-4 ml-auto mr-auto mt-40 border border-gray-200">
            <h1 className="mb-2">Create Your Account</h1>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Username:</label>
                    <input type="text" id="name" name="username" value={formData.username} required placeholder="Enter your name" onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-4 mb-2"/>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required value={formData.email} placeholder="Enter your email" onChange={handleInputChange} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-4"/>
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required value={formData.password} placeholder="Enter your password" onChange={handleInputChange} className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-4"/>
                </div>

                {submitLoading && <p>Loading...</p>}

                <button type="submit" className="w-full bg-gradient-to-br bg-cyan-700  hover:bg-cyan-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors">Register</button>
            </form>
        </div>
    )
};
