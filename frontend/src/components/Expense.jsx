import axios from 'axios'
import { useEffect, useState } from 'react'

const api_url = import.meta.env.VITE_API_BASE_URL;

export default function Expense({expenses, setExpenses}) {
    // const [expenses, setExpenses] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState(null);

    useEffect( ()=>{
        const fetchExpenses = async () => {
            try {
                setLoading(true)
                const response = await axios.get(
                    `${api_url}/manage-finance/fetch`
                );

                console.log(response.data);

                setExpenses(response.data.data);
            } catch (err) {
                setError('Failed to fetch expenses');
                console.error('Error:', err);
            } finally {
                setLoading(false);

            }
        }

        fetchExpenses();

    }, [setExpenses]);

    return <div className='flex-col w-full border-gray-200 shadow-lg p-6 m-5 border rounded-xl'>
        {loading && <p>Getting expenses...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        
        <p className='font-semibold text-2xl  text-cyan-800 rounded-xl p-4 pl-4'>Expenses</p>

        <div className="max-h-[500px] overflow-y-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 ">
                <thead >
                    <tr className=" text-cyan-900 sticky top-0 bg-white  shadow-sm">
                        <th className="py-5 roun text-gray-800 px-4">Title</th>
                        <th className="py-5 roun text-gray-800 px-4">Amount(Rupees)</th>
                        <th className="py-5 roun text-gray-800 px-4">Type</th>
                        <th className="py-5 roun text-gray-800 px-4">Category</th>
                        <th className="py-5 roun text-gray-800 px-4">Date</th>
                        <th className="py-5 roun text-gray-800 px-4">Description</th>
                    </tr>
                </thead>

                
                <tbody className="divide-y divide-gray-200">
                    {expenses
                        .map((expense, index) => (
                        <tr key={expense.id} className={index % 2 !== 0 ? "bg-cyan-50 border-0 rounded-xl shadow-lg text-gray-800" : "bg-cyan-600 border-0 rounded-xl shadow-lg text-neutral-50"}>
                            <td className="py-2 px-3 text-center">{expense.title}</td>
                            <td className="py-2 px-3 text-center">{expense.amount}</td>
                            <td className="py-2 px-3 text-center">
                                <span className={`px-2 py-1 rounded-full text-xs ${expense.type === 'income'
                                        ? 'bg-green-100 text-green-800'
                                        : expense.id % 2 !== 0 ? 'bg-red-100 text-red-800' : 'bg-red-300 text-white'
                                    }`}>
                                    {expense.type}
                                </span>
                            </td>
                            <td className="py-2 px-3 text-center">{expense.category}</td>
                            <td className="py-2 px-3 text-center">
                                {new Date(expense.date).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-3 text-center">{expense.description}</td>
                        </tr>
                    ))}
                </tbody>
                
            </table> 
            
            
        </div>
    </div>
    
}