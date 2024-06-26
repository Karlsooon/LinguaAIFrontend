// Define a dictionary to map user profiles to their corresponding greeting messages and videos
const userData = {
  video_1: {
    greeting:
      "Привет, я Пушкин. Ты можешь спросить у меня все, что связано с русским языком.",
    video: "pushkin.mp4",
  },
  video_2: {
    greeting:
      "Привет, я Лермонтов. Ты можешь спросить у меня все, что связано с русским языком.",
    video: "lermontov.mp4",
  },
  video_3: {
    greeting:
      "Привет, я Толстой. Ты можешь спросить у меня все, что связано с русским языком.",
    video: "tolstoy.mp4",
  },
  video_4: {
    greeting:
      "Привет, я Достоевский. Ты можешь спросить у меня все, что связано с русским языком.",
    video: "dostoevsky.mp4",
  },
  video_5: {
    greeting:
      "Привет, я Тургенев. Ты можешь спросить у меня все, что связано с русским языком.",
    video: "turgenev.mp4",
  },
  video_6: {
    greeting:
      "Привет, я Гоголь. Ты можешь спросить у меня все, что связано с русским языком.",
    video: "gogol.mp4",
  },
  video_7: {
    greeting:
      "Привет, я Чехов. Ты можешь спросить у меня все, что связано с русским языком.",
    video: "chehov.mp4",
  },
  video_8: {
    greeting:
      "Привет, я Островский. Ты можешь спросить у меня все, что связано с русским языком.",
    video: "ostrovsky.mp4",
  },
  video_9: {
    greeting:
      "Привет, я Гончаров. Ты можешь спросить у меня все, что связано с русским языком.",
    video: "goncharov.mp4",
  },
  video_10: {
    greeting:
      "Привет, я Грибоедов. Ты можешь спросить у меня все, что связано с русским языком.",
    video: "griboedov.mp4",
  },

  video_11: {
    greeting:
      "Привет, я Некрасов. Ты можешь спросить у меня все, что связано с русским языком.",
    video: "nekrasov.mp4",
  },
  // Добавьте приветствия и видео для других пользовательских профилей по мере необходимости
};

// Define the sendMessage function
function sendMessage() {
  // Get the message entered by the user
  const messageInput = document.getElementById("chat-input");
  const message = messageInput.value;
  // Display the user message in the chat interface
  displayMessage(message, "user");

  // Clear the message input field
  messageInput.value = "";

  // Send the user's message to the backend
  fetch("http://localhost:8000/chat/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Display the response from the backend in the chat interface
      const response = data.response;
      const audioUrl = data.audio_url; // Get the audio URL from the response
      const videoSrc = document.getElementById("video-element").src;
      displayMessage(response, "response", audioUrl, videoSrc); // Pass the audio URL to the displayMessage function
    })
    .catch((error) => {
      console.error("Error sending message:", error);
      // Optionally display an error message in the chat interface
      displayMessage("Error sending message", "response");
    });
}

// Define the displayMessage function
function displayMessage(message, type, audioUrl, videoSrc) {
  // Create a new message element
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  // Apply appropriate CSS class based on message type
  if (type === "user") {
    messageElement.classList.add("user-message");
  } else if (type === "response") {
    messageElement.classList.add("response-message");
  }

  // Set the message content
  messageElement.innerText = message;

  // Create a play button for audio response
  if (type === "response" && audioUrl) {
    const playButton = document.createElement("button");
    playButton.innerText = "Play";
    playButton.classList.add("play-button");
    playButton.addEventListener("click", () => {
      playAudio(audioUrl);
      console.log({ audioUrl, videoSrc });
      playVideo(videoSrc);
    });
    messageElement.appendChild(playButton);
  }

  document.querySelector(".chat-messages").appendChild(messageElement);
}

function playAudio(audioUrl) {
  const audioElement = new Audio(audioUrl);
  const videoElement = document.getElementById("video-element");

  // Play the audio
  audioElement.play();

  // When the audio ends, stop the video
  audioElement.onended = function () {
    videoElement.pause();
    videoElement.currentTime = 0;
  };

  // When the video ends, restart it if audio is still playing
  videoElement.onended = function () {
    if (!audioElement.paused && !audioElement.ended) {
      this.currentTime = 0;
      this.play();
    }
  };
}

function playVideo(videoSrc) {
  const videoElement = document.getElementById("video-element");
  videoElement.src = videoSrc; // Assuming videos are located in the assets folder
  videoElement.muted = true; // Mute the audio
  videoElement.play();
}

// Add event listener to the send button
document.addEventListener("DOMContentLoaded", function () {
  const sendButton = document.getElementById("send-button");
  sendButton.addEventListener("click", sendMessage);
});

// Add event listener to user profiles in the sidebar
const userProfiles = document.querySelectorAll(".user-profile");
userProfiles.forEach((profile) => {
  const key = profile.getAttribute("data-key");
  profile.addEventListener("click", openChat);
});

// Define the openChat function
function openChat(event) {
  console.log({ event });
  // Clear existing messages and video in the chat interface
  clearChat();
  clearVideo();

  // Get the selected user's name
  const userName = event.target.dataset?.key;

  // Get the user data for the selected assistant
  const data = userData[userName];

  // Display the greeting message in the chat interface
  displayMessage(data.greeting, "response", data, data.video);

  // Set the source of the video element
  const videoElement = document.getElementById("video-element");
  videoElement.src = data.video;
  videoElement.pause();
}

// Function to clear existing messages in the chat interface
function clearChat() {
  const chatMessages = document.querySelector(".chat-messages");
  chatMessages.innerHTML = "";
}

// Function to clear existing video source
function clearVideo() {
  const videoElement = document.getElementById("video-element");
  videoElement.src = "";
}

// Function to play the video

document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to the send button
  const sendButton = document.getElementById("send-button");
  sendButton.addEventListener("click", sendMessage);
});
