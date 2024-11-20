import React from 'react'

const PlacesToVisit = ({trip}) => {
  return (
    <div>
        <h2 className=' font-bold text-lg'>
            Places to Visit
        </h2>

        <div>
            {trip.tripData.travelPlan.days.map((item, index)=>(
                <div>
                    <h2>
                        
                    </h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default PlacesToVisit