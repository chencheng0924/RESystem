import fs from "fs";
import Path from "path";
import mustache from 'mustache';
import FileHandler from "./fileHandler.js";

export default class MustacheHandler {
	template;
	constructor({ template, view, fileName, folderName, outputDir }) {
		this.readMustacheTemplate(template)
		this.view = view;
		this.fileName = fileName;
		this.folderName = folderName;
		this.outputDir = outputDir;
	}
	readMustacheTemplate(templateSourceFile) {
		const templatePath = FileHandler.joinPaths({ folder: `../templates`, destination: templateSourceFile })
		this.template = FileHandler.getFileByPath(templatePath);
	}
	renderMustacheTemplate() {
		if (this.view) {
			return mustache.render(this.template, this.view);
		} else {
			return mustache.render(this.template);
		}
	}
	generateFile() {
		const targetFolderPath = this.outputDir ? `${FileHandler.getCurrentProject()}${this.outputDir}/${this.folderName}` : `${FileHandler.getCurrentDirName()}/${this.folderName}`;
		FileHandler.checkFolderExist(targetFolderPath);
		const outputPaths = Path.join(targetFolderPath, this.fileName);
		fs.writeFileSync(outputPaths, this.renderMustacheTemplate());
	}
}