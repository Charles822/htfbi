#!/usr/bin/env python3
import os
import sys
import json
from groq import Groq
from decouple import config
from django.conf import settings
import django


# Add the project root to sys.path
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
sys.path.append(project_root)

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'htfbi_backend.settings')
django.setup()

from contents.models import Transcript

# Sample transcript JSON
# #transcript_data = [
#     {"text": "[Musique]", "start": 0.0, "duration": 3.58},
#     {"text": "[Musique]", "start": 6.73, "duration": 4.75},
#     {"text": "je me suis rendu à bal pendant quelques", "start": 10.0, "duration": 3.2},
#     {"text": "jours et non j'ai pas fait que Migner", "start": 11.48, "duration": 3.0},
#     {"text": "dans des fontaines ou passer mes", "start": 13.2, "duration": 2.919},
#     {"text": "journées sur des bateaux j'ai aussi pris", "start": 14.48, "duration": 2.799},
#     {"text": "le temps d'organiser un événement dans", "start": 16.119, "duration": 2.401},
#     {"text": "notre villa pour rencontrer les", "start": 17.279, "duration": 3.321},
#     {"text": "entrepreneurs locaux et leur demander ce", "start": 18.52, "duration": 3.36},
#     {"text": "qu'ils font dans la vie on a donc", "start": 20.6, "duration": 2.8},
#     {"text": "rassemblé de nombreux entrepreneurs", "start": 21.88, "duration": 3.96},
#     {"text": "solopreneurs mais aussi créateurs pour", "start": 23.4, "duration": 4.959},
#     {"text": "voir leur parcours leur défi leur succès", "start": 25.84, "duration": 4.12},
#     {"text": "et c'était incroyablement en", "start": 28.359, "duration": 2.801},
#     {"text": "enrichissant dans cette vidéo je vais", "start": 29.96, "duration": 2.92},
#     {"text": "vous présenter le profil type de ces", "start": 31.16, "duration": 3.84},
#     {"text": "Français qui sont expatriés sur cet le", "start": 32.88, "duration": 3.48},
#     {"text": "paradisiaque de manière à ce que vous", "start": 35.0, "duration": 3.079},
#     {"text": "puissiez en tirer de l'inspiration et", "start": 36.36, "duration": 3.32},
#     {"text": "des informations clés si aujourd'hui", "start": 38.079, "duration": 3.921},
#     {"text": "vous voulez vivre à l'étranger moi c'est", "start": 39.68, "duration": 4.84},
#     {"text": "Florient ça fait 4 ans et quelques que", "start": 42.0, "duration": 5.039},
#     {"text": "j'habite à Bali je suis éditeur de site", "start": 44.52, "duration": 4.719},
#     {"text": "depuis maintenant plus de de 8 ans j'ai", "start": 47.039, "duration": 3.601},
#     {"text": "un accompagnement à côté aussi qui", "start": 49.239, "duration": 3.441},
#     {"text": "s'appelle audience mastery et je bosse", "start": 50.64, "duration": 3.32},
#     {"text": "principalement sur un média qui", "start": 52.68, "duration": 3.719},
#     {"text": "s'appelle lesmakers.fr moi ça fait 4 ans", "start": 53.96, "duration": 3.8},
#     {"text": "que j'entreprends maintenant ça fait un", "start": 56.399, "duration": 2.521},
#     {"text": "an et demi que j'habite à bal", "start": 57.76, "duration": 2.759},
#     {"text": "actuellement j'ai un cabinet de", "start": 58.92, "duration": 3.159},
#     {"text": "recrutement et un organisme de formation", "start": 60.519, "duration": 3.081},
#     {"text": "je m'appelle exan je viens de Lausanne", "start": 62.079, "duration": 3.04},
#     {"text": "en Suisse j'ai eu un parcours assez", "start": 63.6, "duration": 3.8},
#     {"text": "classique universitaire mais j'ai grandi", "start": 65.119, "duration": 4.201},
#     {"text": "à jacarta ce qui a fait que j'ai plus de", "start": 67.4, "duration": 3.8},
#     {"text": "facilité à à déménager ici y a", "start": 69.32, "duration": 3.479},
#     {"text": "maintenant un an et demi mais autrement", "start": 71.2, "duration": 3.0},
#     {"text": "voilà c'était vraiment des études", "start": 72.799, "duration": 3.721},
#     {"text": "classiques en Suisse et à Singapour et", "start": 74.2, "duration": 3.88},
#     {"text": "j'ai travaillé un peu corfory dans", "start": 76.52, "duration": 4.0},
#     {"text": "l'immobilier avant de me lancer ici ben", "start": 78.08, "duration": 5.12},
#     {"text": "je m'appelle Dylan du coup j'étais maçon", "start": 80.52, "duration": 4.4},
#     {"text": "de métier de base puis après j'ai", "start": 83.2, "duration": 2.919}
# ]

transcript_data = Transcript.objects.filter(id="2").get()
transcript = transcript_data.transcript_text


def transform_into_chunks(transcript):
    transcript_text = []
    chunk = "" 
    max_chunk_size = 4000
    
    for segment in transcript:
        chunk += segment['text'] + " "
        if len(chunk) > max_chunk_size: 
            chunk.strip()
            transcript_text.append(chunk)
            chunk = ""

    # Add any remaining text in the last chunk
    if chunk:
        chunk = chunk.strip()
        transcript_text.append(chunk)

    return transcript_text

result = transform_into_chunks(transcript)

print(result[0])
print(len(result))


# Combine the text segments into a single string
#transcript_text = " ".join(segment['text'] for segment in transcript_data)



# client = Groq(
#     api_key=config("GROQ_API_KEY"),
# )

# chat_completion = client.chat.completions.create(
#     messages=[
#         {
#             "role": "system",
#             "content": "Your role is to explain what is going on in this video transcript."
#         },
#         {
#             "role": "user",
#             "content": transcript_text
#         }
#     ],
#     model="llama3-8b-8192",
#     temperature=0.5,
#     max_tokens=500,
#     top_p=1,
#     stop=None,
#     stream=False,
# )

# # Print the completion returned by the LLM
# print(chat_completion.choices[0].message.content)