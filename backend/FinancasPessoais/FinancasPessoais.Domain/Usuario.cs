using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancasPessoais.Domain
{
    public class Usuario : BaseDomain<int>
    {
        public virtual string Nome { get; set; }
        public virtual string SobreNome { get; set; }
        public virtual string UltimoNome { get; set; }
        public virtual string Email { get; set; }
        public virtual byte[] Senha { get; set; }
        public virtual bool Ativo { get; set; }
    }
}
