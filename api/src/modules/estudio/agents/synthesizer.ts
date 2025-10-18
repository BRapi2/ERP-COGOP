import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { IAgentState } from "../state";

const llm = new ChatGoogleGenerativeAI({
  apiKey: "AIzaSyAhzcNQwlAyMNHDk4XMUfDtU-iXUvV5RJ8",
  model: "gemini-1.5-flash",
  temperature: 0.3 // Creatividad controlada para la síntesis
});

const synthesizerPrompt = `
**Síntesis para Estudio Bíblico Profesional**

**Título:** {userInput}

**Investigación realizada:**
1. Contexto histórico: {historicalContext}
2. Análisis lingüístico: {linguisticAnalysis}
3. Perspectiva teológica: {theologicalAnalysis}

**Genera:**
1. Introducción atractiva
2. Exposición detallada (3-5 puntos principales)
3. Aplicación práctica contemporánea
4. Preguntas para reflexión grupal
5. Bosquejo para predicación

**Incluye:**
- Referencias cruzadas bíblicas
- Ilustraciones relevantes
- Advertencias sobre malas interpretaciones comunes

**Formato final:**
# [Título del Estudio]

## Introducción
[Texto]

## Desarrollo
1. [Punto principal]
   - Explicación
   - Soporte bíblico
   - Ilustración

## Aplicación
[Texto práctico]

## Recursos Adicionales
[Libros, artículos, etc.]
`;

export async function synthesizerAgent(state: IAgentState): Promise<Partial<IAgentState>> {
  const formattedPrompt = synthesizerPrompt
    .replace("{userInput}", state.userInput || "")
    .replace("{historicalContext}", JSON.stringify(state.historicalContext) || "")
    .replace("{linguisticAnalysis}", JSON.stringify(state.linguisticAnalysis) || "")
    .replace("{theologicalAnalysis}", JSON.stringify(state.theologicalAnalysis) || "");

  const response = await llm.invoke(formattedPrompt);
  return { 
    synthesis: response.content.toString(),
    references: [
      ...(state.references || []),
      "Cómo Leer la Biblia Libro por Libro - Fee & Stuart",
      "Hermenéutica - Berkhof"
    ]
  };
}