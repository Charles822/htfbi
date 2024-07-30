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
from ai_agent.models import AgentRole


def get_transcript_data(transcript_id):
    transcript_data = Transcript.objects.filter(id=transcript_id).get()
    transcript = transcript_data.transcript_text
    video = transcript_data.video.id

    return transcript, video 

def get_agent_role(agent_id):
    agent = AgentRole.objects.filter(id=agent_id).get()
    agent_role = agent.description

    return agent_role


# Split the transcript into chunks of 1000 tokens
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


client = Groq(
    api_key=config("GROQ_API_KEY"),
)

# agent one conduct the business analysis
def agent_one(chunk, agent_role):

    return client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": agent_role
        },
        {
            "role": "user",
            "content": chunk
        }
    ],
    model="llama3-8b-8192",
    temperature=0.5,
    max_tokens=500,
    top_p=1,
    stop=None,
    stream=False,
)

# agent two delivers the final response
def agent_two(agent_one_response):

    return client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "You are a 20 years expert in writting and synthesis. Trim redudancies but keep the ideas and structure. At the end of your response, invite people to leave a comment."
        },
        {
            "role": "user",
            "content": agent_one_response
        }
    ],
    model="llama3-8b-8192",
    temperature=0.5,
    max_tokens=1024,
    top_p=1,
    stop=None,
    stream=False,
)


# this is where we use agent 1 to go over the transcript
def analyse_chunks(transcript_chunks, agent_role):
    analyzed_chunks = []
    for chunk in transcript_chunks:
        analyzed_chunks.append(agent_one(chunk, agent_role).choices[0].message.content)
    return analyzed_chunks


# here we combine all chunks into one string for agent 2 to process it
def combine_analyzed_chunks(analyzed_chunks):
    agent_one_response = ""
    for chunk in analyzed_chunks:
        agent_one_response += chunk + " "
    return agent_one_response


# Resolution 

def get_agent_response(transcript_id, agent_id):
    transcript, video = get_transcript_data(transcript_id)

    agent_role = get_agent_role(agent_id)

    transcript_chunks = transform_into_chunks(transcript)

    analyzed_chunks = analyse_chunks(transcript_chunks, agent_role)

    agent_one_response = combine_analyzed_chunks(analyzed_chunks)

    # here we use agent 2 to deliver the final response
    agent_final_response = agent_two(agent_one_response).choices[0].message.content

    return video, agent_final_response

#video, agent_final_response = get_agent_response(3, 1)

# Print the completion returned by the LLM
# print(agent_final_response)
# print('---------------------------------')
# print(video)