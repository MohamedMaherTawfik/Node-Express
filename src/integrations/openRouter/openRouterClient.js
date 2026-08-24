const axios = require("axios");

const openRouterConfig = require("../../shared/config/openrouter");

class OpenRouterClient {
    constructor() {
        if (!openRouterConfig.apiKey) {
            throw new Error(
                "OPENROUTER_API_KEY is not configured"
            );
        }

        this.client = axios.create({
            baseURL: openRouterConfig.baseUrl,

            timeout: openRouterConfig.timeout,

            headers: {
                Authorization: `Bearer ${openRouterConfig.apiKey}`,
                "Content-Type": "application/json",

                ...(openRouterConfig.appUrl && {
                    "HTTP-Referer": openRouterConfig.appUrl,
                }),

                ...(openRouterConfig.appName && {
                    "X-Title": openRouterConfig.appName,
                }),
            },
        });
    }

    async post(endpoint, data) {
        try {
            const response = await this.client.post(
                endpoint,
                data
            );

            return response.data;
        } catch (error) {
            const status = error.response?.status;
            const data = error.response?.data;

            console.error("OpenRouter API Error:", {
                status,
                data,
                message: error.message,
            });

            throw error;
        }
    }
}

module.exports = new OpenRouterClient();