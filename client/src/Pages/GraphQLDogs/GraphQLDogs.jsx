




import React from 'react'
import './GraphQLDogs.css'
import { useQuery, gql } from '@apollo/client'


const GET_DOGS = gql `
query GetDogs  {
    dogs_breed {
        title,
        type
    }
}
`;



const GraphQLDogs = () => {
        const { loading, error, data } = useQuery(GET_DOGS)

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error fetching dogs</p>;
      


  return (
   <>

    <ul>
    {data.dogs_breed.map((elements, index) => (
    <li key={index}>
      <strong>title: {elements.title} and type: {elements.type}</strong>
    </li>
  ))}
    </ul>


    
   </>
  )
}

export default GraphQLDogs
