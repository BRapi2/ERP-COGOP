import { StateGraph, Annotation } from "@langchain/langgraph";
import { BaseMessage } from "@langchain/core/messages";
import { orchestratorAgent } from "./agents/orchestrator";
import { historicalAgent } from "./agents/historicalAgent";
import { linguisticAgent } from "./agents/linguisticAgent";
import { theologicalAgent } from "./agents/theologicalAgent";
import { synthesizerAgent } from "./agents/synthesizer";

const stateSchema = Annotation.Root({
  userInput: Annotation<string | undefined>(),
  researchPlan: Annotation<string | undefined>(),
  historicalContext: Annotation<any | undefined>(),
  linguisticAnalysis: Annotation<any | undefined>(),
  theologicalAnalysis: Annotation<any | undefined>(),
  synthesis: Annotation<string |undefined>(),
  references: Annotation<string[]>({
    value: (prev: string[], next: string[]) => [...prev, ...next],
    default: () => [],
  }),
  messages: Annotation<BaseMessage[]>({
    value: (left: BaseMessage[], right: BaseMessage[]) => left.concat(right),
    default: () => [],
  }),
});

const workflow = new StateGraph(stateSchema)
.addNode("orchestrator", orchestratorAgent)
.addNode("historical_research", historicalAgent)
.addNode("linguistic_analysis", linguisticAgent)
.addNode("theological_analysis", theologicalAgent)
.addNode("synthesizer", synthesizerAgent)

workflow.addEdge("__start__", "orchestrator");
workflow.addEdge("orchestrator", "linguistic_analysis");
workflow.addEdge("linguistic_analysis", "historical_research");
workflow.addEdge("historical_research", "theological_analysis");
workflow.addEdge("theological_analysis", "synthesizer");
workflow.addEdge("synthesizer", "__end__");

export const app = workflow.compile();