
import React, {useState, useEffect} from 'react'

const api = [
    {
      "Ynov" : [
        {
          "user" : [
            {
              "name" : "Jean",
              "age" : 25
            },
            {
              "name" : "Pierre",
              "age" : 26
            }
          
          ]
        }
      ]
    },
    {
      "Ynov1" : [
        {
          "user" : [
            {
              "name" : "Jean",
              "age" : 25
            },
            {
              "name" : "Pierre",
              "age" : 26
            }
          
          ]
        }
      ]
    }
  ]

function Details() {
    const currentRoute = window.location.pathname
    useEffect(()=> {
        console.log(currentRoute)
    })
    return (
        <div>
            <h1>This is the about page</h1>
        </div>
    )
}

export default Details;