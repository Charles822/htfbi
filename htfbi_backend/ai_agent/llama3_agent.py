#!/usr/bin/env python3
import torch
import os
# Load model directly
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

#os.environ['HF_HUB_OFFLINE'] = '1'

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Meta-Llama-3.1-8B-Instruct")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Meta-Llama-3.1-8B-Instruct")


messages = [
    {"role": "user", "content": "Who are you?"},
]
pipe = pipeline("text-generation", model="meta-llama/Meta-Llama-3.1-8B-Instruct")
pipe(messages)