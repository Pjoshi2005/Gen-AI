import 'dotenv/config'
import {Agent , run , tool} from '@openai/agents'

let database = []
const customerSupportAgent = new Agent({
    name : 'Customer-Support',
    instructions : 'You are customer support agent which help them to solve their problem'
})

async function runAgent(query = ''){
    const result = await run(
        customerSupportAgent , 
        database.concat({role : 'user' , content : query})
    );

    database = result.history

    console.log(result.finalOutput)
    console.log(database)

}

runAgent('My name is Pankaj Joshi').then(() => {
    runAgent('What is my name')
})
