import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { getKnowledgeRetriever } from "../tools/rag_tool";
import { IAgentState } from "../state";

const llm = new ChatGoogleGenerativeAI({
  apiKey: "AIzaSyAhzcNQwlAyMNHDk4XMUfDtU-iXUvV5RJ8",
  model: "gemini-1.5-flash",
  temperature: 0
});

const historicalPrompt = `
**Investigación Histórica Profesional**

**Instrucciones importantes:**
1. Analiza el siguiente contexto histórico
2. Responde EXCLUSIVAMENTE en formato JSON válido
3. No incluyas ningún texto fuera del JSON

**Pregunta:** {question}

**Contexto disponible:**
{context}

**Estructura requerida:**
{
  "period": "fecha inicio-fecha fin",
  "location": "ciudad/región",
  "rulers": "nombre + dinastía/reino",
  "archaeologicalEvidence": "hallazgos relevantes",
  "sources": "fuentes confirmatorias"
}

**Ejemplo de respuesta válida:**
{
  "period": "1000-586 a.C.",
  "location": "Jerusalén, Israel",
  "rulers": "Reyes de Judá",
  "archaeologicalEvidence": "Sellos reales encontrados en la Ciudad de David",
  "sources": "Inscripciones asirias, Antigüedades de Josefo"
}
`;

export async function historicalAgent(state: IAgentState): Promise<Partial<IAgentState>> {
  const question = `Proporciona contexto histórico detallado para: ${state.userInput}`;
  const retriever = await getKnowledgeRetriever();
  const relevantDocs = await retriever.invoke(question);
  
  const context = relevantDocs.map(doc => `
    Fuente: ${doc.metadata.source || 'Desconocida'}
    Tipo: ${doc.metadata.type || 'General'}
    Contenido: ${doc.pageContent}
  `).join('\n');

  const formattedPrompt = historicalPrompt
    .replace("{question}", question)
    .replace("{context}", context);

  try {
    const response = await llm.invoke(formattedPrompt);
    const content = response.content.toString();

    // Extraer solo el JSON de la respuesta
    const jsonStart = content.indexOf('{');
    const jsonEnd = content.lastIndexOf('}') + 1;
    const jsonContent = content.slice(jsonStart, jsonEnd);

    const parsedResponse = JSON.parse(jsonContent);

    return { 
      historicalContext: parsedResponse,
      references: [
        "Atlas Bíblico de Oxford",
        "Historia de Israel de Bright",
        "Evidencia que Exige un Veredicto"
      ]
    };
  } catch (error) {
    console.log("Error procesando respuesta histórica:", error);

  }
}