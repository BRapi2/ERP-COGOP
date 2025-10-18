import { BaseMessage } from "@langchain/core/messages";

export interface IAgentState {
  userInput: string;
  researchPlan?: string;
  historicalContext?: {
    period: string;
    location: string;
    rulers: string;
    archaeologicalEvidence: string;
  };
  linguisticAnalysis?: {
    originalTerms: string[];
    strongReferences: string[];
    semanticEvolution: string;
  };
  theologicalAnalysis?: {
    doctrines: string[];
    denominationalViews: Record<string, string>;
  };
  synthesis?: string;
  references?: string[];
  messages: BaseMessage[];
}