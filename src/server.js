import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
// Sample data for products (you can replace this with your database)
const products = [
  { id: "1", name: "Product A", description: "Description A", price: 19.99 },
  { id: "2", name: "Product B", description: "Description B", price: 29.99 },
  // Add more products here
];

const typeDefs = `#graphql
 type product {
    id: ID!
    name: String!
    description: String!
    price: Float!
 }

 type Query {
    getAllProducts:[product]
    getAllProductById (id: ID!) : [product]
    getAllProductByName (name: String!): [product]
 }

 type Mutation {
    updateProduct (
        id: ID!
        name: String!
        description: String!
        price: Float!

    ): product
    deleteProduct(id:ID!): String!
    createProduct (
        id: ID!
        name: String!
        description: String!
        price: Float!
    ): product
    
 }`

 const resolvers = {

Query: {
    getAllProducts :() => products,
    getAllProductById:(_, {id}) => {
        let res = products.filter((product)=> product.id == id)
        return res;
    },
    
    getAllProductByName: (_,{name}) =>{
        
        const res = products.filter((product) => {
            product.name == name})
            console.log(res)

            return res;


    }
    
},

Mutation:{
    updateProduct:(_, {id, name, description, price}) =>{
        const productIndex = products.findIndex((product) => product.id == id)
        if(productIndex == -1) {
            throw new Error('Product not found')
        }

        products[productIndex] = {
            ...productIndex,
            id, name, description, price
        }
        return products[productIndex]
    },
    deleteProduct:(_, {id}) =>{
        const productIndex = products.findIndex((product) => product.id == id);
        if(productIndex == -1) {
            throw new Error('Product not found')
        }

        products.splice(products[productIndex], 1)

        return "product Deleted Successfully"

    },
    createProduct:(_,{id, name, description, price}) =>{
        let newProduct = {
            id: (products.length + 1).toString(),
            name: name,
            description: description,
            price: price
        }

        products.push(newProduct);

        return newProduct;
    },


}



 }

 const server = new ApolloServer({typeDefs, resolvers});
 const {url} = await startStandaloneServer(server, {
    listen:{port: 4000}
 });

 console.log(`server listening on ${url}`)

