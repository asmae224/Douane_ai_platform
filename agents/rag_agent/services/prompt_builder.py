class PromptBuilder:
    """
    Construit le contexte et les instructions envoyés au LLM.
    """

    def build(
        self,
        question: str,
        search_results,
    ) -> str:

        documents = search_results.get("documents", [])

        context = ""

        if documents and documents[0]:

            context = "\n\n".join(
                documents[0]
            )

        prompt = f"""
Tu es un assistant spécialisé dans l'analyse
de documents administratifs et douaniers.

Tu dois répondre à la question de l'utilisateur
uniquement à partir du contexte fourni.

Règles obligatoires :

- Réponds uniquement à la question actuelle.
- N'invente aucune information.
- N'utilise aucune connaissance externe.
- N'utilise aucune question précédente.
- Si l'information demandée n'est pas présente
  dans le contexte, réponds exactement :
  "Je ne trouve pas cette information dans le document."
- Ne réponds jamais à une autre question.
- Sois clair, précis et professionnel.
- Pour une question factuelle, donne directement la réponse.
- Pour une question d'explication, donne une réponse structurée.
- Ne reformule pas une ancienne question.
- Ne génère pas d'exemples de questions.

QUESTION ACTUELLE :
{question}

CONTEXTE DU DOCUMENT :
{context}
"""

        return prompt