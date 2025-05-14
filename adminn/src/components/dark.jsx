import React, { useContext } from 'react';
import { MyContext } from '../MyContext'; 

export default function DarkSection() {
    const { theme } = useContext(MyContext);

    return (
        <section
            className={`${!theme ? "dark" : ""} text-gray-600 body-font bg-white dark:bg-gray-800`}
        >
            <div className='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
                <div className='lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center'>
                    <h1 className='text-4xl font-bold mb-4'>Welcome to Dark Mode Section</h1>
                    <p className='mb-8 leading-relaxed'>
                        Bu joyda siz kontekst orqali light va dark rejimni boshqarishingiz mumkin.
                    </p>
                </div>

                <div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6'>
                    <img
                        className='object-cover object-center rounded'
                        src="https://dummyimage.com/720x600"
                        alt="hero"
                    />
                </div>
            </div>
        </section>
    );
}
