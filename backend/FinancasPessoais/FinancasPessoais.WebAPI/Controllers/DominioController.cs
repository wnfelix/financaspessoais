using CommonHelpers.Base.Transformer;
using CommonHelpers.Constants;
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
    //[Authorize]
    public class DominioController : ApiController
    {
        private ITransformer<TipoDominio, TipoDominioModel> _tipoDominioTransformer;
        private IDominioRepository _dominioRepository;
        private IEstabelecimentoCommandService _estabelecimentoCommandService;

        public DominioController(IDominioRepository dominioRepository,
            IEstabelecimentoCommandService estabelecimentoCommandService,
            ITransformer<TipoDominio, TipoDominioModel> tipoDominioTransformer)
        {
            _dominioRepository = dominioRepository;
            _estabelecimentoCommandService = estabelecimentoCommandService;
            _tipoDominioTransformer = tipoDominioTransformer;
        }

        [HttpGet]
        public IHttpActionResult Listar()
        {
            return Ok(_dominioRepository.List().Select(x => new { x.Id, x.Descricao }));
        }

        //[HttpGet]
        //public IHttpActionResult Show(int id)
        //{
        //    return Ok(_tipoDominioTransformer.Transform(_dominioRepository.Get<TipoDominio>(id)));
        //}
    }
}