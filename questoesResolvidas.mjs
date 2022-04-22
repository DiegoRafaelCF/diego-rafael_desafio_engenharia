import LeitorDeCodigo from "./LeitorDeCodigo.mjs";
import codigos from "./arrayDeCodigos.mjs";

// OBS: para auxiliar na resolução de todas as questões, utilizei uma classe que eu criei (LeitorDeCodigo) e um array (codigos). Essa classe recebe um código de barra como parâmetro no constructor e com o método 'analisar()' podemos obter um objeto com as informações principais do envio. Já esse array foi criado com os códigos dos pacotes para permitir loops.

// Resolução das questões

/*
Nome: Diego Rafael Carvalho Farias
Universidade: UNINASSAU
Curso: Análise e Desenvolvimento de Sistemas
Data prevista para a conclusão: dezembro/2023
Semestre atual: 1º Semestre
*/

// 1.Identificar a região de destino de cada pacote, com totalização de pacotes (soma região);

// Relatório da questão: Na primeira etapa eu criei um objeto (resposta1) para armazenar o total de pacotes por região. A segunda etapa consiste em um loop (for...of) para percorrer o array de códigos. Dentro do laço de repetição é instanciada uma classe que através do método 'analisar()' retorna uma série de informações úteis sobre o envio (região de origem, região de destino, código da Loggi, código do vendedor, tipo de produto e uma chave 'pacoteInvalido'). Através dessas informações verifico a região de destino, e em seguida pontuo a chave (região) correspondente. Por último imprimo o resultado. OBS: Está faltando um destino por causa do pacote 13, ele tem como código de destino ('000').

const resposta1 = {
    totalCentroOeste: 0,
    totalNordeste: 0,
    totalNorte: 0,
    totalSudeste: 0,
    totalSul: 0
};

for(let codigo of codigos) {
    const informacoes = new LeitorDeCodigo(codigo).analisar()
    if(informacoes.regiaoDestino == 'Centro-oeste') resposta1.totalCentroOeste++;
    if(informacoes.regiaoDestino == 'Nordeste') resposta1.totalNordeste++;
    if(informacoes.regiaoDestino == 'Norte') resposta1.totalNorte++;
    if(informacoes.regiaoDestino == 'Sudeste') resposta1.totalSudeste++;
    if(informacoes.regiaoDestino == 'Sul') resposta1.totalSul++;
};

console.log('Questão 1: ', resposta1)

// 2.Saber quais pacotes possuem códigos de barras válidos e/ou inválidos;

// Relatório da questão: Diferente do primeiro exercício, aqui eu utilizei um laço de repetição for...in para usar a posição do código dentro do array, e obter o número do pacote somando +1. As etapas seguiram o mesmo caminho do primeiro desafio. Dentro da minha classe eu criei uma chave chamada 'pacoteInvalido' que retorna true caso o pacote esteja inválido e false caso o pacote esteja válido. Com o valor dessa chave eu pude (dentro do laço de repetição) separar as respostas. OBS: O pacote 11 está inválido pois a o código da região de destino é '555'

const resposta2 = {
    pacotesValidos: [],
    pacotesInvalidos: []
};

for(let pos in codigos) {
    const informacoes = new LeitorDeCodigo(codigos[pos]).analisar();
    if(informacoes.pacoteInvalido) {
        resposta2.pacotesInvalidos.push(++pos);
        continue;
    };
    resposta2.pacotesValidos.push(++pos);
};

console.log('Questão 2: ', resposta2);

// 3.Identificar os pacotes que têm como origem a região Sul e Brinquedos em seu conteúdo;

// Relatório da questão: Resolvi da mesma forma que a questão 1 e 2. Usei o laço de repetição for...in para conseguir o número do pacote. Em seguida eu fiz um 'if' que analisa duas condicionais unidas pelo conectivo && (and), se ambas forem true, o pacote entra no array da resposta.

const resposta3 = [];

