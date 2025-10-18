import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { app } from "./graph";
import { IAgentState } from "./state";

export async function buscarAgent(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Procesando consulta bíblica: "${req.url}"`);

    try {
        const body: any = await req.json();
        const userInput = body?.message;

        if (!userInput) {
            return {
                status: 400,
                jsonBody: { 
                    error: "Por favor proporcione una pregunta bíblica en el campo 'message'." 
                }
            };
        }

        const initialState: IAgentState = { 
            userInput, 
            messages: [],
            references: []
        };

        const result = await app.invoke(initialState);

        return {
            status: 200,
            jsonBody: {
                pregunta: userInput,
                estudioCompleto: result.synthesis,
                detalles: {
                    historico: result.historicalContext,
                    linguistico: result.linguisticAnalysis,
                    teologico: result.theologicalAnalysis
                },
                referencias: result.references
            }
        };

    } catch (error) {
        console.log(error)
        return {
            status: 500,
            jsonBody: { 
                error: "Error en la investigación bíblica",
                detalles: error instanceof Error ? error.message : String(error)
            }
        };
    }
}