const openRouterConfig = {
    apiKey: process.env.OPENROUTER_API_KEY,

    baseUrl:
        process.env.OPENROUTER_BASE_URL ||
        "https://openrouter.ai/api/v1",

    model:
        process.env.OPENROUTER_MODEL ||
        "openai/gpt-4o-mini",

    timeout: Number(process.env.OPENROUTER_TIMEOUT) || 30000,

    appName:
        process.env.OPENROUTER_APP_NAME ||
        "Node Express Starter Kit",

    appUrl:
        process.env.OPENROUTER_APP_URL ||
        "http://localhost:3000",
};

module.exports = openRouterConfig;