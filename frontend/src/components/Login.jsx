import axios from "axios";
import { useState } from "react"
import { useNavigate } from 'react-router'

const api_url = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [submitLoading, setSubmitLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitLoading(true);

        try {
            const res = await axios.post(`${api_url}/user/login`, formData);

            console.log(`User logged in: ${res}`);

            setFormData({
                email: "",
                password: ""
            });

            localStorage.setItem('token', res.data.token); 

            navigate('/dashboard')
        } catch (err) {
            setError("Failed to register user");
            console.log(err);
        } finally {
            setSubmitLoading(false);
        }
    }

    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev, [name]: value
        }));
    }

    const handleClick = () => {
        navigate('/')
    }
    return (
        <div className="w-full max-w-sm sm:max-w-md shadow-lg rounded-xl p-4 mx-4 sm:mx-auto mt-10 sm:mt-20 lg:mt-40 border border-gray-200">
            <h1 className="mb-4 text-2xl text-zinc-700">Login to Your Account</h1>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit}>
               
                <div>
                    <label htmlFor="email" className="text-zinc-500">Email:</label>
                    <input type="email" id="email" name="email" required value={formData.email} placeholder="Enter your email" onChange={handleInputChange} className="text-zinc-500 bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-4 mb-2"/>
                </div>

                <div>
                    <label htmlFor="password" className="text-zinc-500">Password:</label>
                    <input type="password" id="password" name="password" required value={formData.password} placeholder="Enter your password" onChange={handleInputChange} className="text-zinc-500 bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-4 mb-4"/>
                </div>

                {submitLoading && <p>Loading...</p>}

                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-6">
                    <button type="submit" className="w-full sm:w-auto bg-gradient-to-br bg-cyan-700  hover:bg-cyan-600 text-white font-semibold py-2.5 px-15 rounded-lg transition-colors">Login</button>
                    <button onClick={handleClick} className="w-full sm:w-auto bg-gradient-to-br bg-cyan-700  hover:bg-cyan-600 text-white font-semibold py-2.5 px-15 rounded-lg transition-colors">Register</button>
                </div>

                
            </form>
        </div>
    )
};
