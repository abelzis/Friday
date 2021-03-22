using System;
using System.IO;
using Xceed.Words.NET;

namespace FridayAPI.Services.TemplateEngine
{
    class TemplateEngine
    {
        public void GenerateWordFile(object sourceTemplateName, object targetFileName)
        {
            if (File.Exists((string)sourceTemplateName))
            {
                var doc = DocX.Load(sourceTemplateName.ToString());
                var newDoc = doc.Copy();

                newDoc.ReplaceText("<text>", "Placeholder text");

                try
                {
                    newDoc.SaveAs(targetFileName.ToString());
                }
                catch (Exception e)
                {
                    throw new IOException("Error: File could not be saved. " + e.ToString());
                }
            }
            else
            {
                throw new FileNotFoundException("Error: Template file not found while trying to generate document.");
            }
        }
    }
}
