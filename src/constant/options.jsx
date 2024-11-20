export const SelectTravelsList = [
    {
        id:1,
        title:'Just Me',
        desc: 'A sole travels in exploration',
        icon: '🛩️',
        people: '1'
    },
    {
        id:2,
        title:'Couple',
        desc: 'A sole travels in exploration',
        icon: '🍻',
        people: '2 people'
    },
    {
        id:3,
        title:'Family',
        desc: 'A sole travels in exploration',
        icon: '🏠',
        people: '3 to 5 people'
    },
    {
        id:4,
        title:'Friends',
        desc: 'A sole travels in exploration',
        icon: '🫂',
        people: '5 to 10 People'
    }
]


export const SelectBudgetOptions=[
    {
        id: 1,
        title:'Cheap',
        desc:'Stay Concious of costs',
        icon: '💵'
    },
    {
        id: 2,
        title:'Moderate',
        desc:'Stay Concious of costs',
        icon: '💰'
    },
    {
        id: 3,
        title:'luxury',
        desc:'Stay Concious of costs',
        icon: '💸'
    },
]


export const AI_PROMT = `Generate Travel Plan for Location : {location}, for {totaldays} days for {people} with a {budget} budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and with placeName, PlaceDetails, Place Image Url, (All this should be real) Geo Coordinates, ticket Pricing, Time to travel each of the location for {totaldays} days with each day plan with best time to visit in JSON format only and give proper response without overwhelmin me.tripData: 
hotels: Array()
0
: 
{description: '', geoCoordinates: '', hotelImageUrl: '', hotelName: '', price: '', 

itinerary: Array(5)
0
: 
{day: 'Day 1', plan: Array(3)}
1
: 
{day: 'Day 2', plan: Array(3)}
2
: 
{day: 'Day 3', plan: Array(3)}
3
: 
{day: 'Day 4', plan: Array(3)}
4
: 
{plan: Array(3), day: 'Day 5'}
give response in above format only
`