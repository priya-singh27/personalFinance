import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const api_url = import.meta.env.VITE_API_BASE_URL;

export default function Expense({ expenses, setExpenses }) {
    // const [expenses, setExpenses] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate=useNavigate()

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                setLoading(true)
                const response = await axios.get(
                    `${api_url}/expense/fetch`,
                    {
                        headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );

                console.log(response.data);

                setExpenses(response.data.data);
            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
                setError('Failed to fetch expenses');
                console.error('Error:', err);
            } finally {
                setLoading(false);
                setError(null)

            }
        }

        fetchExpenses();

    }, [setExpenses]);

    return <div className='flex-col w-full border-gray-200 shadow-lg p-3 sm:p-4 md:p-6 m-2 sm:m-3 md:m-5 border rounded-xl'>
        {loading && <p>Getting expenses...</p>}
        {error && <p className='text-red-500'>{error}</p>}

        <p className='font-semibold text-lg sm:text-xl md:text-2xl text-cyan-800 rounded-xl p-2 sm:p-3 md:p-4 pl-2 sm:pl-4'>Expenses</p>

        {/* Mobile Card View */}
        <div className="md:hidden max-h-[400px] sm:max-h-[500px] overflow-y-auto space-y-3">
            {expenses.map((expense, index) => (
                <div key={expense.id} className={`p-3 rounded-lg shadow ${index % 2 !== 0 ? "bg-cyan-50 text-gray-800" : "bg-cyan-600 text-neutral-50"}`}>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                            <span className="opacity-70">Amount:</span>
                            <span className="ml-1 font-medium">{expense.amount}</span>
                        </div>
                        <div>
                            <span className="opacity-70">Category:</span>
                            <span className="ml-1">{expense.category}</span>
                        </div>
                        <div>
                            <span className="opacity-70">Date:</span>
                            <span className="ml-1">{new Date(expense.date).toLocaleDateString()}</span>
                        </div>
                        {expense.description && (
                            <div className="col-span-2">
                                <span className="opacity-70">Note:</span>
                                <span className="ml-1">{expense.description}</span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block max-h-[500px] overflow-y-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr className="text-cyan-900 sticky top-0 bg-white shadow-sm">
                        <th className="py-3 lg:py-5 text-gray-800 px-2 lg:px-4 text-sm lg:text-base">Title</th>
                        <th className="py-3 lg:py-5 text-gray-800 px-2 lg:px-4 text-sm lg:text-base">Amount</th>
                        <th className="py-3 lg:py-5 text-gray-800 px-2 lg:px-4 text-sm lg:text-base hidden lg:table-cell">Category</th>
                        <th className="py-3 lg:py-5 text-gray-800 px-2 lg:px-4 text-sm lg:text-base">Date</th>
                        <th className="py-3 lg:py-5 text-gray-800 px-2 lg:px-4 text-sm lg:text-base hidden xl:table-cell">Description</th>
                    </tr>
                </thead>


                <tbody className="divide-y divide-gray-200">
                    {expenses
                        .map((expense, index) => (
                            <tr key={expense.id} className={index % 2 !== 0 ? "bg-cyan-50 border-0 rounded-xl shadow-lg text-gray-800" : "bg-cyan-600 border-0 rounded-xl shadow-lg text-neutral-50"}>
                                <td className="py-2 px-2 lg:px-3 text-center text-sm">{expense.title}</td>
                                <td className="py-2 px-2 lg:px-3 text-center text-sm">{expense.amount}</td>
                                
                                <td className="py-2 px-2 lg:px-3 text-center text-sm hidden lg:table-cell">{expense.category}</td>
                                <td className="py-2 px-2 lg:px-3 text-center text-sm">
                                    {new Date(expense.date).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-2 lg:px-3 text-center text-sm hidden xl:table-cell">{expense.description}</td>
                            </tr>
                        ))}
                </tbody>

            </table>


        </div>
    </div>

}