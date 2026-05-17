import axios from "axios";

const fallbackPhrase = "Organização é o primeiro passo para a produtividade";

export const phraseService = {
  async getDailyPhrase(): Promise<string> {
    try {
      const adviceResponse = await axios.get(`https://api.adviceslip.com/advice?t=${Date.now()}`);
      const advice = adviceResponse.data.slip.advice;

      const translationResponse = await axios.get("https://api.mymemory.translated.net/get",
        {params: {
            q: advice,
            langpair: "en|pt-BR",
          }});

      return (translationResponse.data.responseData.translatedText ?? fallbackPhrase);
    } catch (error) {
      console.error("Erro ao carregar frase do dia:", error);
      return fallbackPhrase;
    }
  },
};