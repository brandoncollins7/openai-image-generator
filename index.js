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
            model: "text-davinci-003",
            prompt: query,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });
        core.setOutput("output", response.data.choices[0].text);
    }
})()

const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "give me one sentence of words of encouragement for trying better next time.\n\nNo matter how many times you fail, keep trying and you will eventually succeed.",
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
});