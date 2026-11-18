/* Ponte English — conteúdo do curso
   Cada palavra: [inglês, português, imagem (emoji), frase com {palavra}, tradução da frase, pronúncia aproximada]
   Cada drill de gramática: [frase com ___, [resposta certa, errada, errada], tradução]
   Para adicionar conteúdo, copie uma unidade e mude os textos. */
window.COURSE = {
  levels: [
    {
      id: 'A1', name: 'Iniciante', color: 'var(--a1)', soft: 'var(--a1-soft)',
      desc: 'Primeiras palavras, apresentações e frases do dia a dia.',
      units: [
        {
          title: 'Cumprimentos', en: 'Greetings', icon: '👋',
          words: [
            ['hello', 'olá', '👋', '{Hello}! My name is Ana.', 'Olá! Meu nome é Ana.', 'rê-LOU'],
            ['name', 'nome', '📛', 'What is your {name}?', 'Qual é o seu nome?', 'NÊIM'],
            ['friend', 'amigo(a)', '🫂', 'She is my best {friend}.', 'Ela é minha melhor amiga.', 'FRÉND'],
            ['morning', 'manhã', '🌅', 'Good {morning}, everyone!', 'Bom dia, pessoal!', 'MÓR-nin'],
            ['night', 'noite', '🌙', 'Good {night}, see you tomorrow.', 'Boa noite, até amanhã.', 'NÁIT'],
            ['thanks', 'obrigado(a)', '🙏', '{Thanks} for your help!', 'Obrigado pela ajuda!', 'THÉNKS']
          ],
          grammar: {
            title: 'Verbo to be (ser / estar)',
            rule: 'Em inglês, <b>ser</b> e <b>estar</b> são o mesmo verbo: <b>to be</b>. Ele muda conforme a pessoa.',
            table: [['I', 'am', 'eu sou / estou'], ['You', 'are', 'você é / está'], ['He / She / It', 'is', 'ele, ela é / está'], ['We / They', 'are', 'nós, eles somos / estão']],
            tip: 'Na conversa, o inglês encurta tudo: I am → <b>I\'m</b>, you are → <b>you\'re</b>, she is → <b>she\'s</b>.',
            examples: [['I am a student.', 'Eu sou estudante.'], ['She is happy today.', 'Ela está feliz hoje.'], ['We are good friends.', 'Nós somos bons amigos.']],
            drills: [['I ___ Brazilian.', ['am', 'is', 'are'], 'Eu sou brasileiro.'], ['He ___ my brother.', ['is', 'am', 'are'], 'Ele é meu irmão.'], ['They ___ at home.', ['are', 'is', 'am'], 'Eles estão em casa.']]
          }
        },
        {
          title: 'Família', en: 'Family', icon: '👨‍👩‍👧',
          words: [
            ['mother', 'mãe', '👩', 'My {mother} is a nurse.', 'Minha mãe é enfermeira.', 'MÂ-dher'],
            ['father', 'pai', '👨', 'His {father} works in a bank.', 'O pai dele trabalha num banco.', 'FÁ-dher'],
            ['brother', 'irmão', '👦', 'I have one {brother}.', 'Eu tenho um irmão.', 'BRÂ-dher'],
            ['sister', 'irmã', '👧', 'My {sister} is ten years old.', 'Minha irmã tem dez anos.', 'SÍS-ter'],
            ['baby', 'bebê', '👶', 'The {baby} is sleeping.', 'O bebê está dormindo.', 'BÊI-bi'],
            ['family', 'família', '👨‍👩‍👧', 'I love my {family}.', 'Eu amo minha família.', 'FÉ-mi-li']
          ],
          grammar: {
            title: 'Possessivos (my, your, his, her)',
            rule: 'Os possessivos mostram <b>de quem</b> é alguma coisa e vêm sempre antes do substantivo.',
            table: [['I → my', 'meu / minha'], ['you → your', 'seu / sua'], ['he → his', 'dele'], ['she → her', 'dela'], ['we → our', 'nosso / nossa'], ['they → their', 'deles / delas']],
            tip: '<b>His</b> e <b>her</b> concordam com o dono, não com a coisa: <i>her father</i> = o pai <b>dela</b>.',
            examples: [['This is my car.', 'Este é meu carro.'], ['Her name is Julia.', 'O nome dela é Julia.'], ['Our house is big.', 'Nossa casa é grande.']],
            drills: [['Maria loves ___ dog.', ['her', 'his', 'my'], 'Maria ama o cachorro dela.'], ['John and ___ wife live here.', ['his', 'her', 'their'], 'John e a esposa dele moram aqui.'], ['We love ___ parents.', ['our', 'their', 'your'], 'Nós amamos nossos pais.']]
          }
        },
        {
          title: 'Cores e coisas', en: 'Colors', icon: '🎨',
          words: [
            ['red', 'vermelho', '🔴', 'I have a {red} car.', 'Eu tenho um carro vermelho.', 'RÉD'],
            ['blue', 'azul', '🔵', 'The sky is {blue}.', 'O céu é azul.', 'BLÚ'],
            ['green', 'verde', '🟢', 'The grass is {green}.', 'A grama é verde.', 'GRÍN'],
            ['yellow', 'amarelo', '🟡', 'The sun is {yellow}.', 'O sol é amarelo.', 'IÉ-lou'],
            ['black', 'preto', '⚫', 'She has a {black} cat.', 'Ela tem um gato preto.', 'BLÉK'],
            ['white', 'branco', '⚪', 'The wall is {white}.', 'A parede é branca.', 'UÁIT']
          ],
          grammar: {
            title: 'A / An e plural',
            rule: 'Use <b>a</b> antes de som de consoante e <b>an</b> antes de som de vogal. Para o plural, quase sempre basta somar <b>-s</b>.',
            table: [['a', 'a car, a book', 'som de consoante'], ['an', 'an apple, an hour', 'som de vogal'], ['+ s', 'cars, books', 'plural comum'], ['+ es', 'boxes, buses', 'termina em s, x, ch, sh']],
            tip: 'O adjetivo vem <b>antes</b> do substantivo: <i>a red car</i> (e não "a car red").',
            examples: [['I have an orange.', 'Eu tenho uma laranja.'], ['She has two black cats.', 'Ela tem dois gatos pretos.'], ['It is a blue box.', 'É uma caixa azul.']],
            drills: [['I want ___ apple.', ['an', 'a', 'the two'], 'Eu quero uma maçã.'], ['She is ___ teacher.', ['a', 'an', 'two'], 'Ela é professora.'], ['I have two ___.', ['boxes', 'boxs', 'box'], 'Eu tenho duas caixas.']]
          }
        },
        {
          title: 'Comida e bebida', en: 'Food', icon: '🍎',
          words: [
            ['water', 'água', '💧', 'Can I have some {water}?', 'Posso tomar um pouco de água?', 'UÓ-ter'],
            ['coffee', 'café', '☕', 'I drink {coffee} every day.', 'Eu tomo café todo dia.', 'CÓ-fi'],
            ['bread', 'pão', '🍞', 'I want {bread} with butter.', 'Quero pão com manteiga.', 'BRÉD'],
            ['apple', 'maçã', '🍎', 'An {apple} a day is healthy.', 'Uma maçã por dia é saudável.', 'É-pol'],
            ['rice', 'arroz', '🍚', 'We eat {rice} and beans.', 'Nós comemos arroz e feijão.', 'RÁIS'],
            ['egg', 'ovo', '🥚', 'I eat an {egg} for breakfast.', 'Eu como um ovo no café da manhã.', 'ÉG']
          ],
          grammar: {
            title: 'Gostar: like / don\'t like',
            rule: 'Para falar do que você gosta, use <b>like</b>. Para negar, coloque <b>don\'t</b> antes. Perguntas começam com <b>Do</b>.',
            table: [['I like coffee.', 'eu gosto de café'], ['I don\'t like eggs.', 'eu não gosto de ovos'], ['Do you like rice?', 'você gosta de arroz?'], ['Yes, I do. / No, I don\'t.', 'sim / não']],
            tip: '<b>Don\'t</b> é a forma curta de <b>do not</b>. Repare que o inglês não usa "de": <i>I like coffee</i> (e não "I like of coffee").',
            examples: [['I like coffee.', 'Eu gosto de café.'], ['I do not like eggs.', 'Eu não gosto de ovos.'], ['Do you like rice?', 'Você gosta de arroz?']],
            drills: [['I ___ like fish.', ['don\'t', 'doesn\'t', 'not'], 'Eu não gosto de peixe.'], ['___ you like pizza?', ['Do', 'Are', 'Is'], 'Você gosta de pizza?'], ['Yes, I ___.', ['do', 'am', 'like'], 'Sim, eu gosto.']]
          }
        }
      ]
    },
    {
      id: 'A2', name: 'Básico', color: 'var(--a2)', soft: 'var(--a2-soft)',
      desc: 'Rotina, casa, cidade e como contar o que você fez.',
      units: [
        {
          title: 'Rotina', en: 'Daily routine', icon: '⏰',
          words: [
            ['wake up', 'acordar', '⏰', 'I {wake up} at 6 a.m.', 'Eu acordo às 6h.', 'UÊIK âp'],
            ['shower', 'banho', '🚿', 'I take a {shower} in the morning.', 'Tomo banho de manhã.', 'CHÁU-er'],
            ['breakfast', 'café da manhã', '🥞', 'We have {breakfast} together.', 'Tomamos café da manhã juntos.', 'BRÉK-fâst'],
            ['work', 'trabalho', '💼', 'I go to {work} by car.', 'Vou ao trabalho de carro.', 'UÂRK'],
            ['bus', 'ônibus', '🚌', 'She takes the {bus} to school.', 'Ela pega o ônibus para a escola.', 'BÂS'],
            ['sleep', 'dormir', '😴', 'I {sleep} eight hours.', 'Eu durmo oito horas.', 'SLÍP']
          ],
          grammar: {
            title: 'Presente simples: he / she / it + s',
            rule: 'No presente, com <b>he, she, it</b>, o verbo ganha <b>-s</b>. Advérbios de frequência (always, usually, sometimes, never) vêm antes do verbo.',
            table: [['I work', 'he works'], ['I go', 'she goes'], ['I have', 'it has'], ['I study', 'he studies']],
            tip: 'Frequência do mais para o menos: <b>always</b> (sempre) → <b>usually</b> (geralmente) → <b>sometimes</b> (às vezes) → <b>never</b> (nunca).',
            examples: [['She works in an office.', 'Ela trabalha num escritório.'], ['He always takes the bus.', 'Ele sempre pega o ônibus.'], ['I never sleep late.', 'Eu nunca durmo tarde.']],
            drills: [['She ___ coffee every morning.', ['drinks', 'drink', 'drinking'], 'Ela toma café toda manhã.'], ['He ___ to work by bus.', ['goes', 'go', 'gos'], 'Ele vai ao trabalho de ônibus.'], ['I ___ eat meat. I am vegetarian.', ['never', 'always', 'usually'], 'Eu nunca como carne. Sou vegetariano.']]
          }
        },
        {
          title: 'Casa', en: 'Home', icon: '🏠',
          words: [
            ['kitchen', 'cozinha', '🍳', 'Mom is in the {kitchen}.', 'A mãe está na cozinha.', 'KÍ-tchen'],
            ['bedroom', 'quarto', '🛏️', 'My {bedroom} is small.', 'Meu quarto é pequeno.', 'BÉD-rum'],
            ['bathroom', 'banheiro', '🛁', 'Where is the {bathroom}?', 'Onde fica o banheiro?', 'BÉTH-rum'],
            ['door', 'porta', '🚪', 'Please close the {door}.', 'Por favor, feche a porta.', 'DÓR'],
            ['window', 'janela', '🪟', 'Open the {window}, it is hot.', 'Abra a janela, está calor.', 'UÍN-dou'],
            ['key', 'chave', '🔑', 'I lost my {key}!', 'Perdi minha chave!', 'KÍ']
          ],
          grammar: {
            title: 'There is / There are (tem, há)',
            rule: 'Para dizer que algo <b>existe</b> em um lugar, use <b>there is</b> (singular) e <b>there are</b> (plural).',
            table: [['There is', 'há / tem (1)', 'There is a sofa.'], ['There are', 'há / tem (2+)', 'There are two beds.'], ['Is there...?', 'tem...?', 'Is there a garage?'], ['There isn\'t / aren\'t', 'não tem', 'There aren\'t chairs.']],
            tip: 'Não use <b>have</b> para "tem" no sentido de existir: <i>There is a park here</i> (e não "Have a park here").',
            examples: [['There is a big kitchen.', 'Tem uma cozinha grande.'], ['There are three bedrooms.', 'Há três quartos.'], ['Is there a key on the table?', 'Tem uma chave na mesa?']],
            drills: [['There ___ two windows in my room.', ['are', 'is', 'have'], 'Há duas janelas no meu quarto.'], ['There ___ a cat on the sofa.', ['is', 'are', 'has'], 'Tem um gato no sofá.'], ['___ there a bathroom here?', ['Is', 'Are', 'Have'], 'Tem um banheiro aqui?']]
          }
        },
        {
          title: 'Cidade e direções', en: 'City', icon: '🏙️',
          words: [
            ['street', 'rua', '🛣️', 'I live on this {street}.', 'Eu moro nesta rua.', 'STRÍT'],
            ['hospital', 'hospital', '🏥', 'The {hospital} is near here.', 'O hospital fica perto daqui.', 'RÓS-pi-tâl'],
            ['bank', 'banco', '🏦', 'I need to go to the {bank}.', 'Preciso ir ao banco.', 'BÉNK'],
            ['store', 'loja', '🏪', 'The {store} opens at nine.', 'A loja abre às nove.', 'STÓR'],
            ['left', 'esquerda', '⬅️', 'Turn {left} at the corner.', 'Vire à esquerda na esquina.', 'LÉFT'],
            ['right', 'direita', '➡️', 'The bank is on the {right}.', 'O banco fica à direita.', 'RÁIT']
          ],
          grammar: {
            title: 'Preposições de lugar',
            rule: 'Preposições dizem <b>onde</b> algo está. As mais usadas no dia a dia são estas:',
            table: [['in', 'dentro de', 'in the car'], ['on', 'sobre / na rua', 'on the table'], ['next to', 'ao lado de', 'next to the bank'], ['between', 'entre', 'between two stores'], ['in front of', 'em frente a', 'in front of the hospital']],
            tip: 'Para pedir informação, comece com <b>Excuse me</b>: <i>Excuse me, where is the bank?</i>',
            examples: [['The bank is next to the store.', 'O banco fica ao lado da loja.'], ['The keys are on the table.', 'As chaves estão na mesa.'], ['Turn right after the hospital.', 'Vire à direita depois do hospital.']],
            drills: [['The cat is ___ the box.', ['in', 'at', 'between'], 'O gato está dentro da caixa.'], ['The store is ___ the bank and the hospital.', ['between', 'next', 'on'], 'A loja fica entre o banco e o hospital.'], ['There is a car ___ front of my house.', ['in', 'on', 'at'], 'Tem um carro em frente à minha casa.']]
          }
        },
        {
          title: 'Fim de semana', en: 'The weekend', icon: '🎉',
          words: [
            ['beach', 'praia', '🏖️', 'We went to the {beach} on Sunday.', 'Fomos à praia no domingo.', 'BÍTCH'],
            ['movie', 'filme', '🎬', 'I watched a great {movie}.', 'Assisti a um filme ótimo.', 'MÚ-vi'],
            ['party', 'festa', '🎉', 'The {party} was amazing!', 'A festa foi incrível!', 'PÁR-ti'],
            ['trip', 'viagem', '✈️', 'How was your {trip}?', 'Como foi sua viagem?', 'TRÍP'],
            ['photo', 'foto', '📸', 'She took a {photo} of the sea.', 'Ela tirou uma foto do mar.', 'FÔU-tou'],
            ['game', 'jogo', '⚽', 'Did you watch the {game}?', 'Você assistiu ao jogo?', 'GUÊIM']
          ],
          grammar: {
            title: 'Passado simples',
            rule: 'Verbos regulares ganham <b>-ed</b>. Os irregulares mudam de forma e precisam ser decorados aos poucos.',
            table: [['Regular', 'work → worked, watch → watched'], ['Irregular', 'go → went, see → saw, have → had'], ['Negativa', 'I didn\'t go (didn\'t + verbo normal)'], ['Pergunta', 'Did you go? (Did + verbo normal)']],
            tip: 'Depois de <b>did</b> ou <b>didn\'t</b>, o verbo volta ao normal: <i>Did you go?</i> (e não "Did you went?").',
            examples: [['I watched a movie last night.', 'Assisti a um filme ontem à noite.'], ['We went to the beach.', 'Fomos à praia.'], ['Did you like the party?', 'Você gostou da festa?']],
            drills: [['Yesterday I ___ to the beach.', ['went', 'go', 'goed'], 'Ontem eu fui à praia.'], ['She ___ a movie last night.', ['watched', 'watch', 'watching'], 'Ela assistiu a um filme ontem à noite.'], ['I didn\'t ___ the game.', ['see', 'saw', 'seen'], 'Eu não vi o jogo.']]
          }
        }
      ]
    },
    {
      id: 'B1', name: 'Intermediário', color: 'var(--b1)', soft: 'var(--b1-soft)',
      desc: 'Trabalho, vendas, viagens e saúde com frases completas.',
      units: [
        {
          title: 'Trabalho e carreira', en: 'Work', icon: '👔',
          words: [
            ['job', 'emprego', '👔', 'I love my new {job}.', 'Amo meu novo emprego.'],
            ['boss', 'chefe', '👩‍💼', 'My {boss} is very fair.', 'Minha chefe é muito justa.'],
            ['salary', 'salário', '💵', 'The {salary} is good.', 'O salário é bom.'],
            ['office', 'escritório', '🏢', 'I work at the {office} on Mondays.', 'Trabalho no escritório às segundas.'],
            ['interview', 'entrevista', '🎤', 'I have a job {interview} tomorrow.', 'Tenho uma entrevista de emprego amanhã.'],
            ['deadline', 'prazo', '⏳', 'The {deadline} is Friday.', 'O prazo é sexta.']
          ],
          grammar: {
            title: 'Present perfect (have + particípio)',
            rule: 'O present perfect liga o passado ao presente: experiências, coisas que acabaram de acontecer e situações que continuam até hoje.',
            table: [['Experiência', 'I have worked in sales.', 'Já trabalhei com vendas.'], ['Acabou de acontecer', 'She has just finished.', 'Ela acabou de terminar.'], ['Continua até hoje', 'I have lived here for 5 years.', 'Moro aqui há 5 anos.'], ['Pergunta', 'Have you ever been to London?', 'Você já foi a Londres?']],
            tip: 'Se o tempo está definido no passado (<i>yesterday, in 2020</i>), use o passado simples: <i>I worked there in 2020</i>.',
            examples: [['I have worked here for two years.', 'Trabalho aqui há dois anos.'], ['She has just finished the report.', 'Ela acabou de terminar o relatório.'], ['Have you ever had an interview in English?', 'Você já fez uma entrevista em inglês?']],
            drills: [['I ___ worked here since 2022.', ['have', 'has', 'am'], 'Trabalho aqui desde 2022.'], ['She has ___ the report.', ['finished', 'finish', 'finishing'], 'Ela terminou o relatório.'], ['___ you ever been to New York?', ['Have', 'Did', 'Are'], 'Você já foi a Nova York?']]
          }
        },
        {
          title: 'Vendas e negócios', en: 'Sales', icon: '📈',
          words: [
            ['customer', 'cliente', '🧑‍💼', 'The {customer} wants a demo.', 'O cliente quer uma demonstração.'],
            ['deal', 'negócio fechado', '🤝', 'It\'s a {deal}!', 'Negócio fechado!'],
            ['discount', 'desconto', '💸', 'We can offer a 10% {discount}.', 'Podemos oferecer 10% de desconto.'],
            ['invoice', 'fatura / nota', '🧾', 'I sent the {invoice} by email.', 'Enviei a fatura por e-mail.'],
            ['budget', 'orçamento (verba)', '💰', 'What is your {budget}?', 'Qual é a sua verba?'],
            ['goal', 'meta', '🎯', 'I hit my sales {goal}!', 'Bati minha meta de vendas!']
          ],
          grammar: {
            title: 'Futuro: will × going to',
            rule: '<b>Will</b> é para decisões na hora e promessas. <b>Going to</b> é para planos já decididos ou quando há evidência.',
            table: [['will', 'decisão na hora / promessa', 'I\'ll send it now.'], ['going to', 'plano já decidido', 'I\'m going to visit the client.'], ['going to', 'há evidência', 'It\'s going to rain.']],
            tip: 'Em vendas, <b>I\'ll</b> soa prestativo e seguro: <i>I\'ll check that for you.</i>',
            examples: [['I will send you the proposal today.', 'Vou te enviar a proposta hoje.'], ['We are going to close the deal next week.', 'Vamos fechar o negócio semana que vem.'], ['I will check that for you.', 'Vou verificar isso para você.']],
            drills: [['The phone is ringing. I ___ answer it.', ['will', 'am going', 'going'], 'O telefone está tocando. Eu atendo.'], ['We ___ going to launch the product in May.', ['are', 'will', 'is'], 'Vamos lançar o produto em maio.'], ['Don\'t worry, I ___ send the invoice today.', ['will', 'going', 'am'], 'Não se preocupe, envio a fatura hoje.']]
          }
        },
        {
          title: 'Viagem', en: 'Travel', icon: '✈️',
          words: [
            ['airport', 'aeroporto', '🛫', 'I will meet you at the {airport}.', 'Te encontro no aeroporto.'],
            ['passport', 'passaporte', '🛂', 'Don\'t forget your {passport}!', 'Não esqueça o passaporte!'],
            ['luggage', 'bagagem', '🧳', 'My {luggage} is too heavy.', 'Minha bagagem está pesada demais.'],
            ['hotel', 'hotel', '🏨', 'The {hotel} has a pool.', 'O hotel tem piscina.'],
            ['ticket', 'passagem / ingresso', '🎫', 'I bought a {ticket} to Paris.', 'Comprei uma passagem para Paris.'],
            ['map', 'mapa', '🗺️', 'Can you show me on the {map}?', 'Pode me mostrar no mapa?']
          ],
          grammar: {
            title: 'Pedidos educados: can, could, would',
            rule: 'Quanto mais formal a situação, mais educado o pedido. <b>Could</b> e <b>would</b> soam mais gentis que <b>can</b>.',
            table: [['Can I...?', 'informal', 'Can I sit here?'], ['Could you...?', 'mais educado', 'Could you help me?'], ['Would you mind + -ing?', 'bem formal', 'Would you mind waiting?'], ['I\'d like...', 'eu gostaria', 'I\'d like a coffee, please.']],
            tip: '<b>I want</b> pode soar rude. Em hotel, restaurante e aeroporto, prefira <b>I\'d like</b>.',
            examples: [['Could you help me with my luggage?', 'Poderia me ajudar com a bagagem?'], ['I\'d like a room for two nights.', 'Eu gostaria de um quarto por duas noites.'], ['Can I see your passport?', 'Posso ver seu passaporte?']],
            drills: [['___ you tell me where the gate is?', ['Could', 'Would like', 'Do can'], 'Poderia me dizer onde fica o portão?'], ['I\'d ___ a window seat, please.', ['like', 'want', 'love to'], 'Eu gostaria de um assento na janela, por favor.'], ['Would you mind ___ the door?', ['closing', 'close', 'to close'], 'Você se importaria de fechar a porta?']]
          }
        },
        {
          title: 'Saúde', en: 'Health', icon: '🩺',
          words: [
            ['headache', 'dor de cabeça', '🤕', 'I have a terrible {headache}.', 'Estou com uma dor de cabeça terrível.'],
            ['doctor', 'médico(a)', '🩺', 'You should see a {doctor}.', 'Você deveria ir ao médico.'],
            ['medicine', 'remédio', '💊', 'Take this {medicine} twice a day.', 'Tome este remédio duas vezes ao dia.'],
            ['fever', 'febre', '🤒', 'The child has a {fever}.', 'A criança está com febre.'],
            ['exercise', 'exercício', '🏃', 'Regular {exercise} is good for you.', 'Exercício regular faz bem.'],
            ['appointment', 'consulta / horário', '📅', 'I have an {appointment} at 3 p.m.', 'Tenho uma consulta às 15h.']
          ],
          grammar: {
            title: 'Conselhos: should / shouldn\'t',
            rule: 'Use <b>should</b> para dar conselhos e <b>shouldn\'t</b> para dizer o que não é bom fazer.',
            table: [['You should...', 'você deveria', 'You should rest.'], ['You shouldn\'t...', 'você não deveria', 'You shouldn\'t smoke.'], ['Should I...?', 'eu deveria...?', 'Should I call a doctor?'], ['You\'d better...', 'é melhor (urgente)', 'You\'d better go now.']],
            tip: 'Depois de <b>should</b>, o verbo vem sem <b>to</b>: <i>You should go</i> (e não "should to go").',
            examples: [['You should drink more water.', 'Você deveria beber mais água.'], ['You shouldn\'t work when you are sick.', 'Você não deveria trabalhar doente.'], ['Should I make an appointment?', 'Devo marcar uma consulta?']],
            drills: [['You have a fever. You ___ stay home.', ['should', 'shouldn\'t', 'should to'], 'Você está com febre. Deveria ficar em casa.'], ['You ___ eat so much sugar.', ['shouldn\'t', 'should', 'don\'t should'], 'Você não deveria comer tanto açúcar.'], ['You should ___ a doctor.', ['see', 'to see', 'seeing'], 'Você deveria ir a um médico.']]
          }
        }
      ]
    },
    {
      id: 'B2', name: 'Intermediário superior', color: 'var(--b2)', soft: 'var(--b2-soft)',
      desc: 'Phrasal verbs, tecnologia, emoções e condicionais.',
      units: [
        {
          title: 'Phrasal verbs', en: 'Phrasal verbs', icon: '🧩',
          words: [
            ['give up', 'desistir', '🏳️', 'Never {give up} on your dreams.', 'Nunca desista dos seus sonhos.'],
            ['find out', 'descobrir', '🔍', 'I need to {find out} the truth.', 'Preciso descobrir a verdade.'],
            ['look forward to', 'aguardar com ansiedade', '🤩', 'I {look forward to} meeting you.', 'Estou ansioso para te conhecer.'],
            ['run out of', 'ficar sem', '🪫', 'My phone always seems to {run out of} battery.', 'Meu celular sempre parece ficar sem bateria.'],
            ['figure out', 'entender / resolver', '🧠', 'I can\'t {figure out} this puzzle.', 'Não consigo resolver este quebra-cabeça.'],
            ['set up', 'configurar / montar', '🛠️', 'Can you help me {set up} the printer?', 'Pode me ajudar a configurar a impressora?']
          ],
          grammar: {
            title: 'Phrasal verbs: separáveis ou não',
            rule: 'Phrasal verb é <b>verbo + partícula</b> que juntos ganham um sentido novo. Alguns se separam, outros nunca.',
            table: [['Separável', 'turn off the light / turn the light off', 'com pronome: turn it off'], ['Inseparável', 'look after the kids', 'nunca: look the kids after'], ['Três partes', 'look forward to, run out of', 'sempre juntos'], ['Atenção', 'look forward to + -ing', 'I look forward to hearing from you.']],
            tip: 'Com pronome (<i>it, them</i>), o separável fica dividido: <i>pick it up</i> (e não "pick up it").',
            examples: [['Please turn it off.', 'Por favor, desligue isso.'], ['I look forward to hearing from you.', 'Aguardo seu retorno.'], ['We ran out of coffee this morning.', 'Ficamos sem café hoje de manhã.']],
            drills: [['I look forward to ___ from you.', ['hearing', 'hear', 'heard'], 'Aguardo seu retorno.'], ['The TV is loud. Please turn ___ down.', ['it', 'them', 'on'], 'A TV está alta. Por favor, abaixe.'], ['Don\'t give ___! You can do it.', ['up', 'out', 'off'], 'Não desista! Você consegue.']]
          }
        },
        {
          title: 'Tecnologia', en: 'Technology', icon: '💻',
          words: [
            ['device', 'aparelho', '📱', 'Turn off every {device} before bed.', 'Desligue todo aparelho antes de dormir.'],
            ['update', 'atualização', '🔄', 'The app needs an {update}.', 'O app precisa de uma atualização.'],
            ['password', 'senha', '🔐', 'Never share your {password}.', 'Nunca compartilhe sua senha.'],
            ['screen', 'tela', '🖥️', 'My phone {screen} is broken.', 'A tela do meu celular quebrou.'],
            ['download', 'download / baixar', '⬇️', 'The {download} will take two minutes.', 'O download vai levar dois minutos.'],
            ['network', 'rede', '🌐', 'The {network} is down today.', 'A rede está fora do ar hoje.']
          ],
          grammar: {
            title: 'Voz passiva (be + particípio)',
            rule: 'Na voz passiva, o foco é a <b>ação</b>, não quem fez. Monte com o verbo <b>to be</b> no tempo certo + particípio.',
            table: [['Presente', 'is / are + particípio', 'Emails are sent every day.'], ['Passado', 'was / were + particípio', 'The app was updated.'], ['Futuro', 'will be + particípio', 'The file will be deleted.'], ['Present perfect', 'has / have been + particípio', 'Your password has been changed.']],
            tip: 'Quer dizer quem fez? Use <b>by</b>: <i>The app was created by two students.</i>',
            examples: [['The app was created in 2020.', 'O app foi criado em 2020.'], ['Your password has been changed.', 'Sua senha foi alterada.'], ['The files will be deleted tomorrow.', 'Os arquivos serão apagados amanhã.']],
            drills: [['The update ___ released yesterday.', ['was', 'is', 'were'], 'A atualização foi lançada ontem.'], ['English ___ spoken all over the world.', ['is', 'are', 'was been'], 'O inglês é falado no mundo todo.'], ['Your account has been ___.', ['blocked', 'block', 'blocking'], 'Sua conta foi bloqueada.']]
          }
        },
        {
          title: 'Sentimentos', en: 'Feelings', icon: '💭',
          words: [
            ['proud', 'orgulhoso(a)', '🏅', 'I am so {proud} of you!', 'Tenho muito orgulho de você!'],
            ['worried', 'preocupado(a)', '😟', 'She\'s {worried} about the exam.', 'Ela está preocupada com a prova.'],
            ['thrilled', 'radiante', '🥳', 'We were {thrilled} with the news.', 'Ficamos radiantes com a notícia.'],
            ['upset', 'chateado(a)', '😠', 'He was {upset} because he lost.', 'Ele ficou chateado porque perdeu.'],
            ['grateful', 'grato(a)', '💐', 'I am {grateful} for your support.', 'Sou grato pelo seu apoio.'],
            ['bored', 'entediado(a)', '🥱', 'The kids are {bored} at home.', 'As crianças estão entediadas em casa.']
          ],
          grammar: {
            title: 'Adjetivos -ed × -ing',
            rule: '<b>-ed</b> descreve como a pessoa <b>se sente</b>. <b>-ing</b> descreve o que <b>causa</b> o sentimento.',
            table: [['-ed', 'como você se sente', 'I am bored. / I am interested.'], ['-ing', 'o que causa o sentimento', 'The class is boring. / The book is interesting.'], ['Cuidado', 'I\'m boring = eu sou chato!', 'I\'m bored = estou entediado']],
            tip: 'Pense assim: a <b>coisa</b> é <i>boring</i>, e <b>você</b> fica <i>bored</i>.',
            examples: [['The movie was boring.', 'O filme foi chato.'], ['I was so excited about the trip.', 'Eu estava muito animado com a viagem.'], ['This news is really surprising.', 'Essa notícia é muito surpreendente.']],
            drills: [['The lecture was so ___ that I fell asleep.', ['boring', 'bored', 'bore'], 'A palestra foi tão chata que dormi.'], ['I\'m ___ in learning Spanish.', ['interested', 'interesting', 'interest'], 'Tenho interesse em aprender espanhol.'], ['The results were ___.', ['surprising', 'surprised', 'surprise'], 'Os resultados foram surpreendentes.']]
          }
        },
        {
          title: 'Dinheiro e decisões', en: 'Money', icon: '💰',
          words: [
            ['save', 'economizar', '🐷', 'I want to {save} money for a car.', 'Quero economizar para um carro.'],
            ['spend', 'gastar', '🛍️', 'Don\'t {spend} all your salary!', 'Não gaste todo o seu salário!'],
            ['loan', 'empréstimo', '🤲', 'They took a {loan} to buy a house.', 'Fizeram um empréstimo para comprar uma casa.'],
            ['debt', 'dívida', '📉', 'He is trying to pay off his {debt}.', 'Ele está tentando quitar a dívida.'],
            ['invest', 'investir', '📊', 'You should {invest} in your education.', 'Você deveria investir na sua educação.'],
            ['afford', 'ter dinheiro para', '💳', 'I can\'t {afford} a new phone.', 'Não tenho dinheiro para um celular novo.']
          ],
          grammar: {
            title: 'Condicionais (if)',
            rule: 'As frases com <b>if</b> mudam de estrutura conforme a situação: fato, possibilidade real, imaginação ou arrependimento.',
            table: [['Zero', 'fato: If + presente, presente', 'If you heat ice, it melts.'], ['First', 'possível: If + presente, will', 'If I save, I will buy a car.'], ['Second', 'imaginário: If + passado, would', 'If I had money, I would travel.'], ['Third', 'não aconteceu: If + had + part., would have', 'If I had studied, I would have passed.']],
            tip: 'No registro formal, use <b>were</b> para todas as pessoas: <i>If I were you...</i>',
            examples: [['If I save money, I will buy a car.', 'Se eu economizar, vou comprar um carro.'], ['If I were rich, I would travel the world.', 'Se eu fosse rico, viajaria o mundo.'], ['If she had studied, she would have passed.', 'Se ela tivesse estudado, teria passado.']],
            drills: [['If it rains, we ___ stay home.', ['will', 'would', 'would have'], 'Se chover, vamos ficar em casa.'], ['If I ___ you, I would accept the offer.', ['were', 'am', 'will be'], 'Se eu fosse você, aceitaria a oferta.'], ['If he had saved, he ___ bought the house.', ['would have', 'will have', 'would'], 'Se ele tivesse economizado, teria comprado a casa.']]
          }
        }
      ]
    },
    {
      id: 'C1', name: 'Avançado', color: 'var(--c1)', soft: 'var(--c1-soft)',
      desc: 'Expressões idiomáticas, conectores e comunicação profissional.',
      units: [
        {
          title: 'Expressões idiomáticas', en: 'Idioms', icon: '🎭',
          words: [
            ['piece of cake', 'moleza', '🍰', 'The test was a {piece of cake}.', 'A prova foi moleza.'],
            ['break the ice', 'quebrar o gelo', '🧊', 'He told a joke to {break the ice}.', 'Ele contou uma piada para quebrar o gelo.'],
            ['under the weather', 'indisposto(a)', '🌧️', 'I\'m feeling a bit {under the weather}.', 'Estou me sentindo meio indisposto.'],
            ['cost an arm and a leg', 'custar os olhos da cara', '💎', 'That car must {cost an arm and a leg}.', 'Aquele carro deve custar os olhos da cara.'],
            ['the ball is in your court', 'agora é com você', '🎾', 'I made my offer; {the ball is in your court}.', 'Fiz minha oferta; agora é com você.'],
            ['hit the road', 'pegar a estrada / ir embora', '🚗', 'It\'s late, let\'s {hit the road}.', 'Está tarde, vamos embora.']
          ],
          grammar: {
            title: 'Como usar idioms sem errar',
            rule: 'Idioms são expressões fixas: o sentido não é a soma das palavras. Aprenda sempre a frase inteira.',
            table: [['Não traduza ao pé da letra', 'under the weather', '= indisposto'], ['Observe o registro', 'hit the road é informal', 'evite em e-mail formal'], ['Mantenha a forma', 'a piece of cake', 'e não "a slice of cake"'], ['Busque o equivalente', 'cost an arm and a leg', '= custar os olhos da cara']],
            tip: 'Grave o idiom junto com a situação em que ele aparece. O contexto ajuda mais que a tradução.',
            examples: [['Learning this was a piece of cake.', 'Aprender isso foi moleza.'], ['Let me break the ice with a quick question.', 'Deixa eu quebrar o gelo com uma pergunta rápida.'], ['The ball is in your court now.', 'Agora a decisão é sua.']],
            drills: [['The exam was a piece of ___.', ['cake', 'pie', 'bread'], 'A prova foi moleza.'], ['I can\'t come today, I\'m feeling under the ___.', ['weather', 'rain', 'sky'], 'Não posso ir hoje, estou indisposto.'], ['That watch costs an arm and a ___.', ['leg', 'foot', 'hand'], 'Aquele relógio custa os olhos da cara.']]
          }
        },
        {
          title: 'Conectores', en: 'Linking words', icon: '🔗',
          words: [
            ['however', 'no entanto', '🔀', 'The plan is good. {However}, it is expensive.', 'O plano é bom. No entanto, é caro.'],
            ['therefore', 'portanto', '➡️', 'Sales fell; {therefore}, we cut costs.', 'As vendas caíram; portanto, cortamos custos.'],
            ['although', 'embora', '⚖️', '{Although} it was raining, we went out.', 'Embora estivesse chovendo, saímos.'],
            ['moreover', 'além disso', '➕', 'It is cheap. {Moreover}, it is fast.', 'É barato. Além disso, é rápido.'],
            ['despite', 'apesar de', '🧱', 'We won {despite} the difficulties.', 'Vencemos apesar das dificuldades.'],
            ['meanwhile', 'enquanto isso', '⏱️', 'I cooked; {meanwhile}, she set the table.', 'Eu cozinhei; enquanto isso, ela pôs a mesa.']
          ],
          grammar: {
            title: 'Although × despite × however',
            rule: 'Os três expressam contraste, mas cada um pede uma estrutura diferente depois dele.',
            table: [['although + frase', 'Although it rained, we went.', 'embora'], ['despite + substantivo / -ing', 'Despite the rain, we went.', 'apesar de'], ['However, + frase', 'It rained. However, we went.', 'no entanto'], ['therefore', 'We were late; therefore, we missed it.', 'portanto']],
            tip: '<b>"Despite of" não existe.</b> Use <i>despite</i> ou <i>in spite of</i>.',
            examples: [['Although he was tired, he finished the work.', 'Embora estivesse cansado, terminou o trabalho.'], ['Despite the price, the product sells well.', 'Apesar do preço, o produto vende bem.'], ['The deadline is tight. However, we can do it.', 'O prazo é apertado. No entanto, conseguimos.']],
            drills: [['___ the traffic, we arrived on time.', ['Despite', 'Although', 'However'], 'Apesar do trânsito, chegamos na hora.'], ['___ she studied a lot, she failed.', ['Although', 'Despite', 'Therefore'], 'Embora tenha estudado muito, ela reprovou.'], ['Costs went up; ___, prices increased.', ['therefore', 'although', 'despite'], 'Os custos subiram; portanto, os preços aumentaram.']]
          }
        },
        {
          title: 'Comunicação profissional', en: 'Business talk', icon: '🗣️',
          words: [
            ['negotiate', 'negociar', '♟️', 'We need to {negotiate} better terms.', 'Precisamos negociar condições melhores.'],
            ['persuade', 'convencer', '🗣️', 'She managed to {persuade} the board.', 'Ela conseguiu convencer a diretoria.'],
            ['schedule', 'agendar', '🗓️', 'Let\'s {schedule} a call for Monday.', 'Vamos agendar uma ligação para segunda.'],
            ['feedback', 'retorno / avaliação', '💬', 'Thanks for the honest {feedback}.', 'Obrigado pelo retorno sincero.'],
            ['stakeholder', 'parte interessada', '👥', 'Every {stakeholder} must approve it.', 'Todas as partes interessadas precisam aprovar.'],
            ['leverage', 'aproveitar / alavancar', '🏋️', 'We can {leverage} our experience.', 'Podemos aproveitar nossa experiência.']
          ],
          grammar: {
            title: 'Discurso indireto (reported speech)',
            rule: 'Ao contar o que alguém disse, o verbo costuma <b>voltar um tempo</b> no passado.',
            table: [['"I work here."', 'He said he worked there.'], ['"I am calling."', 'She said she was calling.'], ['"I will send it."', 'He said he would send it.'], ['"I have finished."', 'She said she had finished.']],
            tip: '<b>Said</b> vem sem objeto, <b>told</b> vem com objeto: <i>She said that...</i> / <i>She told me that...</i>',
            examples: [['She said that she would send the report.', 'Ela disse que enviaria o relatório.'], ['He told me that the meeting was cancelled.', 'Ele me disse que a reunião foi cancelada.'], ['They said they had finished the project.', 'Eles disseram que tinham terminado o projeto.']],
            drills: [['"I am busy." → He said he ___ busy.', ['was', 'is', 'will be'], 'Ele disse que estava ocupado.'], ['She ___ me that the client agreed.', ['told', 'said', 'spoke'], 'Ela me disse que o cliente concordou.'], ['"I will call you." → He said he ___ call me.', ['would', 'will', 'can'], 'Ele disse que me ligaria.']]
          }
        },
        {
          title: 'Mundo e ciência', en: 'Science', icon: '🌍',
          words: [
            ['climate', 'clima', '🌍', 'The {climate} is changing fast.', 'O clima está mudando rápido.'],
            ['research', 'pesquisa', '🔬', 'Her {research} was published.', 'A pesquisa dela foi publicada.'],
            ['evidence', 'evidência / prova', '🧪', 'There is no {evidence} for that.', 'Não há evidência disso.'],
            ['growth', 'crescimento', '🌱', 'The company had strong {growth}.', 'A empresa teve forte crescimento.'],
            ['impact', 'impacto', '💥', 'Social media has a huge {impact}.', 'As redes sociais têm um impacto enorme.'],
            ['sustainable', 'sustentável', '♻️', 'We need {sustainable} solutions.', 'Precisamos de soluções sustentáveis.']
          ],
          grammar: {
            title: 'Desejos e arrependimentos: I wish',
            rule: '<b>I wish</b> expressa um desejo diferente da realidade. O tempo verbal "volta" um passo, como na second e third conditional.',
            table: [['Desejo no presente', 'I wish + passado', 'I wish I spoke French.'], ['Arrependimento', 'I wish + had + particípio', 'I wish I had studied more.'], ['Queria que algo mudasse', 'I wish + would', 'I wish it would stop raining.'], ['If only', 'versão mais enfática', 'If only I had more time!']],
            tip: 'No registro formal, use <b>were</b> para todas as pessoas: <i>I wish I were taller.</i>',
            examples: [['I wish I had more time.', 'Queria ter mais tempo.'], ['I wish I had started earlier.', 'Queria ter começado antes.'], ['If only we had more evidence.', 'Se ao menos tivéssemos mais evidências.']],
            drills: [['I wish I ___ speak Japanese.', ['could', 'can', 'will'], 'Queria saber falar japonês.'], ['I wish I ___ studied harder last year.', ['had', 'have', 'would'], 'Queria ter estudado mais ano passado.'], ['If only it ___ stop raining!', ['would', 'will', 'is'], 'Se ao menos parasse de chover!']]
          }
        }
      ]
    }
  ]
};
