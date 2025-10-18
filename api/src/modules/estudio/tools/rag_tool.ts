import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Document } from "@langchain/core/documents";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { VectorStoreRetriever } from "@langchain/core/vectorstores";
//import { PDFLoader } from "langchain/document_loaders/fs/pdf";
//import { TextLoader } from "langchain/document_loaders/fs/text";

let retrieverInstance: VectorStoreRetriever<MemoryVectorStore> | null = null;

async function loadTheologicalResources() {
  const loaders = [
    new CheerioWebBaseLoader("https://www.indubiblia.org/nuevo-testamento-1"),
    new CheerioWebBaseLoader("https://www.indubiblia.org/antiguo-testamento-1"),
    //new PDFLoader("src/data/comentarios-biblicos.pdf"),
    //new TextLoader("src/data/diccionario-teologico.txt")
  ];

  return Promise.all(loaders.map(loader => loader.load()));
}

async function createKnowledgeBase(): Promise<VectorStoreRetriever<MemoryVectorStore>> {
  console.log("Creando base de conocimientos teológicos...");

  //const [wikiDocs, pdfDocs, textDocs] = await loadTheologicalResources();
  const [wikiDocs] = await loadTheologicalResources();
  
  const customDocs = [
    new Document({
      pageContent: "El pastor en la cultura judía era un símbolo de protección y guía total.",
      metadata: { source: "Cultura Bíblica", type: "cultural" }
    }),
    new Document({
      pageContent: "Romanos fue escrito por Pablo en Corinto alrededor del 57 d.C. durante su tercer viaje misionero.",
      metadata: { source: "Introducción al NT", type: "historical" }
    })
  ];

  const embeddings = new GoogleGenerativeAIEmbeddings({ 
    apiKey: "AIzaSyAhzcNQwlAyMNHDk4XMUfDtU-iXUvV5RJ8"
  });

  //const allDocs = [...wikiDocs, ...pdfDocs, ...textDocs, ...customDocs];
  const allDocs = [...wikiDocs, ...customDocs];
  const vectorstore = await MemoryVectorStore.fromDocuments(allDocs, embeddings);
  
  console.log("Base de conocimientos creada con éxito");
  return vectorstore.asRetriever(5);
}

export async function getKnowledgeRetriever(): Promise<VectorStoreRetriever<MemoryVectorStore>> {
  if (!retrieverInstance) {
    retrieverInstance = await createKnowledgeBase();
  }
  return retrieverInstance;
}