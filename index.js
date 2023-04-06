const express = require('express');
const bodyParser = require('body-parser');
const limdu = require('limdu');
const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');
const app = express();

app.listen(3000, () => {
  console.log('Application started and Listening on port 3000');
});

var __dirname = 'pages';
// server css as static
app.use(express.static(__dirname));

// get our app to use body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

/////AI LIMDU TEXT
var TextClassifier = limdu.classifiers.multilabel.BinaryRelevance.bind(0, {
  binaryClassifierType: limdu.classifiers.Winnow.bind(0, {
    retrain_count: 10,
  }),
});

// Now define our feature extractor - a function that takes a sample and adds features to a given features set:
var WordExtractor = function (input, features) {
  input.split(' ').forEach(function (word) {
    features[word] = 1;
  });
};
var bestChatbotAiRobot = new limdu.classifiers.EnhancedClassifier({
  classifierType: TextClassifier,
  normalizer: limdu.features.LowerCaseNormalizer,
  featureExtractor: WordExtractor,
});
for (let op = 0; op < 3; op++) {
  bestChatbotAiRobot.trainBatch([
    {
      input: '13100806',
      output: 'Verificar vazamento ou trocar sensor caudal de fluxo de água',
    },
    {
      input: '131968',
      output: 'Trocar ventilador/turbina que mistura os gases',
    },
    {
      input: 'caudal',
      output: 'Verificar vazamento ou trocar sensor caudal de fluxo de água',
    },
    {
      input: 'vazamento',
      output: 'Verificar vazamento ou trocar sensor caudal de fluxo de água',
    },
    {
      input: 'sem energia',
      output:
        'Medir tensões 750 alternada nos paineis principal e secundário, bem como no disjuntor geral da máquina para encontrar onde há interrupção de eletricidade',
    },
    {
      input: 'erro de medição',
      output:
        'Limpar régua de medição e sensor, deixando folga de 0,75 mm em relação a régua',
    },
    {
      input: '13100514',
      output:
        'Desligar laser, desligar comando completamente, controlar qual dos 3 relés de alta tensão não é desligado, trocar o respectivo relé',
    },
    {
      input: '52000003',
      output: 'Controlar funcionamento da porta com ar condicionado',
    },
    {
      input: '52115040',
      output:
        'Controlar com evtl andamento pesado da fita transportadora, controlar módulo de monitoração da corrente',
    },
    {
      input: '70054',
      output:
        'Limpar régua de medição e sensor, deixando folga de 0,75 mm em relação a régua',
    },
    {
      input: '52010103',
      output: 'Aproximação da posição básica é ativa',
    },
    {
      input: '10654',
      output:
        'Esperar partida de sincronização da unidade de Gantry 1 ou no canal 1 esperar dar partida de sincronização',
    },
    {
      input: '52010103',
      output: 'Aproximação da posição básica é ativa',
    },
    {
      input: '80130503',
      output: 'Vá para avanço do painel de operação exterior',
    },
    {
      input: '80100199',
      output: 'Resetar o erro, Re-Entry',
    },
    {
      input: '80100323',
      output: 'Ajuste do diâmetro do filtro de água sujo',
    },
    {
      input: '80200104',
      output: 'Desligar máquina e religar, pode ser preciso reiniciar 3 vezes',
    },
    {
      input: '52102002',
      output: 'Sincronizar e teclar Start',
    },
    {
      input: '80100104',
      output: 'Desligar máquina e religar, pode ser preciso reiniciar 3 vezes',
    },
    {
      input: '52192026',
      output:
        'Desconectar mangueira para tirar impurezas, controlar nível de lubrificante, interruptor de pressão e bomba lubrificadora',
    },
    {
      input: '52010110',
      output:
        'Desconectar mangueira para tirar impurezas, controlar nível de lubrificante, interruptor de pressão e bomba lubrificadora',
    },
    {
      input: '13100407',
      output:
        'Resetar e, se preciso, repara módulo central da circulação ou conversor',
    },
    {
      input: '70042',
      output: 'Eliminar o motivo para o sinal no comando NC e teclar Start',
    },
    {
      input: '70106',
      output: 'Carregar tela Reset',
    },
    {
      input: '13101340',
      output: 'Reparar o pára-emergência na máquina',
    },
    {
      input: '52117510',
      output: 'Controlar todos dispositivos de pára-emergência e teclar Start',
    },
    {
      input: '52101104',
      output:
        'Controlar os sinais no módulo E/R e nos módulos de acionamento, controlar os sinais de interface de costura do PLC e controlar o sistema medidor da posição',
    },
    {
      input: '3000',
      output: 'Desligar máquina e religar',
    },
    {
      input: '13023121',
      output: 'Desligar máquina e religar e Reset',
    },
    {
      input: '52200001',
      output: 'Teclar Start',
    },
    {
      input: '80130481',
      output:
        'Validar erro com Start ou Reset, no Movitrac teclar E e seta para baixo, parâmetro 862; após voltar ao comando da máquuina e abortar todos erros',
    },
  ]);
}

var question = 'vazamento';
var AiResult = bestChatbotAiRobot.classify(question);
console.log(AiResult);

/////WRITE JSON
var jsonObj = {
  persons: [
    {
      name: 'John',
      city: 'New York',
      phone: {
        office: '040-528-1258',
        home: '9952685471',
      },
    },
    {
      name: 'Phil',
      city: 'Ohio',
      phone: {
        office: '040-528-8569',
        home: '7955555472',
      },
    },
  ],
};
console.log(jsonObj);
// stringify JSON Object
var jsonContent = JSON.stringify(jsonObj);
fs.writeFile('db.json', jsonContent, 'utf8', function (err) {
  if (err) {
    console.log('An error occured while writing JSON Object to File.');
    return console.log(err);
  }
});

/////READ JSON
fs.readFile(
  'db.json',
  // callback function that is called when reading file is done
  function (err, data) {
    // json data
    var jsonData = data;
    // parse json
    var jsonParsed = JSON.parse(jsonData);
    // access elements
    console.log(
      jsonParsed.persons[0].name +
        "'s office phone number is " +
        jsonParsed.persons[0].phone.office
    );
    console.log(
      jsonParsed.persons[1].name + ' is from ' + jsonParsed.persons[0].city
    );
  }
);

/////WRITE TXT
var data = '\nLearn Node.js with the help of well built Node.js Tutorial.';
// append data to file
fs.appendFile(
  'data.txt',
  data,
  'utf8',
  // callback function
  function (err) {
    if (err) throw err;
  }
);

app.post('/', (req, res) => {
  console.log(req.body);
  // res.send(
  //   '<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>'
  // );
});
