import fs from "fs";
import Path from "path";
const typeTransfer = {
  "integer": "number",
  "array": "Array<BaseKeyValue>",
  "boolean": "boolean",
  "string": "string",
  "object": "object",
  "number": "number",
  "null": "null"
};

class genApi {

  getAPiFile(name) {
    let path = `./autogenPageTemplate/${name}.json`;
    var data = fs.readFileSync(path, 'utf8');
    const parsedData = JSON.parse(data);
    let model = parsedData["components"]["schemas"];
    //console.log(model);
    return model;
  }

  getTemplateFile(name) {
    let path = `./autogenPageTemplate/${name}`;
    var data = fs.readFileSync(path, 'utf8');
    //console.log(data);
    return data;
  }

  getConfigFile(name) {
    let path = `./autogenPageTemplate/${name}.json`;
    var data = fs.readFileSync(path, 'utf8');
    const parsedData = JSON.parse(data);
    return parsedData;
  }

  getReplace(str, target) {
    str = str.replace(new RegExp('\\[NAME\\]', 'g'), target);
    return str;
  }
  getReplaceTitle(str, target) {
    str = str.replace(new RegExp('\\[TITLE\\]', 'g'), target);
    return str;
  }
  getReplaceProperity(str, target) {
    str = str.replace(new RegExp('\\[PROPERTIY\\]', 'g'), target);
    return str;
  }
  getReplaceApi(str, target) {
    str = str.replace(new RegExp('\\[API\\]', 'g'), target);
    return str;
  }

  getProperity(model, entity) {
    let entityName = `RMB${entity}`;
    if (model.hasOwnProperty(entityName) == false) {
      entityName = `RMA${entity}`;
      if (model.hasOwnProperty(entityName) == false) {
        return "";
      }

    }

    console.log(entityName)

    let properity = "";
    let obj = model[entityName];

    for (var attr in obj["properties"]) {
      let properityValue = obj["properties"][attr];
      let typeStr = properityValue["type"];

      let typeLast = typeTransfer[typeStr] ?? 'any'

      let str = `${attr}?:${typeLast};\r\n`;
      properity += str;
      if (properityValue.hasOwnProperty("description")) {
        let desc = properityValue["description"];
        if (desc == "租戶")
          continue;

        properity += `Title_${attr}?:string="${desc}"\r\n`;
      }
    }

    return properity;
  }

  run(name, apijson) {
    let models = this.getAPiFile(apijson);
    let cfgModel = this.getConfigFile(name);

    // 讀取所有範本
    let pathTemplates = [];
    for (let j = 0; j < cfgModel.path.length; j++) {
      let temp = cfgModel.path[j];
      let txt = this.getTemplateFile(temp.template);
      let one = Object.assign({}, temp, { data: txt });
      pathTemplates.push(one);
    }

    //console.log(models)
    let replaceName = "[NAME]";
    let mappingTxt = "";
    for (let i = 0; i < cfgModel.cfg.length; i++) {
      let oneCfg = cfgModel.cfg[i];
      let properityData = this.getProperity(models, oneCfg.entity);

      for (let j = 0; j < pathTemplates.length; j++) {
        let pathTemp = pathTemplates[j];
        let newData = {};
        newData = Object.assign(newData, pathTemp);
        let fileContent = this.getReplace(newData.data, oneCfg.entity);//名稱
        fileContent = this.getReplaceTitle(fileContent, oneCfg.title);//標題
        fileContent = this.getReplaceProperity(fileContent, properityData);//參數
        fileContent = this.getReplaceApi(fileContent, oneCfg.apiPath);//api

        fileContent = fileContent.replace('Basic.Entity', 'Entity')
        let outPath = `./src/${pathTemp.output}`;
        outPath = this.getReplace(outPath, oneCfg.entity);
        //console.log(fileContent)
        fs.writeFile(outPath, fileContent, function (err, result) {
          if (err) console.log("error", err);
        });
      }

      mappingTxt += ` "${oneCfg.entity}": new PageMapItem({ controllerObject: ${oneCfg.entity}Controller, securityObject: null }), \n`

      let outPath = `./src/mappingClass.txt`;
      fs.writeFile(outPath, mappingTxt, function (err, result) {
        if (err) console.log("error", err);
      });
    }

  }


}

let gen = new genApi();
gen.run("autogen_ebm", "api_ebm");
//gen.run("autogen2");
