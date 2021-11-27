import pandas as pd
import numpy as np
from transformers import AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer
from sklearn.model_selection import train_test_split
from MBTIDataset import MBTIDataset
from datasets import load_metric

TRAIN_BATCH_SIZE = 4
EVAL_BATCH_SIZE = 2
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
tokenizer = AutoTokenizer.from_pretrained("roberta-base")
training = MBTIDataset(training, tokenizer, 512)
testing = MBTIDataset(testing, tokenizer, 512)

model = AutoModelForSequenceClassification.from_pretrained(
    "roberta-base", num_labels=16)
training_args = TrainingArguments("roberta", per_device_train_batch_size=TRAIN_BATCH_SIZE,
                                  per_device_eval_batch_size=EVAL_BATCH_SIZE, evaluation_strategy="steps", dataloader_num_workers=1, num_train_epochs=7)
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

output_model_file = f'./models/mbti_roberta.bin'
model.save_pretrained(output_model_file)
