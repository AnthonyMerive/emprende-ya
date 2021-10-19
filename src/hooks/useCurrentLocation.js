
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { guardarSincrono } from '../actions/interfazAction'


export const useCurrentLocation = () => {
    const locacion = useSelector(store => store.location)
    const { location } = locacion




    const [watch, setWatch] = useState(false)
    const dispatch = useDispatch()



    const currentGeoFind = () => {
        const success = (position) => {
            // console.log(position)
            fetchUbicacion(position)
        }

        const error = () => {
            console.log('error')
            dispatch(guardarSincrono('error'))
            setWatch(false)
        }

        let options = {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        };

        navigator.geolocation.watchPosition(success, error, options)
    }

    useEffect(() => {
        if(watch){
            currentGeoFind()
        }
    }, [watch])

    const fetchUbicacion = (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=58c34d161d7c4a8e88167cd3fa4238ab
        `)
            .then(response => response.json())
            .then(result => {
                if (result.features.length) {
                    dispatch(guardarSincrono(`${result.features[0].properties.city} , ${result.features[0].properties.state}`))
                } else {
                    console.log("No address found");
                }
            });
    }

    return [ setWatch, watch]
}
