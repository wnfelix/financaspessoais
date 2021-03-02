import IEntidadeGenerica from "./IEntidadeGenerica";

export default interface IEstabelecimento {
    id: string,
    descricao: string,
    palavraChave: string,
    classificacao: IEntidadeGenerica
}