const chatLog = document.getElementById("chatLog");
const userInput = document.getElementById("userInput");

// Function to append a message to the chat log
function appendMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatLog.appendChild(messageElement);
}

// Function to send a user message to the AI chatbot
function sendMessage() {
  const message = userInput.value.trim();
  if (message !== "") {
    appendMessage("You", message);
    userInput.value = ""; // Clear input field
    getChatbotResponse(message);
  }
}

// Function to get a response from the AI chatbot
async function getChatbotResponse(userMessage) {
  appendMessage("AI", "Thinking...");
  
  // Replace 'YOUR_API_KEY' with your actual OpenAI API key
  const apiKey = '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';
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };

  const requestBody = JSON.stringify({
    prompt: userMessage,
    max_tokens: 150
  });

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: requestBody
    });

    const data = await response.json();
    const chatbotResponse = data.choices[0].text.trim();
    appendMessage("AI", chatbotResponse);
  } catch (error) {
    appendMessage("AI", "Sorry, there was an error processing your request.");
    console.error(error);
  }
}

// Handle user input on Enter key press
userInput.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});