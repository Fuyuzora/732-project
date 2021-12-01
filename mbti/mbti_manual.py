import torch
import pandas as pd
from torch.utils.data import DataLoader
from transformers import RobertaTokenizer
from sklearn.model_selection import train_test_split
from torch import cuda
from tqdm import tqdm
from MBTIClassifier import MBTIClassifier
from MBTIDataset import MBTIDataset

device = 'cuda' if cuda.is_available() else 'cpu'


def calculate_accuracy(big_idx, labels):
    n_correct = (big_idx == labels).sum().item()
    return n_correct


def train(model, training_loader, optimizer):
    tr_loss = 0
    n_correct = 0
    nb_tr_steps = 0
    nb_tr_examples = 0
    loss_function = torch.nn.CrossEntropyLoss()
    model.train()
    with tqdm(total=len(training)/TRAIN_BATCH_SIZE, miniters=1) as pbar:
        for _, data in enumerate(training_loader, 0):
            ids = data['input_ids'].to(device, dtype=torch.long)
            mask = data['attention_mask'].to(device, dtype=torch.long)
            labels = data['label'].to(device, dtype=torch.long)

            outputs = model(ids, mask)
            loss = loss_function(outputs, labels)
            tr_loss = tr_loss + loss.item()
            big_val, big_idx = torch.max(outputs.data, dim=1)
            n_correct += calculate_accuracy(big_idx, labels)

            nb_tr_steps += 1
            nb_tr_examples += labels.size(0)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            pbar.update(1)

    epoch_loss = tr_loss/nb_tr_steps
    epoch_accuracy = (n_correct*100)/nb_tr_examples
    print(f"Training Loss: {epoch_loss}")
    print(f"Training Accuracy: {round(epoch_accuracy, 2)}%")
    return model, optimizer


def evaluate(model, testing_loader):
    model.eval()
    tr_loss = 0
    n_correct = 0
    nb_tr_steps = 0
    nb_tr_examples = 0
    correct_by_class = {}
    count_by_class = {}
    for i in range(16):
        correct_by_class[str(i)] = 0
        count_by_class[str(i)] = 0
    with torch.no_grad():
        for _, data in enumerate(testing_loader, 0):
            ids = data['input_ids'].to(device, dtype=torch.long)
            mask = data['attention_mask'].to(device, dtype=torch.long)
            labels = data['label'].to(device, dtype=torch.long)
            outputs = model(ids, mask)
            loss = loss_function(outputs, labels)
            tr_loss += loss.item()
            big_val, big_idx = torch.max(outputs.data, dim=1)
            n_correct += calculate_accuracy(big_idx, labels)
            indlist = big_idx.tolist()
            tgtlist = labels.tolist()
            for i in range(len(indlist)):
                correct_by_class[str(indlist[i])
                                 ] += (1 if indlist[i] == tgtlist[i] else 0)
                count_by_class[str(indlist[i])] += 1
            nb_tr_steps += 1
            nb_tr_examples += labels.size(0)

    epoch_loss = tr_loss/nb_tr_steps
    epoch_accuracy = (n_correct*100)/nb_tr_examples
    print(f"Validation Loss: {epoch_loss}")
    print(f"Validation Accuracy: {round(epoch_accuracy, 2)}%")

    return (correct_by_class, count_by_class, epoch_accuracy)


MAX_LEN = 512
TRAIN_BATCH_SIZE = 4
VALID_BATCH_SIZE = 2
EPOCHS = 10
LEARNING_RATE = 5e-05
WEIGHT_DECAY = 1e-05

BERT_MODEL_NAME = 'bert-base-uncased'
TRAIN_PARAMS = {'batch_size': TRAIN_BATCH_SIZE,
                'shuffle': True,
                'num_workers': 1
                }
TEST_PARAMS = {'batch_size': VALID_BATCH_SIZE,
               'shuffle': True,
               'num_workers': 1
               }
LABEL_TO_TYPE = {
    '0': 'INFJ',
    '1': 'ENTP',
    '2': 'INTP',
    '3': 'INTJ',
    '4': 'ENTJ',
    '5': 'ENFJ',
    '6': 'INFP',
    '7': 'ENFP',
    '8': 'ISFP',
    '9': 'ISTP',
    '10': 'ISFJ',
    '11': 'ISTJ',
    '12': 'ESTP',
    '13': 'ESFP',
    '14': 'ESTJ',
    '15': 'ESFJ'
}
data = pd.read_csv('data/preprocessed/mbti.csv', index_col=None)
training, testing = train_test_split(data, test_size=0.1)
training = training.reset_index()
testing = testing.reset_index()
# tokenizer = BertTokenizer.from_pretrained(BERT_MODEL_NAME)
tokenizer = RobertaTokenizer.from_pretrained('roberta-base')
training = MBTIDataset(training, tokenizer, MAX_LEN)
testing = MBTIDataset(testing, tokenizer, MAX_LEN)
training_loader = DataLoader(training, **TRAIN_PARAMS)
testing_loader = DataLoader(testing, **TEST_PARAMS)
classifier = MBTIClassifier()
classifier.to(device)
loss_function = torch.nn.CrossEntropyLoss()
optimizer = torch.optim.AdamW(
    params=classifier.parameters(), lr=LEARNING_RATE, weight_decay=WEIGHT_DECAY)
for epoch in range(EPOCHS):
    print(f'Epoch {epoch+1}: ')
    classifier, optimizer = train(classifier, training_loader, optimizer)
    _, _, accuracy = evaluate(classifier, testing_loader)
    output_model_file = f'./models/roberta_adamw_manual_{accuracy}.bin'
    if accuracy > 60:
        torch.save(classifier, output_model_file)

correct_by_class, count_by_class, epoch_accuracy = evaluate(
    classifier, testing_loader)
print("===============Finishing up===============")
print("Accuracy on test data = %0.2f%%" % epoch_accuracy)
for x in range(16):
    ind = str(x)
    if count_by_class[ind] == 0:
        count_by_class[ind] = 1
        print(f'{LABEL_TO_TYPE[ind]} does not exist in validation set')
    print(
        f'{LABEL_TO_TYPE[ind]}: acc = {round(correct_by_class[ind]/count_by_class[ind], 2)}')
