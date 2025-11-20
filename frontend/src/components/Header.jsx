import { HandCoins } from 'lucide-react';


export default function Header() {
    return (
        <div className='header flex flex-col justify-center bg-gradient-to-r from-transparent via-blue-100 to-transparent shadow-md min-h-[100px] sm:min-h-[120px] md:min-h-[150px] py-4'>
            <div className='flex justify-center items-center gap-2 sm:gap-4 md:gap-6 px-4'>
                <HandCoins color='var(--color-blue-200)' className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-[45px] lg:h-[45px]' />
                <h1 className='text-cyan-600 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold'>
                    EXPENSE TRACKER
                </h1>
                <HandCoins color='var(--color-blue-200)' className='w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-[45px] lg:h-[45px]' />
            </div>
            <div className='text-center w-full mt-2 sm:mt-4 p-2 rounded-md text-cyan-900 font-semibold text-xs sm:text-sm md:text-base'>
                    your personal financial manager
            </div>

        </div>
    )
}
