using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using Xceed.Document.NET;
using Xceed.Words.NET;

namespace FridayAPI.Services.TemplateEngine
{
    class TemplateEngine
    {
        public void GenerateWordFile(object sourceTemplateName, object targetFileName, JToken jsonToken)
        {
            if (!File.Exists((string)sourceTemplateName))
                throw new FileNotFoundException("Error: Template file not found while trying to generate document.");
            
            var doc = DocX.Load(sourceTemplateName.ToString());
            var newDoc = doc.Copy();

            ReplaceDocTemplateFields(newDoc, jsonToken);

            try
            {
                newDoc.SaveAs(targetFileName.ToString());
            }
            catch (Exception e)
            {
                throw new IOException("Error: File could not be saved. " + e.ToString());
            }
        }

        private void ReplaceDocTemplateFields(Document doc, JToken jsonObj)
        {
            JsonFieldsParser jsonParser = new JsonFieldsParser(jsonObj);
            Dictionary<string, JValue> fieldList = (Dictionary<string, JValue>)jsonParser.GetAllFields();

            foreach (var field in fieldList)
            {
                doc.ReplaceText($"<{field.Key.Replace("docContents.", "")}>", field.Value.ToString());
            }
        }
    }
}
