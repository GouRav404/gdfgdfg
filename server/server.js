import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
import fs from 'fs'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    
    if (prompt.includes("name") || prompt.includes("introduce yourself")) {
      data.prompt = "My name is Sriman"
    }

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0, 
      max_tokens: 3000,
      top_p: 1, 
      frequency_penalty: 0.5, 
      presence_penalty: 0, 
    });

    // Save the input data to a file
    fs.appendFile('input.txt', `${prompt}\n`, (err) => {
      if (err) throw err;
      console.log(`Saved input data to file: ${prompt}`);
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
