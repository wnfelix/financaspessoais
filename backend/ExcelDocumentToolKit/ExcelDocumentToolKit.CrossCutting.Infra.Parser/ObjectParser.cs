using ExcelDocumentToolKit.CrossCutting.Infra.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;

namespace ExcelDocumentToolKit.CrossCutting.Infra.Parser
{
    public class ObjectParser
    {
        private static CultureInfo _culture = CultureInfo.CurrentCulture;

        public static void SetCulture(CultureInfo culture)
        {
            _culture = culture;
        }

        public static void FillInstance<TObject>(TObject instance, List<string[]> excelColumns) where TObject : class
        {
            var numericTypes = new Type[] { typeof(decimal), typeof(int), typeof(double), typeof(long) };
            var properties = typeof(TObject).GetProperties();

            foreach (var prop in properties)
            {
                string[] excelCell = null;

                if (prop.GetCustomAttributes(typeof(ExcelColumnAttribute), false).FirstOrDefault() is ExcelColumnAttribute attr)
                {
                    //recuperando valor pelo atributo columntitle
                    if (!string.IsNullOrEmpty(attr.ColumnTitle))
                        excelCell = excelColumns.FirstOrDefault(c => c[0].ToUpper() == attr.ColumnTitle.Replace(" ", string.Empty).ToUpper());

                    //recuperando valor pelo atributo columnindex
                    if (excelCell == null && attr.ColumnIndex > -1 && excelColumns.Count() >= attr.ColumnIndex + 1)
                        excelCell = excelColumns[attr.ColumnIndex];
                }

                //recuperando valor pelo nome da propriedade
                if (excelCell == null)
                    excelCell = excelColumns.FirstOrDefault(c => c[0].ToUpper() == prop.Name.ToUpper());

                if (excelCell != null)
                {
                    if (prop.PropertyType == typeof(DateTime) || prop.PropertyType == typeof(DateTime?))
                    {
                        var parameters = new
                        {
                            Style = System.Globalization.NumberStyles.Number,
                            Globalization = CultureInfo.GetCultureInfo("en-US")
                        };

                        if (double.TryParse(excelCell[1], parameters.Style, parameters.Globalization, out double result))
                            prop.SetValue(instance, DateTime.FromOADate(result));
                        else if (DateTime.TryParse(excelCell[1], out DateTime dateParsed))
                            prop.SetValue(instance, dateParsed);
                        else
                            prop.SetValue(instance, TypeDescriptor.GetConverter(prop.PropertyType).ConvertFromInvariantString(excelCell[1]));
                    }
                    else if (prop.PropertyType == typeof(decimal))
                    {
                        if (decimal.TryParse(excelCell[1], NumberStyles.Number, CultureInfo.InvariantCulture, out decimal decValue))
                            prop.SetValue(instance, TypeDescriptor.GetConverter(prop.PropertyType).ConvertFromInvariantString(excelCell[1]));
                    }
                    else if (!string.IsNullOrEmpty(excelCell[1]))
                        prop.SetValue(instance, TypeDescriptor.GetConverter(prop.PropertyType).ConvertFromString(excelCell[1]), System.Reflection.BindingFlags.Default, null, null, _culture);
                }
            }
        }

        public static List<string> FillExcelObject(object instanceObject)
        {
            var instanceObjectProperties = instanceObject.GetType().GetProperties();
            var row = new List<string>();
            foreach (var prop in instanceObjectProperties)
            {
                var value = prop.GetValue(instanceObject);
                if (value != null)
                    row.Add(value.ToString());
            }
            return row;
        }

        public static List<string> GetValuesFromObject(object entityObject, List<string> excelColumns, string dateFormat = "dd/MM/yyyy HH:mm:ss")
        {
            var properties = entityObject.GetType().GetProperties();
            var values = new List<string>();

            foreach (var column in excelColumns)
            {
                string excelCell = string.Empty;

                foreach (var prop in properties)
                {
                    if (prop.GetCustomAttributes(typeof(ExcelColumnAttribute), false).FirstOrDefault() is ExcelColumnAttribute attr)
                    {
                        //recuperando valor pelo atributo columntitle
                        if (!string.IsNullOrEmpty(attr.ColumnTitle) && attr.ColumnTitle.ToUpper() == column.ToUpper())
                        {
                            if (prop.PropertyType == typeof(DateTime))
                                excelCell = ((DateTime)prop.GetValue(entityObject)).ToString(dateFormat);
                            else if (prop.PropertyType == typeof(DateTime?))
                            {
                                var value = (DateTime?)prop.GetValue(entityObject);
                                if (value.HasValue)
                                    excelCell = value.Value.ToString(dateFormat);
                            }
                            else
                                excelCell = prop.GetValue(entityObject).ToString();
                            break;
                        }
                    }
                }

                values.Add(excelCell);
            }

            return values;
        }
    }
}
