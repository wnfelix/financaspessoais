using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinancasPessoais.WebAPI.Models
{
    public class DescricaoExtraModel : EntidadeGenericaModel<int>
    {
        public EntidadeGenericaModel<int> Estabelecimento { get; set; }
        public EntidadeGenericaModel<int> Classificacao { get; set; }
        public DateTime DataCompra { get; set; }
        public byte IndiceCompra { get; set; }
    }
}