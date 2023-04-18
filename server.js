const express = require('express');
const app = express();
const port = 3000;

let history = [];
let response = '';

// initialize OpenAI API
const {
    Configuration,
    OpenAIApi
} = require("openai");
const readlineSync = require("readline-sync");
require("dotenv").config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// initialize parser for submitted data 
const bodyParser = require('body-parser');
const {
    resolve
} = require('path');
app.use(bodyParser.urlencoded({
    extended: true
}));

// Set Pug as the view engine
app.set('view engine', 'pug');

// Serve the static files in the public directory
app.use(express.static('public'));

// Render the index page with a form to enter the name
app.get('/', (req, res) => {
    res.render('index');
});

// Handle clear history
app.post('/clear', (req, res) => {
    history = [];
    response = [];
    res.render('index');
    console.log("reset chat"); // debug
});

// Handle the form submission and render the greeting page
app.post('/', (req, res) => {
    const user_input = req.body.prompt;

    console.log(user_input); // debug

    // use the prompt with chatbot
    if (user_input != "") {
        (async () => {
            const messages = [];
            for (const [input_text, completion_text] of history) {
                messages.push({
                    role: "user",
                    content: input_text
                });
                messages.push({
                    role: "assistant",
                    content: completion_text
                });
            }

            messages.push({
                role: "user",
                content: user_input
            });

            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: messages,
            });

            const completion_text = completion.data.choices[0].message.content;
            history.push([user_input, completion_text]);

            console.log(completion_text); // debug

            // Format questions and answers
            response += `<div class="question"><p>${user_input}</p></div>\n\n`;
            response += `<div class="answer"><p>${completion_text}</p></div>\n\n`;

            response = response.replace(/\n/g, "<br>");

            // handle source code in answer
            const firstIndex = response.indexOf('```');
            const secondIndex = response.indexOf('```', firstIndex + 1);

            if (firstIndex !== -1 && secondIndex !== -1) {
                const before = response.substring(0, firstIndex);
                let code = response.substring(firstIndex + 3, secondIndex);
                const after = response.substring(secondIndex + 3);

                code = code.replace(/<br>/g, '\n');
                code = code.replace(/</g, '&lt;');
                code = code.replace(/>/g, '&gt;');

                response = `${before}<pre><code>${code}</code></pre>${after}`;
            }
            
            // render response in frontend
            res.render('index', {
                response: response
            });
        })();
    } else 
    {
        // empty page
        res.render('index', {});
    };
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});