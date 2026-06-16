import {
  quickPromptsMap,
  fallbackQuickPrompts,
  storefrontRules,
  djangoRules,
  websocketRules,
  generalRules,
  defaultResponse,
  ChatResponseRule
} from '../data/chatResponses';

// Quick preloaded prompt suggestions based on selected project
export function getQuickPrompts(repoName: string): string[] {
  const name = repoName.toLowerCase();
  if (name.includes('storefront')) return quickPromptsMap.storefront;
  if (name.includes('django')) return quickPromptsMap.django;
  if (name.includes('websocket')) return quickPromptsMap.websocket;
  return fallbackQuickPrompts;
}

// Simulated replies from the Senior AI Architect based on repo content
export function getSimulatedResponse(text: string, repoName: string): { response: string; code?: string } {
  const query = text.toLowerCase();
  const name = repoName.toLowerCase();

  let activeRules: ChatResponseRule[] = [];
  if (name.includes('storefront')) {
    activeRules = storefrontRules;
  } else if (name.includes('django')) {
    activeRules = djangoRules;
  } else if (name.includes('websocket')) {
    activeRules = websocketRules;
  }

  // Find matching rule in current project rules or general rules
  const allRules = [...activeRules, ...generalRules];
  for (const rule of allRules) {
    if (rule.keywords.some((keyword) => query.includes(keyword))) {
      return { response: rule.response, code: rule.code };
    }
  }

  return defaultResponse;
}

