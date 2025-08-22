// import 'dotenv/config';
// import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
// import { QdrantVectorStore } from "@langchain/qdrant";
// import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
// import { OpenAI } from '@langchain/openai';


// const client = new  ChatGoogleGenerativeAI({
//     apiKey: 'AIzaSyCzGEZmcsJG67VnWUhNV-Kpk18yRJryeQs',
//     baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
// });

// async function query() {
//     const query = 'What is encapsulation in oops?'

//      const embeddings = new GoogleGenerativeAIEmbeddings({
//     model: "embedding-001",
//   });

//   const vectorStore = await QdrantVectorStore.fromExistingCollection(
//     embeddings,{
//         url: 'http://localhost:6333',
//         collectionName: 'chaicode-collection'
//     }
//   );

//   const vectorSearch = vectorStore.asRetriever({
//     k: 5, // Number of results to return
//   })

//   const relevantChunks = await vectorSearch.invoke(query);



// const SYSTEM_PROMPT = `
//     You are an AI assistant who helps resolving user query based on the
//     context available to you from a PDF file with the content and page number.

//     Only ans based on the available context from file only.

//     Context:
//     ${JSON.stringify(relevantChunks)}
//   `;

//   const response = await  client.chat.completions.create({
//     model:'gemini-2.5-flash',
//     messages :[
//         {
//             role: 'system',
//             content: SYSTEM_PROMPT
//         },
//         {
//             role: 'user',
//             content: query
//         }
//     ]
//   })

//   console.log(response.data.choices[0].content);
// }

// query();

import 'dotenv/config';
import { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";

const client = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",  // or gemini-1.5-pro
  apiKey: process.env.API_KEY, // safer than hardcoding
});

async function query() {
  const query = 'What is encapsulation in oops? and specify page number in pdf about this topic';

  // Embeddings
  const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "embedding-001",
    apiKey: process.env.API_KEY,
  });

  // Qdrant retriever
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: 'http://localhost:6333',
      collectionName: 'chaicode-collection',
    }
  );

  const vectorSearch = vectorStore.asRetriever({ k: 5 });
  const relevantChunks = await vectorSearch.invoke(query);

  const SYSTEM_PROMPT = `
    You are an AI assistant who helps resolving user query based on the
    context available to you from a PDF file with the content and page number.
    Only answer based on the available context from file only.

    Context:
    ${JSON.stringify(relevantChunks)}
  `;

  // ✅ LangChain way
  const response = await client.invoke([
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: query }
  ]);

  console.log("AI Response:", response.content);
}

query();