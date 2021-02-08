using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancasPessoais.Domain
{
    public class DescricaoExtra : BaseDomain<int>
    {
        public virtual Estabelecimento Estabelecimento { get; set; }
        public virtual TipoDominio Classificacao { get; set; }
        public virtual string Descricao { get; set; }
        public virtual DateTime DataCompra { get; set; }
        public virtual byte IndiceCompra { get; set; }
        public virtual bool Ativo { get; set; }
    }
}
