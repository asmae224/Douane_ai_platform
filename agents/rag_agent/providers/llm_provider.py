from rag_agent.providers.provider_factory import ProviderFactory


class LLMProvider:

    def __init__(self):

        self.llm = ProviderFactory.get_llm_provider()

    def generate(
        self,
        prompt: str,
        context: str,
    ) -> str:

        return self.llm.generate(

            prompt=prompt,

            context=context,

        )