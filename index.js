const { Configuration, OpenAIApi } = require("openai");
const core = require('@actions/core');

(async () => {
    const apiKey = core.getInput('api-key');
    const query = core.getInput('query');
    const configuration = new Configuration({
        apiKey: apiKey
    });
    const openai = new OpenAIApi(configuration);
    const type = core.getInput('type');
    if (type === "image") {
        const response = await openai.createImage({
            prompt: query,//"a sad cartoon penguin in the style of family guy",
            n: 1,
            size: core.getInput('image_size'),
        });
        core.setOutput("output", response.data.data[0].url);
    } else if (type === "text") {
        const response = await openai.createCompletion({
            prompt: query,
            model: core.getInput('model'),
            n: 1,
            temperature: 0,
            max_tokens: 60,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0
        });
        core.setOutput("output", response.data.choices[0].text);
    }
})()