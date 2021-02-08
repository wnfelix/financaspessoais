using CommonHelpers.Base.Transformer;
using FinancasPessoais.Data.Repositories;
using FinancasPessoais.Domain;
using FinancasPessoais.Services;
using FinancasPessoais.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace FinancasPessoais.WebAPI.Controllers
{
    [Authorize]
    public class TipoDominioController : ApiController
    {
        private IDominioRepository _dominioRepository;
        private IEstabelecimentoCommandService _estabelecimentoCommandService;
        private ITransformer<TipoDominio, TipoDominioModel> _tipoDominioTransformer;

        public TipoDominioController(IDominioRepository dominioRepository,
            IEstabelecimentoCommandService estabelecimentoCommandService,
            ITransformer<TipoDominio, TipoDominioModel> tipoDominioTransformer)
        {
            _dominioRepository = dominioRepository;
            _estabelecimentoCommandService = estabelecimentoCommandService;
            _tipoDominioTransformer = tipoDominioTransformer;
        }

        [HttpGet]
        public IHttpActionResult Listar(int idDominio)
        {
            return Ok(_dominioRepository.FindBy<TipoDominio>(x => x.Dominio.Id == idDominio)
                .Select(x => _tipoDominioTransformer.Transform(x)));
        }

        [HttpGet]
        public IHttpActionResult Show(int id)
        {
            var tipoDominio = _dominioRepository.FindBy<TipoDominio>(x => x.Id == id);
            return Ok(tipoDominio.Select(d => _tipoDominioTransformer.Transform(d)));
        }

        [HttpPost]
        public IHttpActionResult Save([FromBody]TipoDominioModel tipoDominio)
        {
            return Ok(_estabelecimentoCommandService.Salvar(_tipoDominioTransformer.Reverse(tipoDominio)));
        }
    }
}