from abc import ABC, abstractmethod


class LLMInterface(ABC):
    """
    Interface commune pour tous les modèles de langage.
    """

    @abstractmethod
    def generate(
        self,
        prompt: str,
        context: str,
    ) -> str:
        pass