from transformers import BertModel
import torch

class MBTIBertBinaryClassifier(torch.nn.Module):
    def __init__(self, model_path):
        super(MBTIBertBinaryClassifier, self).__init__()
        self.l1 = BertModel.from_pretrained(model_path)
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
        output = torch.nn.Sigmoid()(pooler)
        return output