for(let pos in codigos) {
    const informacoes = new LeitorDeCodigo(codigos[pos]).analisar()
    if(informacoes.regiaoOrigem == 'Sul' && informacoes.tipoProduto == 'Brinquedos') resposta3.push(`Pacote: ${++pos}`)
};

console.log('Questão 3: ', resposta3);

// 4.Listar os pacotes agrupados por região de destino (Considere apenas pacotes válidos);

// Relatório da questão: Aqui eu fiz uma junção da resolução da primeira com a segunda questão. A única diferença no formado é que antes de separar os pacotes por região, foi utilizado uma condicional para tratar só os códigos válidos.

const resposta4 = {
    pacotesCentroOeste: [],
    pacotesNordeste: [],
    pacotesNorte: [],
    pacotesSudeste: [],
    pacotesSul: []
}

for(let pos in codigos) {
    const informacoes = new LeitorDeCodigo(codigos[pos]).analisar()
    if(informacoes.pacoteInvalido == false) {
        if(informacoes.regiaoDestino == 'Centro-oeste') resposta4.pacotescentroOeste.push(++pos);
        if(informacoes.regiaoDestino == 'Nordeste') resposta4.pacotesNordeste.push(++pos);
        if(informacoes.regiaoDestino == 'Norte') resposta4.pacotesNorte.push(++pos);
        if(informacoes.regiaoDestino == 'Sudeste') resposta4.pacotesSudeste.push(++pos);
        if(informacoes.regiaoDestino == 'Sul') resposta4.pacotesSul.push(++pos);
    }
};

console.log('Questão 4: ', resposta4);

// 5.Listar o número de pacotes enviados por cada vendedor (Considere apenas pacotes válidos);

// Relatório da questão: Para resolver essa questão eu usei a mesma estrutura na questão 1, com a diferença que aqui tem uma condicional dentro do laço de repetição que verifica se o pacote é válido.

const resposta5 = {
    vendedor123: 0,
    vendedor124: 0,
    vendedor584: 0,
    vendedor654: 0,
    vendedor845: 0,
    vendedor874: 0
}

for(let codigo of codigos) {
    const informacoes = new LeitorDeCodigo(codigo).analisar()
    if(informacoes.pacoteInvalido == false) {
        if(informacoes.codigoVendedor == 123) resposta5.vendedor123++;
        if(informacoes.codigoVendedor == 124) resposta5.vendedor124++;
        if(informacoes.codigoVendedor == 584) resposta5.vendedor584++;
        if(informacoes.codigoVendedor == 654) resposta5.vendedor654++;
        if(informacoes.codigoVendedor == 845) resposta5.vendedor845++;
        if(informacoes.codigoVendedor == 874) resposta5.vendedor874++;
    }
};

console.log('Questão 5: ', resposta5);

// 6.Gerar o relatório/lista de pacotes por destino e por tipo (Considere apenas pacotes válidos);

// Relatório da questão: Neste exercício eu criei um array vazio e através de um for...in e uma condicional para verificar se o pacote é válido eu percorri todo o array de códigos. A única diferença para as outras questões é que aqui não é só uma informação que vai para dentro do array e sim um objeto contendo três informações (número do pacote, região de destino e tipo de produto)

const resposta6 = []

for(let pos in codigos) {
    const informacoes = new LeitorDeCodigo(codigos[pos]).analisar()
    if(informacoes.pacoteInvalido == false) {
        resposta6.push({
            pacote: ++pos,
            regiaoDestino: informacoes.regiaoDestino,
            tipoProduto: informacoes.tipoProduto
        })
    }
};

console.log('Questão 6: ', resposta6);

// 7.Se o transporte dos pacotes para o Norte passa pela Região Centro-Oeste, quais são os pacotes que devem ser despachados no mesmo caminhão?

// Relatório da questão: Pelo que entendi a resposta deve conter os pacotes dos destinos Norte e Centro-oeste já que o caminhão passa pelas duas regiões. Para filtrar os pacotes eu usei um for...in para percorrer todo o array de códigos e através de uma condicional || (OR) adquiri o resultado.

