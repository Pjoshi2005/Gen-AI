import 'dotenv/config';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";


async function init(){    
const filePath = "./RAG/oops2.pdf"; 
const loader = new PDFLoader(filePath);
const docs = await loader.load()

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: 'AIzaSyCzGEZmcsJG67VnWUhNV-Kpk18yRJryeQs', 
  model: "embedding-001",
});

const vectorStore = await QdrantVectorStore.fromDocuments(docs, embeddings, {
    url: 'http://localhost:6333',
    collectionName: 'chaicode-collection',
  });

    console.log('indexing complete')
    }

init();