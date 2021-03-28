using FinancasPessoais.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancasPessoais.Services
{
    public interface IEstabelecimentoCommandService
    {
        Estabelecimento Salvar(Estabelecimento estabelecimento);
        TipoDominio Salvar(TipoDominio tipoDominio);
        void ApagarEstabelecimento(int id);
    }
}
