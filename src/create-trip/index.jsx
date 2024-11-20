import React, { useState } from 'react';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMT, SelectBudgetOptions, SelectTravelsList } from '@/constant/options';
import { chatSession } from '@/service/AIModel';
import { db } from '@/service/firbaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { isLoaded, user } = useUser(); 
  const [place, setPlace] = useState('');
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Track if the dialog box is open
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fetch place suggestions from OpenStreetMap API
  const fetchPlaceSuggestions = async (input) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: input,
          format: 'json',
          addressdetails: 1,
          limit: 5, 
        },
      });
      setAutocompleteResults(response.data);
      setIsOpen(true); // Open the dropdown
    } catch (error) {
      console.error('Error fetching place suggestions:', error);
      setAutocompleteResults([]);
    }
  };

  const handlePlaceSelect = (selectedPlace) => {
    setPlace(selectedPlace.display_name); // Set the selected place in input
    handleInputChange('location', selectedPlace.display_name); // Update form data
    setIsOpen(false); // Close the dropdown
  };

  const OnGenerateTrip = async () => {
    if (!user) {
      toast('Please log in to generate a trip');
      return;
    }
  
    if (formData?.noOfDays > 5 && (!formData?.location || !formData.budget || !formData.traveller)) {
      toast('Please fill all details');
      return;
    }
  
    setLoading(true);
  
    const FINAL_PROMT = AI_PROMT.replace('{location}', formData.location)
      .replace('{totaldays}', formData.noOfDays)
      .replace('{people}', formData.traveller)
      .replace('{budget}', formData.budget)
      .replace('{totaldays}', formData.noOfDays);
  
    console.log(FINAL_PROMT);
  
    try {
      const result = await chatSession.sendMessage(FINAL_PROMT);
      const responseText = await result.response.text(); // Await and inspect this
      console.log(responseText);
  
      // Attempt to parse after confirming response is JSON
      // let tripData;
      // try {
      //   tripData = JSON.parse(responseText);
      // } catch (jsonError) {
      //   console.error('Error parsing JSON:', jsonError, responseText);
      //   toast('Received invalid response. Please try again.');
      //   setLoading(false);
      //   return;
      // }
  
      saveAITrip(responseText);
    } catch (error) {
      console.error('Error generating trip:', error);
      toast('An error occurred while generating the trip. Please try again.');
      setLoading(false);
    }
  };
  

  const saveAITrip = async (TripData) => {
    setLoading(true);
    const docID = Date.now().toString();

    await setDoc(doc(db, 'AITrips', docID), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.primaryEmailAddress?.emailAddress,
      id: docID,
    });
    setLoading(false);
    navigate('/view-trip/'+docID)
  };

  if (!isLoaded) return null;

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🌴🥥</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>
      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
          <input
            type="text"
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
              fetchPlaceSuggestions(e.target.value); // Fetch suggestions as the user types
            }}
            placeholder="Type a location"
            className="border p-2 w-full rounded"
          />
          
          {/* Displaying a custom dialog box with place suggestions */}
          {isOpen && autocompleteResults.length > 0 && (
            <div className="absolute w-full mt-2 bg-white border rounded shadow-md z-10">
              {autocompleteResults.map((result, index) => (
                <div
                  key={index}
                  className="cursor-pointer p-3 hover:bg-gray-200"
                  onClick={() => handlePlaceSelect(result)}
                >
                  {result.display_name}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <Input placeholder={"Ex. 3"} type="number" onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
        </div>
      </div>
      
      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                formData?.budget === item.title && 'shadow-lg border-black'
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl my-3 font-medium">Who do you plan to travel with on your next adventure?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('traveller', item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                formData?.traveller === item.people && 'shadow-lg border-black'
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      
      <div className="my-10 justify-end flex">
        {!user ? (
          <SignInButton mode="modal">
            <Button>Sign In to Generate Trip</Button>
          </SignInButton>
        ) : (
          <Button disabled={loading} onClick={OnGenerateTrip}>
            {loading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : (
              'Generate Trip'
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Index;
