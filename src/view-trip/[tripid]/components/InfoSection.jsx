import { Button } from '@/components/ui/button';
import React from 'react';
import {IoIosSend} from "react-icons/io"
const InfoSection = ({ trip }) => {
  const userSelection = trip?.userSelection;

  return (
    <div>
      <img src='/placeholder.jpg' className='h-[340px] w-full object-cover rounded-xl' alt='Trip Location' />
    <div className='flex justify-between items-center'>
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{userSelection?.location || "Unknown Location"}</h2>
        <div className='flex gap-5'>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 '>
            🗓️ {userSelection?.noOfDays ?? "N/A"} Days
          </h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>
            💵 {userSelection?.budget ?? "N/A"} Budget
          </h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>
            🥂 No. Of Travellers: {userSelection?.traveller ?? "N/A"}
          </h2>
        </div>
      </div>
      <Button><IoIosSend/></Button>
    </div>
    </div>
  );
};

export default InfoSection;
