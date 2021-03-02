using FinancasPessoais.Data.Repositories;
using FinancasPessoais.Domain;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace FinancasPessoais.WebAPI.Helpers
{
    public class OAuthTokenProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            if (ValidaUsuarioAutorizado(context.UserName, context.Password))
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim("sub", context.UserName));
                identity.AddClaim(new Claim("role", "user"));
                context.Validated(identity);
            }
            else
            {
                context.SetError("acesso inválido", "As credenciais do usuário não conferem....");
            }
        }

        private bool ValidaUsuarioAutorizado(string nome, string senha)
        {
            var autorizado = false;
            var repo = (IDominioRepository)GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(IDominioRepository));

            var usuario = repo.FindBy<Usuario>(x => x.Nome == nome && x.Ativo).FirstOrDefault();
            if (usuario != null && usuario.Senha != null)
            {
                using (var encrypt = new SHA512Managed())
                {
                    var hash = encrypt.ComputeHash(System.Text.Encoding.UTF8.GetBytes(senha));
                    autorizado = hash.SequenceEqual(usuario.Senha);
                }
            }

            return autorizado;
        }
    }
}