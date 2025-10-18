import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { IAgentState } from "../state";

const llm = new ChatGoogleGenerativeAI({
  apiKey: "AIzaSyAhzcNQwlAyMNHDk4XMUfDtU-iXUvV5RJ8",
  model: "gemini-1.5-flash",
  temperature: 0
});

const orchestratorPrompt = `
Eres el director del Instituto de Investigación Bíblica. Analiza la siguiente pregunta y genera un plan detallado:

**Pregunta:** "{userInput}"

**Genera un plan que incluya:**
1. Contexto histórico (periodo exacto, ubicación, figuras relevantes)
2. Análisis lingüístico (términos clave en hebreo/griego)
3. Perspectiva teológica (doctrinas relacionadas)
4. Comparativa denominacional (interpretaciones diversas)

**Formato de salida:**
- Objetivo principal: ___
- Sub-temas a investigar: 
  1. ___
  2. ___
  3. ___
- Recursos recomendados: ___
`;

export async function orchestratorAgent(state: IAgentState): Promise<Partial<IAgentState>> {
  const { userInput } = state;
  const formattedPrompt = orchestratorPrompt.replace("{userInput}", userInput || "");

  const response = await llm.invoke(formattedPrompt);
  
  return { 
    researchPlan: response.content.toString(),
    references: [
      "Biblia Interlineal Hebreo-Español",
      "Diccionario Expositivo Vine",
      "Nuevo Diccionario Bíblico Certeza"
    ]
  };
}