# PurrfectAI

This app implements a chatbot in Node.js using the OpenAI GPT API. 

The chatbot is capable of generating responses to user queries by utilizing the powerful language generation capabilities of the OpenAI GPT API.

![PurrfectAI](public/myChatGPT.jpeg)


## Installation

Clone repository
```
git clone https://github.com/massimobottelli/purrfectai.git
```

To run the script, you need to install Node.js and nodemon
```
apt install nodejs npm
npm init -y
sudo npm install -g nodemon
```

Install the dependencies:
``` 
npm install 

``` 

## Configuration
To use the OpenAI GPT API, you need to set up an account and obtain an API key at https://platform.openai.com/account/api-keys 

Once you have an API key, create .env file at the root of the project and add the following:

```
API_KEY=<your_api_key>
```

## Usage
To start the chatbot, run:

```
nodemon server.js
```

Once the application is running, open your browser to http://localhost:3000 to interact with the chatbot.


## Implementation
The chatbot is built using the OpenAI Node.js library that provides a convenient access to the OpenAI API from Node.js applications. 

