import { HandCoins } from 'lucide-react';


export default function Header() {
    return (
        <div className='header flex flex-col justify-center bg-gradient-to-r from-transparent via-blue-100 to-transparent mt-2.5 mb-4 p-14 shadow-md min-h-[150px]'>
            <div className='flex  justify-center gap-6 '>
                <HandCoins color='var(--color-blue-200)' size={45} />
                <h1 className=' text-cyan-600 text-5xl'>
                    EXPENSE TRACKER
                </h1>
                <HandCoins color='var(--color-blue-200)' size={45} />
            </div>
            <div className='text-center w-full mt-4 p-2 rounded-md text-cyan-900 font-semibold'>
                    your personal financial manager
            </div>
            
        </div>
    )
}
