import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router';
import {Trash2, Edit2, MoreVertical, Check, X, User} from 'lucide-react'

const api_url = import.meta.env.VITE_API_BASE_URL;

const CATEGORIES = [
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

export default function Expense({ expenses, setExpenses }) {
    // const [expenses, setExpenses] = useState([{}]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingExpense, setEditingExpense] = useState(null);
    const [openMenuId, setOpenMenuId] = useState(null);

    const navigate = useNavigate();
    const menuRef = useRef(null);

    const toggleMenu = (expenseId) => {
        if (openMenuId == expenseId) setOpenMenuId(null);
        else setOpenMenuId(expenseId)
    }

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

    useEffect(() => {
        
        fetchExpenses();

    }, [setExpenses]); 

    const handleDelete = async(expenseId) => {

        try {
            setLoading(true);
            const res = await axios.delete(
                `${api_url}/expense/delete/${expenseId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            console.log(`Deleted: ${res.data}`);

            fetchExpenses();

        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
            setError('Failed to remove expense');
            console.error('Error:', err);
        } finally {
            setLoading(false);
            setError(null)
        }
    }

    const handleEdit = (expense) => {
        console.log("In handleEdit..");
        setEditingExpense(expense);  
        setOpenMenuId(null);
    }

    const handleUpdate = async(updatedExpense) => {
        try {
            setLoading(true);
            
            const reqBody = {
                title: updatedExpense.title,
                amount: updatedExpense.amount,
                category: updatedExpense.category,
                date: updatedExpense.date,
                description: updatedExpense.description
            }
            const res = await axios.put(
                `${api_url}/expense/update/${updatedExpense.id}`,
                reqBody,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            console.log(`Updated: ${res.data}`);

            fetchExpenses();

        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
            }
            setError('Failed to update expense');
            console.error('Error:', err);
        } finally {
            setLoading(false);
            setError(null);
            setEditingExpense(null);
            setOpenMenuId(null);
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        let processedValue = value;

        if (name === "amount") {
            processedValue = parseInt(value) || 0;
        }
        setEditingExpense(prev => ({
            ...prev,
            [name]: processedValue
        }))
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuId(null);
            }
        }

        if (openMenuId !== null) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[openMenuId])

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
                        <th className="text-gray-800">Actions</th>
                    </tr>
                </thead>


                <tbody className="divide-y divide-gray-200">
                    {expenses
                        .map((expense, index) => (
                            <>
                                <tr key={expense.id} className={index % 2 !== 0 ? "bg-cyan-50 border-0 rounded-xl shadow-lg text-gray-700" : "bg-cyan-100 border-0 rounded-xl shadow-lg text-gray-700"}>
                                    <td className="py-2 px-2 lg:px-3 text-center text-sm">{editingExpense?.id == expense.id ? <input value={editingExpense.title} name='title' onChange={handleInputChange} className='text-center  border-b focus:border-cyan-800' /> : expense.title}</td>
                                    
                                    <td className="py-2 px-2 lg:px-3 text-center text-sm">{editingExpense?.id == expense.id ? <input value={editingExpense.amount} name='amount' onChange={handleInputChange} className='text-center border-b focus:border-cyan-800' /> : expense.amount}</td>

                                    <td className="py-2 px-2 lg:px-3 text-center text-sm">{editingExpense?.id == expense.id ? <select onChange={handleInputChange} name='category' value={editingExpense.category} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-200 focus:border-cyan-500 block w-full p-2.5">
                                        {CATEGORIES.map(category => {
                                            return <option key={category.value} value={category.value}>
                                                {category.label}
                                            </option>
                                        })}
                                    </select> : expense.category}</td>

                                    <td className="py-2 px-2 lg:px-3 text-center text-sm">{editingExpense?.id == expense.id ? 
                                        <input
                                            name='date'
                                            value={new Date(editingExpense.date).toISOString().split('T')[0]}
                                            onChange={handleInputChange}
                                            type="date"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                        />
                                        : new Date(expense.date).toLocaleDateString()}
                                    </td>

                                
                                    <td className="py-2 px-2 lg:px-3 text-center text-sm">{editingExpense?.id == expense.id ? 
                                        <textarea
                                            name="description"
                                            value={editingExpense.description}
                                            onChange={handleInputChange}
                                            placeholder="Description..."
                                            rows="2"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2 resize-none"
                                        />
                                        :
                                        expense.description}
                                    </td>


                                    <td className="py-2 px-2 lg:px-3 text-center text-sm relative">

                                        {openMenuId === expense.id && (
                                            <div ref={menuRef} className="z-5 absolute right-0 bg-neutral-100 shadow-lg rounded p-4 flex flex-col text-cyan-950">
                                                <button onClick={() => handleEdit(expense)} className='border-0 rounded-xl p-1 opacity-50 hover:opacity-100 transition-opacity'>Edit</button>
                                                <button onClick={() => handleDelete(expense.id)} className='border-0 rounded-xl p-1 opacity-50 hover:opacity-100 transition-opacity'>Delete</button>
                                            </div>
                                        )}

                                        {editingExpense?.id === expense.id ? 
                                            <div className='text-3xl  p-2'>
                                                <button onClick={(() => handleUpdate(editingExpense))}><Check className='text-green-600'></Check> </button>
                                                <button onClick={() => setEditingExpense(null)}><X className='text-red-600 '></X></button>
                                            </div>
                                            :
                                            <button onClick={() => toggleMenu(expense.id)}>
                                                <MoreVertical size={16}></MoreVertical>
                                            </button>
                                        }
                                    </td>
                                </tr>
                            </>
                        ))}
                    
                    
                </tbody>

            </table>


        </div>

        
    </div>

} 