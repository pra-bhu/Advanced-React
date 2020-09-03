import React, { Component } from 'react';
import {Query} from "react-apollo"
import gql from 'graphql-tag'
import styled from "styled-components"

import Item from "./Item"
const Center = styled.div`
  text-align: center;
`

const ItemsList = styled.div`
  display : grid;
  grid-template-columns: 1fr 1fr;
  grid-gap : 1rem;
  max-width:${props => props.theme.maxWidth};
  margin: 0 auto;
`

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items{
      id
      title
      description
      image
      largerImage
      price
    }
  }
`

class Items extends Component {
  
  render() {
    return (
      <Center>
        <Query query={ALL_ITEMS_QUERY}>
          {({data,loading,error}) => {
            console.log('data',{data,loading,error})
            if(loading) <p>Loading...</p>
            if(error) <p>Error: {error.message}</p>
          return (<ItemsList>
            {data.items && data.items.map(item => <Item item={item} key={item.id} />)}
            </ItemsList>)
          }}
        </Query>
      </Center>
    );
  }
}

export default Items;
export { ALL_ITEMS_QUERY }