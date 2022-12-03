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
        prompt: query,//"a sad cartoon penguin in the style of family guy",
        n: 1,
        size: "256x256",
    });
    core.setOutput("url", response.data.data[0].url);
    const result = esult
})()