const resposta7 = [];

for(let pos in codigos) {
    const informacoes = new LeitorDeCodigo(codigos[pos]).analisar();
    if(informacoes.regiaoDestino == 'Norte' || informacoes.regiaoDestino == 'Centro-oeste') resposta7.push(`pct-${++pos}`);
}

console.log('Questão 7: ', resposta7);

// 8.Se todos os pacotes fossem uma fila qual seria a ordem de carga para o Norte no caminhão para descarregar os pacotes da Região Centro Oeste primeiro;

// Relatório da questão: Se entendi bem o enunciado, nessa tal fila para carregar o caminhão, o produto que tem a necessidade de sair primeiro tem que ser o último da fila, ou seja, o último a entrar no caminhão - UEPS (último a entrar, primeiro a sair). Neste caso eu criei uma solução bem parecida com as resoluções anteriores, só que as condicionais estão separadas. Se a região de destino for Norte eu utilizei o método 'unshit()' para adicionar um item no começo do array, e caso seja Centro-oeste eu utilizei o 'push()' para adicionar um valor no final do array. Assim todos os pacotes para o Centro-oeste ficam no fim da fila.

const resposta8 = [];

for(let pos in codigos) {
    const informacoes = new LeitorDeCodigo(codigos[pos]).analisar();
    if(informacoes.regiaoDestino == 'Norte') resposta8.unshift(`pct-${++pos}`);
    if(informacoes.regiaoDestino == 'Centro-oeste') resposta8.push(`pct-${++pos}`);
}

console.log('Questão 8: ', resposta8);

// 9.No item acima considerar que as jóias fossem sempre as primeiras a serem descarregadas;

// Relatório da questão: Seguindo a mesma lógica da questão anterior, a única coisa que muda é a posição dos dois pacotes com destino Norte. Assim a fila passa de (pct-17, pct-16, pct-11) para (pct-16, pct-17, pct-11). Trabalhei com 2 for...in, o primeiro serve como um separador, ou seja, ele verifica se o pacote vai para a região Norte ou Centro-oeste, e se o seu conteúdo é ou nao é Jóias. Depois da separação o próximo loop se encarrega de colocar os pacotes dentro do array de resposta. O segundo 'for' também se encarrega de verificar se alguma chave do objeto 'divisor' está vazia para descarte.

const resposta9 = []

const divisor = {
    norte: [],
    norteComJoia: [],
    centroOeste: [],
    centroOesteComJoia: []
}

for(let pos in codigos) {
    const informacoes = new LeitorDeCodigo(codigos[pos]).analisar();
    if(informacoes.regiaoDestino == 'Norte') {
        if(informacoes.tipoProduto == 'Jóias') {
            divisor.norteComJoia.push(`pct-${++pos}`)
        } else {
            divisor.norte.push(`pct-${++pos}`)
        };
    };
    if(informacoes.regiaoDestino == 'Centro-oeste') {
        if(informacoes.tipoProduto == 'Jóias') {
            divisor.centroOesteComJoia.push(`pct-${++pos}`)
        } else {
            divisor.centroOeste.push(`pct-${++pos}`)
        };
    }
};

for(let pos in divisor) {
    if(divisor[pos].length) resposta9.push(...divisor[pos])
}

console.log('Questão 9: ', resposta9);

// 10.Listar os pacotes inválidos;

// Relatório da questão: Utilizei a mesma fórmula da segunda questão. Junto com o laço de repetição e uma condicional verificando se o código tem algum erro consegui listar todos os pacotes inválidos.

const resposta10 = [];

for(let pos in codigos) {
    const informacoes = new LeitorDeCodigo(codigos[pos]).analisar()
    if(informacoes.pacoteInvalido) resposta10.push(`pct-${++pos}`)
};

console.log('Questão 10: ', resposta10);