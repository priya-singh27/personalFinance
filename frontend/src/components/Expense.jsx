import axios from 'axios'
import { CloudCog } from 'lucide-react';
import { useEffect, useState } from 'react'

const api_url = import.meta.env.VITE_API_BASE_URL;

const CATEGORIES = [
    { value: "income", label: "Income" },
    { value: "food", label: "Food" },
    { value: "transportation", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    { value: "healthcare", label: "Healthcare" },
    { value: "utilities", label: "Utilities" },
    { value: "shopping", label: "Shopping" },
    { value: "education", label: "Education" },
    { value: "travel", label: "Travel" },
    { value: "other", label: "Other" },
];

export default function Expense() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false)

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        type: "expense",
        date: "",
        description:""
    })

    useEffect(() => {
        try {
            setLoading(true);
            setCategories(CATEGORIES)
        } catch (e) {
            setError('Failed to fetch categories');
            console.error('Error:', e);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]:value
        }))
    }

    const handleAddExpense = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        try {
            const response = await axios.post(`${api_url}/manage-finance/create`, formData, {
                headers: {
                    'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log('Record created:', response.data);

            setFormData({
                title: '',
                amount: '',
                type: 'expense',
                category: '',
                date: '',
                description: ''
            });
        } catch (err) {
            setError('Failed to create record');
            console.error('Error:', err);
        } finally {
            setSubmitLoading(false);
        }
    }

    return (
        <div className='w-full max-w-md shadow-lg rounded-xl p-6 m-5 border border-gray-200'>
          
                <form className='space-y-4' onSubmit={handleAddExpense}>

                    <input
                        name='title'
                        value={formData.title}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-4"
                        type="text"
                        placeholder='Enter Expense Title'
                        required
                    />

                    <input
                        name='amount'
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
                        type="number"
                        placeholder='Enter Amount'
                        required
                    />
                
                    <div>
                    <p className='font-semibold mb-2'>Type</p>
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5">
                            <option value="">--Expense type--</option>
                            <option value="expense">Expense</option>
                            <option value="income">Income</option>
                        </select>
                    </div>


                    <div>
                        <p className='font-semibold mb-2'>Category</p>
                        {loading && <p>Loading categories...</p>}

                        { error && <p className='text-red-500'>{error}</p>}
                     
                    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5">
                            <option value="">--Please choose a category--</option>
                            {categories.map(category => {
                                return <option key={category.value} value={category.value}>
                                    {category.label}
                                </option>
                            })}
                        </select>

                    </div>

                    <input
                        type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:bg-cyan-600 block w-full p-2.5"
                    />

                    <button
                        type='submit'
                        className='w-full bg-gradient-to-br bg-cyan-700  hover:bg-cyan-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors'
                    >
                        Add Expense
                    </button>
                </form>
        </div>
    )
}