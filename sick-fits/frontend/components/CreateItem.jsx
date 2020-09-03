import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'

import formatMoney from '../lib/formatMoney'
import Form from './styles/Form'
import Error from "../components/ErrorMessage"

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largerImage: String
  ){
    createItem(
      title: $title
      description: $description
      image: $image
      largerImage: $largerImage
      price: $price
    ){
      id
    }
  }
`

class CreateItem extends Component {
  state = {
    title: 'Canvas Shoes',
    description: 'Cool one with dynamic laces',
    image: '',
    largerImage: '',
    price: 22
  }

  handleChange = (event) => {
    //destructuring to get name,type,value from the event and then can be used for different input types 
    const { name, type, value } = event.target
    //handling type as number
    const val = type === 'number' ? parseInt(value) : value
    this.setState({ [ name ]: val })
  }

  uploadFile = async (e) => {
    
    console.log('Uploading....', e.target.files)
    const files = e.target.files
    const data = new FormData()
    data.append('file',files[0])
    data.append('upload_preset','dapper')

    //calling Cloudinary to upload image and getting original and transformed
    const response = await fetch('https://api.cloudinary.com/v1_1/pra-bhu/image/upload',
    {
      method: 'POST',
      body: data
    })
    const file = await response.json()
    console.log('file',file);
    this.setState({
      image: file.secure_url,
      largerImage : file.eager[0].secure_url
    })

    
  }

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {
          (createItem, { loading, error }) => (
            <Form onSubmit={async (event) => {
              //Stop the form from submitting
              event.preventDefault()
              //call the mutation
              const res = await createItem()
              console.log('res', res);
              Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id }
              })
            }}>
              <Error error={error} />
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="file">
                  Image
                <input type="file" id="file" name="file" placeholder="Upload an Image" required onChange={this.uploadFile} />
                {this.state.image && <img src = {this.state.image} alt="Upload Preview" />}
                </label>
                <label htmlFor="title">
                  Title
                <input type="text" id="title" name="title" placeholder="Title" required value={this.state.title} onChange={this.handleChange} />
                </label>
                <label htmlFor="price">
                  Price
                <input type="number" id="price" name="price" placeholder="Price"
                    required value={this.state.price} onChange={this.handleChange} />
                </label>
                <label htmlFor="description">
                  Description
                <textarea id="description" name="description" placeholder="Enter a Description"
                    required value={this.state.description} onChange={this.handleChange} />
                </label>
                <button type="submit">Submit</button>
              </fieldset>
            </Form>

          )
        }

      </Mutation>
    )
  }
}

export default CreateItem
export { CREATE_ITEM_MUTATION }