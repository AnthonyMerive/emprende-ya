import React, { useEffect, useState } from 'react'

export const useLocation = (initialState = '') => {

    const [country, setCountry] = useState(initialState)
    const [state, setState] = useState(initialState)

    const geoFind = () => {
        const success = (position) => {
            // console.log(position)
            fetchUbicacion(position)
        }

        const error = () => {
            console.log('error')
        }

        let options = {
            enableHighAccuracy: true,
            maximumAge        : 30000,
            timeout           : 27000
          };

        navigator.geolocation.getCurrentPosition(success, error, options)
    }

    const fetchUbicacion = (position) => {
        console.log(position)
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=58c34d161d7c4a8e88167cd3fa4238ab
        `)
            .then(response => response.json())
            .then(result => {
                if (result.features.length) {
                  
                    setCountry(result.features[0].properties.country)
                    setState(result.features[0].properties.state)
                } else {
                    console.log("No address found");
                }
            });
    }

    


    return [geoFind, country, state];

}