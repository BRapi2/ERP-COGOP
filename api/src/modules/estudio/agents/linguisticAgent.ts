import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { IAgentState } from "../state";

const llm = new ChatGoogleGenerativeAI({
  apiKey: "AIzaSyAhzcNQwlAyMNHDk4XMUfDtU-iXUvV5RJ8",
  model: "gemini-1.5-flash",
  temperature: 0
});

const linguisticPrompt = `
**Análisis Lingüístico Profesional**

**Texto a analizar:** {userInput}

**Proceso requerido:**
1. Identificar términos clave en hebreo/griego
2. Proporcionar referencia Strong para cada término
3. Análisis semántico (significado original, evolución)
4. Uso en la LXX (Septuaginta) si aplica
5. Campos semánticos relacionados

**IMPORTANTE:** Devuelve SOLAMENTE un JSON válido con el siguiente formato, sin texto adicional:

{
  "originalTerms": [
    {
      "term": "[palabra original]",
      "transliteration": "[transliteración]",
      "strong": "[referencia Strong]",
      "basicMeaning": "[significado básico]",
      "semanticEvolution": "[evolución del significado]"
    }
  ],
  "comparativeAnalysis": "[análisis comparativo entre términos]"
}
`;

export async function linguisticAgent(state: IAgentState): Promise<Partial<IAgentState>> {
  const formattedPrompt = linguisticPrompt.replace("{userInput}", state.userInput || "");
  
  try {
    const response = await llm.invoke(formattedPrompt);
    const content = response.content.toString();
    
    // Extraer solo el JSON si hay texto adicional
    const jsonStart = content.indexOf('{');
    const jsonEnd = content.lastIndexOf('}') + 1;
    const jsonContent = content.slice(jsonStart, jsonEnd);
    
    const parsedResponse = JSON.parse(jsonContent);
    
    return {
      linguisticAnalysis: parsedResponse,
      references: [
        "Diccionario Strong de Palabras Hebreas y Griegas",
        "Lexicón Griego-Español del Nuevo Testamento",
        "Theological Dictionary of the New Testament (Kittel)"
      ]
    };
  } catch (error) {
    console.log("Error parsing linguistic analysis:", error);
  }
}