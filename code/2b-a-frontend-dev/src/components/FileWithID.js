class FileWithID {
	constructor(fileContent, step_number, image_number){
    	this.fileContent = fileContent;
      this.step_number = step_number;
      this.image_number = image_number;
    }
  	displayInfo(){
    	return "" + this.step_number + "." + this.image_number + ".jpg";
    }
}

export default FileWithID