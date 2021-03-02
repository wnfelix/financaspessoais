using FinancasPessoais.Domain;
using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancasPessoais.Data.Maps
{
    public class UsuarioMap : ClassMap<Usuario>
    {
        public UsuarioMap()
        {
            Table("Usuarios");
            Id(x => x.Id);
            Map(x => x.Nome);
            Map(x => x.SobreNome);
            Map(x => x.UltimoNome);
            Map(x => x.Senha);
            Map(x => x.Ativo);
            Map(x => x.Email);
        }
    }
}
