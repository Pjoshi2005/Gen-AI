import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

// const getTimeTool = tool({
//   name: "get_time_tool",
//   description: "you are a tool which returns the current time",
//   schema: z.object({}),//schema in place of para
//   async run() {
//     return Date().toString();
//   },
// });

const getTimeTool = tool(
  async () => new Date().toString(), // the function
  {
    name: "get_time_tool",
    description: "Returns the current time",
  }
);

const getMenuTool = tool({
  name: "get_menu",
  description: "you are a tool which returns menu ",

//   Think of a tool like a JavaScript function.

// parameters / schema= what arguments that function expects.

// If the tool expects an array, you define it in parameters using Zod.

// Then the main agent must call the tool with inputs that match that schema

  schema: z.object({}),
  async run() {
    return {
      Drinks: {
        Strawberry: "100INR",
        Chocolate: "100INR",
      },
      Starters: {
        Pizza: "200inr",
        pasta: "260 inr",
      },
    };
  },
});

// const cookingAgent = new Agent({
//   name: 'Cooking Agent',
//   model: 'gpt-4.1-mini',
//   tools: [getCurrentTime, getMenuTool],
//   instructions: `
//     You're a helpfull cooking assistant who is speacialized in cooking food.
//     You help the users with food options and receipes and help them cook food
//   `,
// });

const cookingAgent = new ChatGoogleGenerativeAI({
  modelName: "gemini-2.5-flash", // can also use gemini-1.5-pro
  apiKey: process.env.GEMINI_API_KEY,
}).bindTools([getTimeTool, getMenuTool]);


const codingAgent = new Agent({
  name: 'Coding Agent',
  instructions: `
        You are an expert coding assistant particullarly in Javascript
    `,
});

// async function chatWithAgent(query){
//     const result = await run(cookingAgent , query)
//     console.log(`History`, result.history);
// }

async function chatWithAgent(query) {
  const response = await cookingAgent.invoke(query);
  console.log("Agent Response:", response.content[0].text);
}

chatWithAgent('I want to cook a cake, what are all the menu items');