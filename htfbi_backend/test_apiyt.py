#!/usr/bin/env python3
import googleapiclient.discovery
from decouple import config

def main():
    # Set up the API key and YouTube API client
    api_service_name = "youtube"
    api_version = "v3"
    api_key = config('YT_API_KEY')

    youtube = googleapiclient.discovery.build(
        api_service_name, api_version, developerKey=api_key)

    # Replace 'CHANNEL_ID' with the ID of the channel you want to query
    request = youtube.videos().list(
        part="snippet,contentDetails",
        id="1yZegG4yikc"
    )
    response = request.execute()

    print(response)

if __name__ == "__main__":
    main()