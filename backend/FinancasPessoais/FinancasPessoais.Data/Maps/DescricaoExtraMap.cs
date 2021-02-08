using FinancasPessoais.Domain;
using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancasPessoais.Data.Maps
{
    public class DescricaoExtraMap : ClassMap<DescricaoExtra>
    {
        public DescricaoExtraMap()
        {
            Id(x => x.Id).GeneratedBy.Identity();
            References(x => x.Estabelecimento, "IdEstabelecimento");
            References(x => x.Classificacao, "IdClassificacao");
            Map(x => x.Descricao);
            Map(x => x.DataCompra);
            Map(x => x.IndiceCompra);
            Map(x => x.Ativo);
        }
    }
}
