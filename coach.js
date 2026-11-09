
/* ==========================================
   CALORIETRACK - COACH IA
   Chat conectado al backend Flask
========================================== */

(() => {
  "use strict";

  const API_URL =
    "https://contador-calorias-yiqx.onrender.com";

  const MAX_HISTORY = 12;
  const TIMEOUT_MS = 45000;

  const messages = document.getElementById("coachMessages");
  const form = document.getElementById("coachForm");
  const input = document.getElementById("coachInput");
  const sendButton = document.getElementById("coachSend");
  const clearButton = document.getElementById("coachClear");
  const status = document.getElementById("coachStatus");
  const suggestions = document.querySelectorAll(
    ".coach-suggestion"
  );

  if (!messages || !form || !input || !sendButton) {
    console.warn("Coach IA: faltan elementos HTML.");
    return;
  }

  let history = [];
  let busy = false;
  let controller = null;
  let requestId = 0;

  const initialHTML = messages.innerHTML;

  function setStatus(text) {
    if (status) status.textContent = text;
  }

  function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
  }

  function setBusy(value) {
    busy = value;
    sendButton.disabled = value;
    input.disabled = value;

    suggestions.forEach(button => {
      button.disabled = value;
    });
  }

  function addMessage(role, content) {
    const wrapper = document.createElement("div");

    wrapper.className =
      "coach-message " +
      (role === "user"
        ? "coach-message-user"
        : "coach-message-ai");

    if (role === "assistant") {
      const avatar = document.createElement("div");
      avatar.className = "coach-message-avatar";
      avatar.textContent = "✦";
      wrapper.appendChild(avatar);
    }

    const bubble = document.createElement("div");
    bubble.className = "coach-bubble";

    // textContent evita interpretar HTML enviado
    // por el usuario o devuelto por la IA.
    bubble.textContent = content;

    wrapper.appendChild(bubble);
    messages.appendChild(wrapper);

    scrollToBottom();
    return wrapper;
  }

  async function sendMessage(text) {
    const question = String(text || "").trim();

    if (!question || busy) return;

    const previousHistory = history.slice(-MAX_HISTORY);

    addMessage("user", question);
    input.value = "";
    setBusy(true);
    setStatus("El Coach IA está pensando...");

    const currentRequest = ++requestId;
    const abortController = new AbortController();
    controller = abortController;

    const timeout = setTimeout(() => {
      abortController.abort();
    }, TIMEOUT_MS);

    try {
      const response = await fetch(
        `${API_URL}/api/coach`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: question,
            history: previousHistory
          }),
          signal: abortController.signal
        }
      );

      let data = {};

      try {
        data = await response.json();
      } catch {
        throw new Error(
          "El servidor devolvió una respuesta inválida."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.message ||
          `Error del servidor (${response.status}).`
        );
      }

      const answer = data.reply || data.response;

      if (typeof answer !== "string" || !answer.trim()) {
        throw new Error(
          "El Coach IA no devolvió una respuesta."
        );
      }

      if (currentRequest !== requestId) return;

      addMessage("assistant", answer);

      history.push(
        { role: "user", content: question },
        { role: "assistant", content: answer }
      );

      history = history.slice(-MAX_HISTORY);

      setStatus("");

    } catch (error) {
      if (currentRequest !== requestId) return;

      const message = error.name === "AbortError"
        ? "La consulta tardó demasiado. Intentá nuevamente."
        : error.message;

      addMessage(
        "assistant",
        "No pude completar la consulta. " + message
      );

      setStatus(
        "No se pudo conectar con el Coach IA."
      );

      console.error("Coach IA:", error);

    } finally {
      clearTimeout(timeout);

      if (currentRequest === requestId) {
        controller = null;
        setBusy(false);
        input.focus();
      }
    }
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    sendMessage(input.value);
  });

  input.addEventListener("keydown", event => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.isComposing
    ) {
      event.preventDefault();
      sendMessage(input.value);
    }
  });

  suggestions.forEach(button => {
    button.addEventListener("click", () => {
      const question = button.dataset.coachPrompt;
      sendMessage(question);
    });
  });

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      requestId++;

      if (controller) {
        controller.abort();
        controller = null;
      }

      history = [];
      messages.innerHTML = initialHTML;
      input.value = "";
      setStatus("");
      setBusy(false);
      input.focus();
    });
  }

  console.log("Coach IA: interfaz inicializada.");
})();
