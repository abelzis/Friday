using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FridayAPI.Common.FileUpload
{
    public class FileUploadModel
    {
        public List<File> FileList { get; set; }

        public FileUploadModel()
        {
            FileList = new List<File>();
        }

        public void AddToList(string name)
        {
            FileList.Add(new File(name));
        }

        public class File
        {
            public string Name { get; set; }

            public File(string name)
            {
                Name = name;
            }
        }
    }
}
