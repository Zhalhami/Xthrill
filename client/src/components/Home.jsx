import React, {useEffect, useState}from "react";

function Home(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const serverLink = 'http://localhost:5000'

    useEffect(() => {
        fetch(serverLink + "/username")
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            setData(data);
            setLoading(false); // Stop loading after fetching data
          })
          .catch((error) => {
            console.error("Error fetching username:", error);
            setLoading(false); // Stop loading even if there's an error
          });
      }, []); // Add dependency array to prevent infinite loops

      
      return (
        <div className="home">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <>
              <h2>Welcome {data ? data.message : "Guest"}</h2>
              <h2>What will you like to have today?</h2>
            </>
          )}
        </div>
      );
    }
    
    export default Home;