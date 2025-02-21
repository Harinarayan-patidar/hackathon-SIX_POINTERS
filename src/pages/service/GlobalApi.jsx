import axios from "axios"

const Base_URL = "https://maps.googleapis.com/maps/api/place/textsearch/output?parameters"

const config ={
    headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key': "AIzaSyAJNMOFgi-cg9He2flax0Ydc-RdcymATPs",
        'X-Goog-FieldMask':[
            ' places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

export const GetPlaceDetails =(data)=> axios.post(Base_URL, data , config)