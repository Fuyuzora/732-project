import pandas as pd
import torch
from torch.utils.data import Dataset, DataLoader
from transformers import BertModel, BertTokenizer
from sklearn.model_selection import train_test_split
from torch import cuda
from tqdm import tqdm
device = 'cuda' if cuda.is_available() else 'cpu'

data = pd.read_csv('data/preprocessed/mbti.csv', index_col=None)
training, testing = train_test_split(data, test_size=0.2)
training = training.reset_index()
testing = testing.reset_index()

MAX_LEN = 512
TRAIN_BATCH_SIZE = 4
VALID_BATCH_SIZE = 2
EPOCHS = 10
LEARNING_RATE = 1e-05
Bert_MODEL_NAME = 'bert-base-uncased'
train_params = {'batch_size': TRAIN_BATCH_SIZE,
                'shuffle': True,
                'num_workers': 1
                }
test_params = {'batch_size': VALID_BATCH_SIZE,
               'shuffle': True,
               'num_workers': 1
               }

tokenizer = BertTokenizer.from_pretrained(Bert_MODEL_NAME)


class MBTIDataset(Dataset):
    def __init__(self, dataframe, tokenizer, max_len):
        self.len = len(dataframe)
        self.data = dataframe
        self.tokenizer = tokenizer
        self.max_len = max_len

    def __getitem__(self, index):
        posts = str(self.data.posts[index])
        posts = " ".join(posts.split())
        inputs = self.tokenizer.encode_plus(
            posts,
            None,
            add_special_tokens=True,
            max_length=self.max_len,
            padding='max_length',
            return_token_type_ids=True,
            truncation=True
        )
        ids = inputs['input_ids']
        mask = inputs['attention_mask']

        return {
            'ids': torch.tensor(ids, dtype=torch.long),
            'mask': torch.tensor(mask, dtype=torch.long),
            'targets': torch.tensor(self.data.label[index], dtype=torch.long),
            'value': self.data.posts[index]
        }

    def __len__(self):
        return self.len


training = MBTIDataset(training, tokenizer, MAX_LEN)
testing = MBTIDataset(testing, tokenizer, MAX_LEN)
training_loader = DataLoader(training, **train_params)
testing_loader = DataLoader(testing, **test_params)


class MBTIClassifier(torch.nn.Module):
    def __init__(self):
        super(MBTIClassifier, self).__init__()
        self.l1 = BertModel.from_pretrained(Bert_MODEL_NAME)
        self.pre_classifier = torch.nn.Linear(768, 768)
        self.dropout = torch.nn.Dropout(0.3)
        self.classifier = torch.nn.Linear(768, 16)

    def forward(self, input_ids, attention_mask):
        output_1 = self.l1(input_ids=input_ids, attention_mask=attention_mask)
        hidden_state = output_1[0]
        pooler = hidden_state[:, 0]
        pooler = self.pre_classifier(pooler)
        pooler = torch.nn.ReLU()(pooler)
        pooler = self.dropout(pooler)
        output = self.classifier(pooler)
        return output


classifier = MBTIClassifier()
classifier.to(device)


loss_function = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.AdamW(
    params=classifier.parameters(), lr=LEARNING_RATE, weight_decay=1e-5)


def calcuate_accuracy(big_idx, targets):
    n_correct = (big_idx == targets).sum().item()
    return n_correct


def train(epoch):
    tr_loss = 0
    n_correct = 0
    nb_tr_steps = 0
    nb_tr_examples = 0
    loss_function = torch.nn.CrossEntropyLoss()
    classifier.train()
    for _, data in enumerate(training_loader, 0):
        ids = data['ids'].to(device, dtype=torch.long)
        mask = data['mask'].to(device, dtype=torch.long)
        targets = data['targets'].to(device, dtype=torch.long)

        outputs = classifier(ids, mask)
        loss = loss_function(outputs, targets)
        tr_loss = tr_loss + loss.item()
        big_val, big_idx = torch.max(outputs.data, dim=1)
        n_correct += calcuate_accuracy(big_idx, targets)

        nb_tr_steps += 1
        nb_tr_examples += targets.size(0)

        if _ % 5000 == 0:
            loss_step = tr_loss/nb_tr_steps
            accuracy_step = (n_correct*100)/nb_tr_examples
            print('==========================================')
            print(f"Training Loss per 5000 steps: {loss_step}")
            print(f"Training Accuracy per 5000 steps: {accuracy_step}")

        optimizer.zero_grad()
        loss.backward()
        # # When using GPU
        optimizer.step()

    print(
        f'The Total Accuracy for Epoch {epoch}: {(n_correct*100)/nb_tr_examples}')
    epoch_loss = tr_loss/nb_tr_steps
    epoch_accuracy = (n_correct*100)/nb_tr_examples
    print(f"Training Loss Epoch: {epoch_loss}")
    print(f"Training Accuracy Epoch: {epoch_accuracy}")
    return classifier


def valid(model, testing_loader):
    model.eval()
    tr_loss = 0
    n_correct = 0
    n_correct = 0
    nb_tr_steps = 0
    nb_tr_examples = 0
    loss_function = torch.nn.CrossEntropyLoss()
    with torch.no_grad():
        for _, data in enumerate(testing_loader, 0):
            ids = data['ids'].to(device, dtype=torch.long)
            mask = data['mask'].to(device, dtype=torch.long)
            targets = data['targets'].to(device, dtype=torch.long)
            outputs = model(ids, mask)
            loss = loss_function(outputs, targets)
            tr_loss += loss.item()
            big_val, big_idx = torch.max(outputs.data, dim=1)
            n_correct += calcuate_accuracy(big_idx, targets)

            nb_tr_steps += 1
            nb_tr_examples += targets.size(0)

            if _ % 5000 == 0:
                loss_step = tr_loss/nb_tr_steps
                accuracy_step = (n_correct*100)/nb_tr_examples
                print(f"Validation Loss per 100 steps: {loss_step}")
                print(f"Validation Accuracy per 100 steps: {accuracy_step}")
    epoch_loss = tr_loss/nb_tr_steps
    epoch_accuracy = (n_correct*100)/nb_tr_examples
    print(f"Validation Loss Epoch: {epoch_loss}")
    print(f"Validation Accuracy Epoch: {epoch_accuracy}")

    return epoch_accuracy


for epoch in range(EPOCHS):
    classifier = train(epoch)
    valid(classifier, testing_loader)

accuracy = valid(classifier, testing_loader)
print("Accuracy on test data = %0.2f%%" % accuracy)

output_model_file = './models/mbti16_classification.bin'
output_vocab_file = './models/mbti16_vocab.bin'
torch.save(classifier, output_model_file)
tokenizer.save_vocabulary(output_vocab_file)
