import re


class TextCleaner:
    """
    Responsable du nettoyage du texte extrait des documents.
    """

    def clean(self, text: str) -> str:
        """
        Nettoie le texte avant son indexation.

        Args:
            text: texte brut extrait du PDF

        Returns:
            texte nettoyé
        """

        # Uniformiser les retours à la ligne
        text = text.replace("\r\n", "\n")

        # Supprimer les espaces multiples
        text = re.sub(r"[ \t]+", " ", text)

        # Supprimer les lignes vides répétées
        text = re.sub(r"\n{3,}", "\n\n", text)

        # Supprimer les espaces au début/fin
        text = text.strip()

        return text