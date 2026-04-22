const axios = require("axios");
require("dotenv").config();

async function summarizeReviews(reviews) {
  if (!reviews || reviews.length === 0) {
    return "No reviews available.";
  }

  const prompt = `
Analyze these campground reviews:

${reviews.join("\n")}

Give:
⭐ Positives
⚠️ Negatives
👤 Best for
`;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error(err.response?.data || err.message);
    return "AI error";
  }
}

module.exports = { summarizeReviews };
