import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { IAgentState } from "../state";

const llm = new ChatGoogleGenerativeAI({
  apiKey: "AIzaSyAhzcNQwlAyMNHDk4XMUfDtU-iXUvV5RJ8",
  model: "gemini-1.5-flash",
  temperature: 0.2
});

const theologyPrompt = `
**Análisis Teológico Profesional**

**Instrucciones importantes:**
1. Responde EXCLUSIVAMENTE en formato JSON válido
2. No incluyas marcas de código (\`\`\`json) ni texto explicativo
3. Sigue estrictamente el formato especificado

**Tema:** {userInput}

**Contexto histórico:** {historicalContext}

**Análisis lingüístico:** {linguisticAnalysis}

**Estructura requerida:**
{
  "doctrines": ["doctrina1", "doctrina2"],
  "denominationalViews": {
    "Católica": "interpretación",
    "Protestante": "interpretación",
    "Ortodoxa": "interpretación"
  },
  "academicConsensus": "consenso"
}

**Ejemplo de respuesta válida:**
{
  "doctrines": ["Justificación", "Santificación"],
  "denominationalViews": {
    "Católica": "Fe y obras cooperan",
    "Protestante": "Solo fe",
    "Ortodoxa": "Theosis"
  },
  "academicConsensus": "Alto consenso en definición básica"
}
`;

export async function theologicalAgent(state: IAgentState): Promise<Partial<IAgentState>> {
  const formattedPrompt = theologyPrompt
    .replace("{userInput}", state.userInput || "")
    .replace("{historicalContext}", JSON.stringify(state.historicalContext) || "")
    .replace("{linguisticAnalysis}", JSON.stringify(state.linguisticAnalysis) || "");

  try {
    const response = await llm.invoke(formattedPrompt);
    const content = response.content.toString();

    // Extraer JSON de la respuesta (maneja tanto JSON puro como markdown)
    let jsonContent = content;
    if (content.includes('```json')) {
      const match = content.match(/```json\n([\s\S]*?)\n```/);
      jsonContent = match ? match[1] : content;
    } else if (content.includes('```')) {
      const match = content.match(/```\n([\s\S]*?)\n```/);
      jsonContent = match ? match[1] : content;
    }

    const parsedResponse = JSON.parse(jsonContent);

    return {
      theologicalAnalysis: parsedResponse,
      references: [
        "Diccionario de Teología",
        "Teología Sistemática de Grudem",
        "Documentos del Concilio Vaticano II"
      ]
    };
  } catch (error) {
    console.log("Error en análisis teológico:", error);
    
  }
}