
import httpx

from common.interfaces.llm_interface import LLMInterface


class OllamaAdapter(LLMInterface):

    def __init__(
        self,
        base_url: str,
        model: str,
    ):
        self.base_url = base_url.rstrip("/")
        self.model = model

    # =====================================================
    # Génération de réponse
    # =====================================================

    def generate(
        self,
        prompt: str,
        context: str,
    ) -> str:

        try:

            response = httpx.post(
                f"{self.base_url}/api/chat",
                json={
                    "model": self.model,
                    "messages": [
                        {
                            "role": "system",
                            "content": context,
                        },
                        {
                            "role": "user",
                            "content": prompt,
                        },
                    ],
                    "stream": False,
                    "options": {
                        "temperature": 0.2,
                        "num_predict": 800,
                    },
                },
                timeout=180.0,
            )

            response.raise_for_status()

            return response.json()["message"]["content"]

        except Exception:
            import traceback
            traceback.print_exc()
            raise
