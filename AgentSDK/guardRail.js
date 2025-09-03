import 'dotenv/config'
import {Agent , run , tool} from '@openai/agents'

let database = []

const mathCheckAgent = {
    name : 'Math-Agent',
    instructions : 'Check if user query is math problem or not',
    // we use outputType in guardrail or validation where we have to must return in specific way 

    // also we use outputType for our matchcheckagent so that he can receive data in true n false
    outputType: z.object({
    isMathHomework: z
      .boolean()
      .describe('Set this to true if its a math homework'),
  }),
}

const checkMathInput = {
    name : 'Math-Guardrail',
    execute : async({input}) => {
        const result = await run(mathCheckAgent , input )
        return {
            tripwireTriggered: result.finalOutput.isMathHomework ? true : false,
        }
    }
}

const customerSupportAgent = new Agent({
    name : 'Customer-Support',
    instructions : 'You are customer support agent which help them to solve their problem',
    iinputGuardrails : [checkMathInput]
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

runAgent('what is 2+2')


