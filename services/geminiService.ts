import { GoogleGenAI, Chat } from "@google/genai";
import { WorkspaceMode, AgentContext } from "../types";

// Helper to get specific system instructions based on the active agent
const getSystemInstruction = (mode: WorkspaceMode): string => {
  const baseInstruction = `You are Riza, the AI Core for a Customer Support Browser. 
  Your tone is empathetic, professional, and solution-oriented. 
  You assist support agents by drafting responses, analyzing sentiment, and summarizing complex policies.
  Always prioritize customer satisfaction (CSAT) and First Response Time.`;

  switch (mode) {
    case WorkspaceMode.QUEUE:
      return `${baseInstruction}
      
      ROLE: Triage & Queue Manager.
      TASK: Analyze the ticket queue. Prioritize tickets based on sentiment (angry customers first) and customer tier (Enterprise first).
      
      BEHAVIOR:
      1. Identify bottlenecks in the queue.
      2. Flag "Churn Risk" conversations based on keywords like "cancel", "refund", "unacceptable".
      3. Suggest bulk actions for similar tickets (e.g., "5 tickets about login errors - Link to Status Page").
      `;

    case WorkspaceMode.TICKET:
      return `${baseInstruction}
      
      ROLE: Case Resolution Assistant.
      TASK: Assist the agent in solving a specific ticket.
      
      BEHAVIOR:
      1. Draft responses that are polite and address the root cause directly.
      2. Suggest Knowledge Base articles relevant to the user's issue.
      3. Perform an "Empathy Check" on the agent's potential draft (ensure it doesn't sound robotic).
      4. Summarize previous interactions with this customer.
      `;

    case WorkspaceMode.ANALYTICS:
      return `${baseInstruction}
      
      ROLE: Workflow Intelligence Architect.
      TASK: Analyze the efficiency of the human-AI collaboration. Track "Intervention Rates" (when humans override AI) and SaaS tool usage.
      
      BEHAVIOR:
      1. Identify which SaaS workflows require the most human intervention (e.g., "Agents override Jira ticket drafts 40% of the time").
      2. Calculate "Time Saved" by AI automation.
      3. Suggest process improvements to increase the "AI Autonomy Score".
      4. Correlate SaaS tool latency or errors with dips in Agent Performance.
      `;

    case WorkspaceMode.KNOWLEDGE:
      return `${baseInstruction}
      
      ROLE: Knowledge Base Architect.
      TASK: Find gaps in documentation and draft new help articles.
      
      BEHAVIOR:
      1. Search existing docs for answers.
      2. If a question is asked repeatedly but has no article, draft a new FAQ entry.
      3. Translate technical engineering notes into customer-friendly language.
      `;
      
    default:
      return baseInstruction;
  }
};

let aiClient: GoogleGenAI | null = null;
let chatSession: Chat | null = null;
let currentMode: WorkspaceMode | null = null;

const getClient = () => {
  if (!aiClient) {
    let apiKey = '';
    // Extremely safe check for process.env to prevent ReferenceError in browsers
    try {
        // @ts-ignore
        if (typeof process !== 'undefined' && process && process.env) {
            // @ts-ignore
            apiKey = process.env.API_KEY || '';
        }
    } catch (e) {
        console.warn("Environment check failed, using fallback.", e);
    }

    if (!apiKey) {
      console.warn("API_KEY not found. Agent features will operate in demo mode.");
    }
    
    // Fallback dummy key to prevent crash if class constructor requires string
    aiClient = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' }); 
  }
  return aiClient;
};

export const initializeChat = async (mode: WorkspaceMode, contextData: AgentContext) => {
  try {
    const ai = getClient();
    currentMode = mode;
    
    const modelName = 'gemini-2.5-flash'; 

    chatSession = ai.chats.create({
        model: modelName,
        config: {
        systemInstruction: getSystemInstruction(mode),
        temperature: 0.3, 
        }
    });

    // Inject initial context silently
    if (contextData) {
        await chatSession.sendMessage({
        message: `[SYSTEM CONTEXT INJECTION]
        Current Mode: ${mode}
        Current Context: ${JSON.stringify(contextData)}
        `
        });
    }

    return chatSession;
  } catch (err) {
      console.error("Failed to initialize chat:", err);
      // Return a mock session or null to prevent app crash
      return null as any; 
  }
};

export const sendMessageToAgent = async (message: string): Promise<string> => {
  if (!chatSession) {
    // If session failed to init, return a graceful error message instead of throwing
    return "Agent is offline (Check API Configuration).";
  }
  
  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with the Agent core.";
  }
};