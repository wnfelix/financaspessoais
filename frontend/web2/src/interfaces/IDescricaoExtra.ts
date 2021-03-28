import IEntidadeGenerica from "./IEntidadeGenerica";
import IEstabelecimento from "./IEstabelecimento";

export default interface IDescricaoExtra{
    id: string,
    estabelecimento: IEstabelecimento,
    classificacao: IEntidadeGenerica,
    descricao: string,
    dataCompra: Date,
    indiceCompra: number
}