import smtplib
from email.message import EmailMessage

from app.core.config import settings


class EmailService:
    """
    Service responsable de l'envoi des emails.
    """

    @staticmethod
    def send_email(
        to_email: str,
        subject: str,
        body: str
    ) -> bool:

        try:

            message = EmailMessage()

            message["Subject"] = subject
            message["From"] = (
                f"{settings.SMTP_FROM_NAME} "
                f"<{settings.SMTP_FROM_EMAIL}>"
            )
            message["To"] = to_email

            message.set_content(body)

            with smtplib.SMTP(
                settings.SMTP_HOST,
                settings.SMTP_PORT
            ) as smtp:

                smtp.starttls()

                smtp.login(
                    settings.SMTP_USERNAME,
                    settings.SMTP_PASSWORD
                )

                smtp.send_message(message)

            return True

        except Exception as e:

            print(e)

            return False

    @staticmethod
    def send_activation_email(
        first_name: str,
        email: str,
        temporary_password: str,
        activation_token: str
    ) -> bool:
        """
        Envoie l'email d'activation d'un nouvel utilisateur.
        """

        activation_link = (
    f"http://localhost:5173/activate/"
    f"{activation_token}"
)

        subject = "Activation de votre compte - Plateforme IA Douane"

        body = f"""
Bonjour {first_name},

Votre compte a été créé avec succès sur la Plateforme IA Douane.

Vos informations de connexion :

Email :
{email}

Mot de passe temporaire :
{temporary_password}

Pour activer votre compte, cliquez sur le lien suivant :

{activation_link}

Ce lien est valable pendant 24 heures.

Après votre première connexion, nous vous demanderons de choisir votre propre mot de passe.

Cordialement,

Plateforme IA Douane
"""

        return EmailService.send_email(
            to_email=email,
            subject=subject,
            body=body
        )