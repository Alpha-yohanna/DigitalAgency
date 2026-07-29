import React from 'react';
import avatarImg from '../images/avatarImg.png';
function Card() {
    return (
        <div className="card m-2 w-[280px] rounded-lg bg-white p-5 text-left shadow-lg sm:w-[385px]">
            <p>
                Thank You for your service. I am very pleased with the result. I
                have seen exponential growth in my business and it is all thanks
                to your amazing service.
            </p>
            <div className="mt-5 flex items-center gap-3">
                <img src={avatarImg} alt='avatar Image' className='h-12 w-12 rounded-full'/>
                <div>
                    <p className='font-bold'>Emily Stones</p>
                    <p>CEO, Marketing Guru</p>
                </div>
            </div>
        </div>
    );
  }
  export default Card;
