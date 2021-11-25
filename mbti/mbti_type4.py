import pandas as pd
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer
from sklearn.model_selection import train_test_split
from torch import cuda
from MBTIDataset import MBTIDataset
from datasets import load_metric
device = 'cuda' if cuda.is_available() else 'cpu'

TRAIN_BATCH_SIZE = 2
EVAL_BATCH_SIZE = 1
EPOCHS = 8
LEARNING_RATE = 1e-05
WEIGHT_DECAY = 1e-05

data = pd.read_csv('data/preprocessed/mbti.csv', index_col=None)
training, testing = train_test_split(data, test_size=0.2)
training = training.reset_index()
testing = testing.reset_index()

# tokenize data
train_params = {'batch_size': TRAIN_BATCH_SIZE,
                'shuffle': True,
                'num_workers': 1
                }
test_params = {'batch_size': EVAL_BATCH_SIZE,
               'shuffle': True,
               'num_workers': 1
               }
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
training = MBTIDataset(training, tokenizer, 512)
testing = MBTIDataset(testing, tokenizer, 512)

model = AutoModelForSequenceClassification.from_pretrained(
    "bert-base-uncased", num_labels=2)
training_args = TrainingArguments("bert_binary_1", per_device_train_batch_size=TRAIN_BATCH_SIZE,
                                  per_device_eval_batch_size=EVAL_BATCH_SIZE, weight_decay=1e-05, evaluation_strategy="steps", dataloader_num_workers=1)
metric = load_metric("accuracy")


def compute_metrics(eval_pred):
    logits, labels = eval_pred
    predictions = np.argmax(logits, axis=-1)
    return metric.compute(predictions=predictions, references=labels)


trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=training,
    eval_dataset=testing,
    compute_metrics=compute_metrics,
)
trainer.train()
print(trainer.evaluate())

output_model_file = f'./models/mbti_binary_1.bin'
model.save_pretrained(output_model_file)