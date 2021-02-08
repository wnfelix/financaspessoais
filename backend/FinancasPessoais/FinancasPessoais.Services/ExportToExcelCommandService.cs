using CommonHelpers.Extensions;
using ExcelDocumentToolKit.CrossCutting.Infra.OpenXml;
using ExcelDocumentToolKit.Domain.IServices;
using FinancasPessoais.Data.Repositories;
using FinancasPessoais.Domain;
using FinancasPessoais.Services.Helper;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FinancasPessoais.Services
{
    public class ExportToExcelCommandService : IExportToExcelCommandService
    {
        private IDominioRepository _dominioRepository;
        private IExcelDocumentService _excelDocumentService;

        public ExportToExcelCommandService(IDominioRepository dominioRepository,
            IExcelDocumentService excelDocumentService)
        {
            _dominioRepository = dominioRepository;
            _excelDocumentService = excelDocumentService;
        }

        public void ExportExcel(string filePathSource, string filePathTarget)
        {
            var dados = _excelDocumentService.OpenExcelDocument(filePathSource).ReadExcelDocument<DebitoData>(0, true);
            var minDate = dados.Select(d => d.Data).Min();
            var lstEstabelecimentos = _dominioRepository.List<Estabelecimento>().OrderByDescending(e => e.PalavraChave.Length);
            var prefixos = _dominioRepository.FindBy<ClassificacaoExtra>(x => x.DataInicio >= minDate);

            var arquivos = new Dictionary<string, List<DebitoData>>();
            var qtdEstab = new Dictionary<string, int>();

            foreach (var item in dados)
            {
                var estab = lstEstabelecimentos.FirstOrDefault(e => Regex.IsMatch(item.Local.Replace("*", string.Empty).ToUpper(), e.PalavraChave.ToUpper().LikeToRegular()));
                var prefixoExtra = prefixos.Where(x => x.DataInicio <= item.Data && x.DataFim >= item.Data).FirstOrDefault();

                if (estab != null)
                {
                    #region Mudando a classificação de uma compra específica na data
                    
                    var estabKey = $"{estab.Id}{item.Data}";
                    if (!qtdEstab.ContainsKey(estabKey)) qtdEstab[estabKey] = 0;
                    qtdEstab[estabKey] += 1;

                    //item.Valor = Convert.ToDecimal(item.Valor, new CultureInfo("en-US")).ToString();
                    var descricaoExtra = _dominioRepository.FindBy<DescricaoExtra>(x => x.DataCompra == item.Data && x.Estabelecimento.Id == estab.Id && qtdEstab[estabKey] == x.IndiceCompra)
                                                            .FirstOrDefault();

                    if (descricaoExtra != null)
                    {
                        item.Local = $"{descricaoExtra.Descricao}-{item.Local}";
                        estab = new Estabelecimento { Classificacao = descricaoExtra.Classificacao };
                    }

                    #endregion
                }else
                    estab = new Estabelecimento { Classificacao = prefixoExtra != null ? prefixoExtra.Classificacao : new TipoDominio { Descricao = "DESCONHECIDO" } };

                #region Adicionando prefixo por range de data

                if (prefixoExtra != null)
                    item.Local = string.Concat(prefixoExtra.Prefixo, item.Local);

                #endregion


                if (!arquivos.ContainsKey(estab.Classificacao.Descricao))
                    arquivos.Add(estab.Classificacao.Descricao, new List<DebitoData> { new DebitoData { Local = item.Local, Data = item.Data, Valor = item.Valor } });
                else
                    arquivos[estab.Classificacao.Descricao].Add(new DebitoData { Local = item.Local, Data = item.Data, Valor = item.Valor });
            }

            _excelDocumentService.WriteExcelDocument(filePathTarget, arquivos);
            //excelApp.CloseExcelDocument();
        }
    }
}
