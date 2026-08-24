const openRouterClient = require("./openrouter.client");

const openRouterConfig = require("../../shared/config/openrouter");

const {
    OPENROUTER_ENDPOINTS,
    OPENROUTER_ROLES,
} = require("./openrouter.constants");

class OpenRouterService {
    async chat({
        messages,
        model = openRouterConfig.model,
        temperature = 0.7,
        maxTokens,
    }) {
        if (!Array.isArray(messages) || messages.length === 0) {
            throw new Error(
                "OpenRouter messages are required"
            );
        }

        const payload = {
            model,
            messages,
            temperature,
        };

        if (maxTokens !== undefined) {
            payload.max_tokens = maxTokens;
        }

        return await openRouterClient.post(
            OPENROUTER_ENDPOINTS.CHAT_COMPLETIONS,
            payload
        );
    }

    async generateText({
        prompt,
        systemPrompt,
        model = openRouterConfig.model,
        temperature = 0.7,
        maxTokens,
    }) {
        if (!prompt) {
            throw new Error(
                "OpenRouter prompt is required"
            );
        }

        const messages = [];

        if (systemPrompt) {
            messages.push({
                role: OPENROUTER_ROLES.SYSTEM,
                content: systemPrompt,
            });
        }

        messages.push({
            role: OPENROUTER_ROLES.USER,
            content: prompt,
        });

        const response = await this.chat({
            messages,
            model,
            temperature,
            maxTokens,
        });

        return this.extractText(response);
    }

    extractText(response) {
        return (
            response?.choices?.[0]?.message?.content ||
            ""
        );
    }
}

module.exports = new OpenRouterService();