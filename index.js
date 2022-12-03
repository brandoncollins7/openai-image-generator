const { Configuration, OpenAIApi } = require("openai");
const core = require('@actions/core');

(async () => {
    const apiKey = core.getInput('api-key');
    const query = core.getInput('query');
    const configuration = new Configuration({
        apiKey: apiKey
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
        prompt: query,
        n: 1,
        size: core.getInput('size'),
    });
    core.setOutput("url", response.data.data[0].url);
})()