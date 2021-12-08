import { ArrowHeadType } from "react-flow-renderer"
export default [
    {
        id: "0",
        data: {
            label: "Bob",
            mbti: "INFP",
            tweets: 2,
            influenceIndex: 2,
            influenceDistrib: 15765/134978
        },
        position: {
            "x": 435.5,
            "y": 264.5
        },
        type: "default",
        style: {backgroundColor: 'yellow'}
    },
    {
        id: "1",
        data: {
            label: "Alex",
            mbti: "ENTJ",
            tweets: 119018,
            influenceIndex: 15,
            influenceDistrib: 3465/134978
        },
        position: {
            "x": 595.5,
            "y": 371.5
        },
        type: "default",
        style: {backgroundColor: 'cyan'}
    },
    {
        id: "2",
        data: {
            label: "Kate",
            mbti: "INFJ",
            tweets: 14,
            influenceIndex: 3,
            influenceDistrib: 7805/134978
        },
        position: {
            "x": 1090.5,
            "y": 250
        },
        type: "default",
        style: {backgroundColor: 'yellow'}
    },
    {
        id: "3",
        data: {
            label: "Lei",
            mbti: "INTP",
            tweets: 42,
            influenceIndex: 5,
            influenceDistrib: 4509/134978
        },
        position: {
            "x": 891.5,
            "y": 687
        },
        type: "default",
        style: {backgroundColor: 'yellow'}
    },
    {
        id: "4",
        data: {
            label: "Bruce",
            mbti: "ENFP",
            tweets: 2,
            influenceIndex: 2,
            influenceDistrib: 38271/134978
        },
        position: {
            "x": 1075.5,
            "y": 686
        },
        type: "default",
        style: {backgroundColor: 'yellow'}
    },
    {
        id: "5",
        data: {
            label: "John",
            mbti: "ENTP",
            tweets: 4,
            influenceIndex: 1,
            influenceDistrib: 5243/134978
        },
        position: {
            "x": 1079.5,
            "y": 586
        },
        type: "default",
        style: {backgroundColor: 'yellow'}
    },
    {
        id: "6",
        data: {
            label: "Mary",
            mbti: "ENFJ",
            tweets: 7755,
            influenceIndex: 13,
            influenceDistrib: 6687/134978
        },
        position: {
            "x": 842.5,
            "y": 578
        },
        type: "default",
        style: {backgroundColor: 'cyan'}
    },
    {
        id: "7",
        data: {
            label: "Ellea",
            mbti: "ISFP",
            tweets: 6824,
            influenceIndex: 12,
            influenceDistrib: 5326/134978
        },
        position: {
            "x": 1017.5,
            "y": 402
        },
        type: "default",
        style: {backgroundColor: 'cyan'}
    },
    {
        id: "8",
        data: {
            label: "Jack",
            mbti: "ISTP",
            tweets: 677,
            influenceIndex: 11,
            influenceDistrib: 13503/134978
        },
        position: {x: 819.5, y: 460},
        type: "default",
        style: {backgroundColor: 'yellow'}
    },
    {
        id: "9",
        data: {
            label: "Jacob",
            mbti: "ESTJ",
            tweets: 450,
            influenceIndex: 9,
            influenceDistrib: 4970/134978
        },
        position: {x: 808.5, y: 378},
        type: "default",
        style: {backgroundColor: 'yellow'}
    },
    {
        id: "10",
        data: {
            label: "David",
            mbti: "ESTP",
            tweets: 578,
            influenceIndex: 10,
            influenceDistrib: 4025/134978
        },
        position: {
            "x": 750.5,
            "y": 261
        },
        type: "default",
        style: {backgroundColor: 'yellow'}
    },
    {
        id: "11",
        data: {
            label: "Luke",
            mbti: "ESFJ",
            tweets: 80696,
            influenceIndex: 14,
            influenceDistrib: 4774/134978
        },
        position: {
            "x": 650.5,
            "y": 677
        },
        type: "default",
        style: {backgroundColor: 'cyan'}
    },
    {
        id: "12",
        data: {
            label: "Richard",
            mbti: "ISTJ",
            tweets: 87,
            influenceIndex: 7,
            influenceDistrib: 4434/134978
        },
        position: {
            "x": 434.5,
            "y": 620
        },
        type: "default",
        style: {backgroundColor: 'yellow'}
    },
    {
        id: "13",
        data: {
            label: "Fred",
            mbti: "ENTP",
            tweets: 164,
            influenceIndex: 8,
            influenceDistrib: 10439/134978
        },
        position: {
            "x": 611.5,
            "y": 552
        },
        type: "default",
        style: {backgroundColor: 'yellow'}
    },
    {
        id: "14",
        data: {
            label: "Kelly",
            mbti: "INTJ",
            tweets: 59,
            influenceIndex: 6,
            influenceDistrib: 5771/134978
        },
        position: { x: 389.5, y: 497 },
        type: "default",
        style: {backgroundColor: 'yellow'}
    },
    {
        id: 'edge-0',
        target: '1',
        source: '0',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-1',
        target: '1',
        source: '14',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-2',
        target: '1',
        source: '12',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-3',
        target: '1',
        source: '13',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-4',
        target: '11',
        source: '14',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-5',
        target: '11',
        source: '13',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-6',
        target: '11',
        source: '12',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-7',
        target: '1',
        source: '10',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-8',
        target: '1',
        source: '9',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-9',
        target: '1',
        source: '8',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-10',
        target: '1',
        source: '6',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-11',
        target: '11',
        source: '8',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-12',
        target: '11',
        source: '6',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-13',
        target: '7',
        source: '10',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-14',
        target: '7',
        source: '9',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-15',
        target: '7',
        source: '8',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-16',
        target: '7',
        source: '2',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-17',
        target: '7',
        source: '6',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-18',
        target: '6',
        source: '3',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-19',
        target: '6',
        source: '4',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
    {
        id: 'edge-20',
        target: '6',
        source: '5',
        type: 'floating',
        arrowHeadType: ArrowHeadType.Arrow,
    },
]