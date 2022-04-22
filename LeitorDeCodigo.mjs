export default class LeitorDeCodigo {
    constructor(codigo) {
        this.codigo = codigo; // Serve para armazenar o código de entrada.
        this.invalido = false; // Serve para dizer se o pacote é válido ou inválido.
        this.codigoArray = []; // Serve para armazenar o código em 5 grupos de 3 números cada.
    };

    // Aqui eu criei um método 'analisar' que está fazendo o papel de motor principal da minha classe, é com ele que eu vou montar o 'cartão' com as informações principais para o transporte.
    analisar() {
        this.validar();

        return {
            regiaoOrigem: this.checarRota(0),
            regiaoDestino: this.checarRota(1),
            codigoLoggi: this.codigoArray[2],
            codigoVendedor: this.codigoArray[3],
            tipoProduto: this.checarProduto(),
            pacoteInvalido: this.invalido
        }
    };

    // Nesta parte eu criei um método 'validar' que tem a função de verificar se o código de entrada está inválido por alguma questão.
    validar() {
        this.tratarCodigo();

        if(this.checarProduto() == 'inválido') this.invalido = true; // Verifica se o código do produto é válido.
        if(this.checarRota(0) == 'Centro-oeste' && this.checarProduto() == 'Jóias') this.invalido = true; // Verifica se o envio é válido.
        if(this.codigoArray[3] == 367) this.invalido = true; // Verifica se o vendedor é válido.
        if(this.checarRota(0) == 'inválido' || this.checarRota(1) == 'inválido') this.invalido = true; // Verifica se o código da rota é válido.
    };

    // 'checarRota' tem a função de transformar o código para os nomes das regiões. Através do parâmetro 'flag' eu posso transformar o codigo de origem (flag:0) ou destino (flag:1).
    checarRota(flag) {
        const codigoRota = this.codigoArray[flag];

        if(codigoRota >= 1 && codigoRota <= 99) return 'Sudeste';
        if(codigoRota >= 100 && codigoRota <= 199) return 'Sul';
        if(codigoRota >= 201 && codigoRota <= 299) return 'Centro-oeste';
        if(codigoRota >= 300 && codigoRota <= 399) return 'Nordeste';
        if(codigoRota >= 400 && codigoRota <= 499) return 'Norte';

        return 'inválido';
    }

    // 'checarProduto' funciona igual ao método 'checarRota' com a diferença de não usar flag.
    checarProduto() {
        const codigoProduto = this.codigoArray[4];

        if(codigoProduto == 1) return 'Jóias';
        if(codigoProduto == 111) return 'Livros';
        if(codigoProduto == 333) return 'Eletrônicos';
        if(codigoProduto == 555) return 'Bebidas';
        if(codigoProduto == 888) return 'Brinquedos';

        return 'inválido';
    }

    // Esse método vai me ajudar a tratar o código para usar nos outros métodos.
    tratarCodigo() {
        const codigoArray = this.codigo.split(''); // Primeiro eu transformo o código(string) em um array.
        let grupo = [];

        // Aqui eu utilizo um laço de repetição que tem a função básica de percorrer todo o array. A cada loop o valor atual é inserido dentro da variável 'grupo'. Quando essa variável passar a conter 3 números, o seu conteúdo é enviado para 'códigoArray' e seu conteúdo é limpo para a próxima iteração
        codigoArray.forEach(num => {
            grupo.push(num);
            if(grupo.length == 3) {
                this.codigoArray.push(parseInt(grupo.join('')));
                grupo = [];
            }
        });
    };
};