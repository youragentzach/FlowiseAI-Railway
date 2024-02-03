const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/chatbot', async (req, res) => {
  const { question } = req.body;
  try {
    const flowiseResponse = await axios.post(process.env.FLOWISE_URL, {
      question: question,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.FLOWISE_API_KEY}`
      }
    });
    res.json(flowiseResponse.data);
  } catch (error) {
    console.error('Error contacting Flowise:', error);
    res.status(500).send('Failed to get response from Flowise');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
