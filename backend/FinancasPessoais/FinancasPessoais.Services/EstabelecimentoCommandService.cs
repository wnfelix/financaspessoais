using CommonHelpers;
using FinancasPessoais.Data.Repositories;
using FinancasPessoais.Domain;
using FinancasPessoais.Services.Validators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinancasPessoais.Services
{
    public class EstabelecimentoCommandService : IEstabelecimentoCommandService
    {
        private IDominioRepository _dominioRepository;
        private IValidator<Estabelecimento> _estabelecimentoValidator;

        public EstabelecimentoCommandService(IDominioRepository dominioRepository,
            IValidator<Estabelecimento> estabelecimentoValidator)
        {
            _dominioRepository = dominioRepository;
            _estabelecimentoValidator = estabelecimentoValidator;
        }

        public Estabelecimento Salvar(Estabelecimento estabelecimento)
        {
            var atual = estabelecimento.Id == 0 ? estabelecimento : _dominioRepository.Get<Estabelecimento>(estabelecimento.Id);

            atual.Classificacao = _dominioRepository.Get<TipoDominio>(estabelecimento.Classificacao.Id);
            if (estabelecimento.Id > 0)
                ReflectionHelper.CopyPrimitiveValues(estabelecimento, atual, "Ativo");

            _dominioRepository.Save(atual);

            return atual;
        }

        public TipoDominio Salvar(TipoDominio tipoDominio)
        {
            var atual = tipoDominio.Id == 0 ? tipoDominio : _dominioRepository.Get<TipoDominio>(tipoDominio.Id);

            atual.Dominio = _dominioRepository.Get(tipoDominio.Dominio.Id);
            if (tipoDominio.Id > 0)
                ReflectionHelper.CopyPrimitiveValues(tipoDominio, atual, "Ativo");

            _dominioRepository.Save(atual);

            return atual;
        }

        public void ApagarEstabelecimento(int id)
        {
            var estab = _dominioRepository.Get<Estabelecimento>(id);
            estab.Ativo = false;
            _dominioRepository.Save(estab);
        }
    }
}
