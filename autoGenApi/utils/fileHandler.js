import Path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import fetch from 'node-fetch';
import { print } from "./helpers.js";

export default class FileHandler {
	static async sourceToJson(source) {
		let folderName = ''
		let sourceJson = null
		if (source.startsWith('http')) {
			const urlObj = new URL(source);
			const pathSegments = urlObj.pathname.split('/').filter(segment => segment.length > 0);
			folderName = pathSegments[0];
			sourceJson = await this.fetchJsonFromUrl(source);
		} else {
			folderName = source.split('.').shift();
			const swaggerJsonPath = this.joinPaths({ destination: source })
			sourceJson = this.readJsonFileByPath(swaggerJsonPath);
		}
		return { folderName, sourceJson }
	}
	static getCurrentProject() {
		const __filename = fileURLToPath(import.meta.url);
		const currentDir = Path.dirname(__filename);
		const projectRootDir = Path.dirname(currentDir);
		const projectRootsDir = Path.dirname(projectRootDir);
		return projectRootsDir;
	}
	static getCurrentDirName() {
		const __filename = fileURLToPath(import.meta.url);
		return Path.dirname(__filename);
	}
	static getFileByPath(filePath) {
		return fs.readFileSync(filePath, 'utf8');
	}
	static readJsonFileByPath(filePath) {
		return JSON.parse(this.getFileByPath(filePath));
	}
	static checkFolderExist(folderPath) {
		if (!fs.existsSync(folderPath)) {
			fs.mkdirSync(folderPath, { recursive: true });
		}
	}
	static async fetchJsonFromUrl(url) {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`${url} 獲取不到資料`);
			}
			return await response.json();
		}catch (error) {
			print('error', error.message);
		}
	}
	static joinPaths({ folder, destination }) {
		const currentDir = this.getCurrentDirName()
		return Path.join(`${currentDir}${folder ? '/' + folder : ''}`, destination);
	}
}