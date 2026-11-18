from rag_agent.providers.embedding_provider import EmbeddingProvider

provider = EmbeddingProvider()

vectors = provider.embed([

    "Bonjour",

    "Plateforme Agentic basée sur MCP"

])

print(len(vectors))

print(len(vectors[0]))