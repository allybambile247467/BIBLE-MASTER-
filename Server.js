const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.json({
    message: "Bible Master API fonctionne !",
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Le message est obligatoire.",
      });
    }

    const response = await client.responses.create({
      model: "gpt-5.5",
      instructions:
        "Tu es l'assistant biblique de Bible Master. Réponds en français de manière claire, respectueuse et utile. Aide les utilisateurs à comprendre la Bible, préparer des enseignements et étudier les textes bibliques. Ne présente pas tes réponses comme remplaçant un pasteur, un enseignant ou un conseiller qualifié.",
      input: message,
    });

    res.json({
      response: response.output_text,
    });
  } catch (error) {
    console.error("Erreur OpenAI :", error);

    res.status(500).json({
      error: "Une erreur est survenue avec l'assistant Bible Master.",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Bible Master API démarrée sur le port ${PORT}`);
});
