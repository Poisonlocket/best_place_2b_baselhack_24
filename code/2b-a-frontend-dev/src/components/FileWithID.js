class FileWithID {
	constructor(fileContent, step_number, file_number, isImage) {
    	this.fileContent = fileContent;
      this.step_number = step_number;
      this.file_number = file_number;
      this.isImage = isImage;
    }
  	displayInfo(){
    	return "" + this.step_number + "." + this.file_number + (this.isImage ? ".jpg" : ".ogg");
    }
}

export default FileWithID