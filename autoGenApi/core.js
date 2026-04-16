import {
    typeTransfer,
    TWO_LINE_BREAK,
    ApiMethodType,
    ApiContentType,
} from "./service/constants.js";
import FileHandler from "./utils/fileHandler.js";
import MustacheHandler from "./utils/mustacheHandler.js";
import { print } from "./utils/helpers.js";

class BaseService {
    findPathFromRef(ref) {
        if (ref == undefined || ref == null)
            return 'any';
        return ref.split("#/components/schemas/").pop();
    }
    convertValueToType(value) {
        if (value["$ref"]) {
            return this.findPathFromRef(value["$ref"]);
        }
        const isBinary = value["format"] === "binary";
        let subType = typeTransfer[value["type"]];
        if (isBinary && value["type"] === "string") {
            subType = typeTransfer["file"];
        }
        const processItems = (type, items) =>
            `${type}<${this.convertValueToType(items)}>`;
        const processAdditionalProperties = (additionalProperties) => {
            const additionalType = typeTransfer[additionalProperties?.["type"]];
            if (!additionalType) return subType;
            if (additionalProperties?.["items"]) {
                return processItems(additionalType, additionalProperties["items"]);
            }
            return additionalType ?? "any";
        };
        if (value["items"]) {
            return processItems(subType, value["items"]);
        }
        if (value["additionalProperties"]) {
            return processAdditionalProperties(value["additionalProperties"]);
        }
        return subType ?? "any";
    }
}
class ApiSegmentsGenerater {
    apiBase = null;
    apiEntity = null;
    apiGroup = null;
    apiVariable = null;
    apiOthers = null;
    #apiDetails = null;
    #apiUrl = null;
    constructor({ apiUrl, sequencer, apiDetails = null }) {
        this.init(apiUrl, sequencer, apiDetails);
        this.#apiDetails = apiDetails;
        this.#apiUrl = apiUrl;
    }
    init = (apiUrl, sequencer) => {
        const [_, apiBase, path2, ...others] = apiUrl.split("/");
        const path2_convertDashToCamel = this.#convertSpecialToCamel(path2);
        const varPosition = this.#findVariablePosition(apiUrl);
        this.apiBase = apiBase;
        this.apiPath = apiUrl;
        if (apiUrl.split("/")?.length <= 3) {
            this.apiGroup = path2_convertDashToCamel;
        } else {
            if (
                sequencer?.length > 0 &&
                sequencer?.some((seq) => seq.toLowerCase() === path2.toLowerCase())
            ) {
                this.#processSequencedSegments(
                    path2_convertDashToCamel,
                    varPosition,
                    others
                );
            } else {
                this.#processPathSegments(
                    path2_convertDashToCamel,
                    varPosition,
                    others
                );
            }
        }
    };
    #findVariablePosition(apiUrl) {
        return apiUrl
            .split("/")
            .findIndex((element) => element.startsWith("{") && element.endsWith("}"));
    }
    #processSequencedSegments = (
        path2_convertDashToCamel,
        varPosition,
        others
    ) => {
        const [path3, ...rest] = others;
        if (varPosition === 3) {
            this.apiVariable = path3.slice(1, -1);
        } else {
            this.apiEntity = this.#convertSpecialToCamel(path3);
        }
        this.apiGroup = path2_convertDashToCamel;
        this.apiOthers = this.#camelize(rest);
    };
    #processPathSegments = (path2_convertDashToCamel, varPosition, others) => {
        const [path3, ...rest] = others;
        if (varPosition === 3) {
            this.apiGroup = path2_convertDashToCamel;
            this.apiVariable = path3.slice(1, -1);
        } else {
            this.apiGroup = this.#convertSpecialToCamel(path3);
            this.apiEntity = path2_convertDashToCamel;
        }
        this.apiOthers = this.#camelize(rest);
    };
    #camelize(strArr) {
        (!strArr || strArr.length === 0) && "";
        return strArr
            .map((segment, index) => {
                !segment && "";
                if (segment.startsWith("{") && segment.endsWith("}")) {
                    segment = "By" + segment.slice(1, -1);
                }
                return index === 0
                    ? segment
                    : segment.charAt(0).toUpperCase() + segment.slice(1);
            })
            .join("");
    }
    #convertSpecialToCamel(str) {
        return str
            ?.split(/[-.]/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("");
    }
    getAllSegments = () => {
        return {
            apiBase: this.apiBase,
            apiEntity: this.apiEntity,
            apiGroup: this.apiGroup,
            apiVariable: this.apiVariable,
            apiOthers: this.apiOthers,
        };
    };
    getAllSegmentsByMethodUnit = () => {
        return Object.keys(this.#apiDetails)?.map((apiMethodType) => ({
            ...this.getAllSegments(),
            apiPath: this.#apiUrl,
            apiMethod: apiMethodType,
        }));
    };
}

/* common.ts */
class CommonGenerator {
    run(folderName, outputDir) {
        const mustacheHandler = new MustacheHandler({
            template: "common.mustache",
            fileName: "common.ts",
            folderName,
            outputDir,
        });
        mustacheHandler.generateFile();
    }
}
/* model.ts */
class ComponentViewBuilder extends BaseService {
    constructor(schemas) {
        super();
        this.schemas = schemas;
        this.template = "";
    }
    #convertProperties(properties) {
        return Object.entries(properties).map(([key, value]) => {
            // const isRequired = value['nullable'] ? {} : {required: true };
            return { key, value: this.convertValueToType(value) };
        });
    }
    #buildPropertiesView = (keyGroupName, keyGroupDetails) => {
        const interfaceGroups = this.#convertProperties(
            keyGroupDetails["properties"]
        )?.map((group) => ({
            ...group,
            isRequired: (keyGroupDetails["required"] || []).includes(group.key),
        }));
        const mustacheHandler = new MustacheHandler({
            template: "modelProperties.mustache",
            view: { keyGroupName, interfaceGroups },
        });
        this.template += mustacheHandler.renderMustacheTemplate() + TWO_LINE_BREAK;
    };
    #buildEnumView = (keyGroupName, keyGroupDetails) => {
        const enumGroups = keyGroupDetails["enum"].map((el) => ({
            key: el,
            value: `'${el}'`,
        }));
        const mustacheHandler = new MustacheHandler({
            template: "modelEnum.mustache",
            view: { keyGroupName, enumGroups },
        });
        this.template += mustacheHandler.renderMustacheTemplate() + TWO_LINE_BREAK;
    };
    #buildTypeView = (keyGroupName, keyGroupDetails) => {
        const mustacheHandler = new MustacheHandler({
            template: "modelType.mustache",
            view: { keyGroupName, type: typeTransfer[keyGroupDetails["type"]] },
        });
        this.template += mustacheHandler.renderMustacheTemplate() + TWO_LINE_BREAK;
    };
    buildView = () => {
        Object.entries(this.schemas).forEach(([keyGroupName, keyGroupDetails]) => {
            if (!keyGroupDetails) return;
            if (keyGroupDetails["properties"]) {
                this.#buildPropertiesView(keyGroupName, keyGroupDetails);
            } else if (keyGroupDetails["enum"]) {
                this.#buildEnumView(keyGroupName, keyGroupDetails);
            } else {
                this.#buildTypeView(keyGroupName, keyGroupDetails);
            }
        });
        return this.template;
    };
}
class RequestViewBuilder {
    constructor({
        pathViews,
        interfaceName,
        requestInterfaceTemplate,
        requestServiceClassTemplate,
        fileType,
        getParamsFormUsedAdditional,
    }) {
        this.pathViews = pathViews;
        this.interfaceName = `${interfaceName}Temp`;
        this.partialTypeName = interfaceName;
        this.requestInterfaceTemplate = requestInterfaceTemplate;
        this.fileType = fileType;
        this.getParamsFormUsedAdditional = getParamsFormUsedAdditional;
        this.requestServiceClassTemplate = requestServiceClassTemplate;
    }
    buildView = () => {
        this.#buildRequestInterface();
        this.#buildRequestPartial();
        this.#buildRequestServcieClass();
    };
    #buildRequestInterface = () => {
        const requestInterface =
            `export interface ${this.interfaceName} {\n` +
            this.requestInterfaceTemplate +
            `}\n`;
        this.pathViews.push({ requestInterface: requestInterface });
    };
    #buildRequestPartial = () => {
        const requestPartialType = `export type ${this.partialTypeName} = Omit<${this.interfaceName}, "XApiVersion">  & Partial<Pick<${this.interfaceName}, "XApiVersion">>`;
        this.pathViews.push({ requestPartialType: requestPartialType });
    };
    #buildRequestServcieClass = () => {
        let parametersString = "";
        if (
            this.requestServiceClassTemplate !== "" &&
            this.getParamsFormUsedAdditional === false
        ) {
            parametersString =
                `\t\tconst parameters = [\n` +
                `${this.requestServiceClassTemplate}` +
                `\t\t];\n` +
                `\t\tsuper({axiosHeaders, parameters, requestParameters, fileType: "${this.fileType}" as AxisContentType})\n`;
        } else {
            parametersString = `\t\tsuper({axiosHeaders, requestParameters, fileType: "${this.fileType}" as AxisContentType})\n`;
        }
        const requestServiceClass =
            `export class ${this.partialTypeName}Service extends BasicRequestService<${this.partialTypeName}>{\n` +
            `\tconstructor(axiosHeaders: AxiosHeaders | undefined, requestParameters?: ${this.partialTypeName} ){\n` +
            parametersString +
            `\t}\n` +
            `}\n`;

        this.pathViews.push({
            requestServiceClass: requestServiceClass,
        });
    };
}
class PathViewBuilder extends BaseService {
    pathViews = [];
    hasRequestAxiosMethods = [
        ApiMethodType.patch,
        ApiMethodType.post,
        ApiMethodType.put,
    ];
    constructor(paths, sequencer) {
        super();
        this.paths = paths;
        this.sequencer = sequencer;
    }
    #formatKey(key) {
        if (!key) return "";
        return key.indexOf("-") > -1 ? key.replace(/-/g, "") : key;
    }
    #appendToRequestInterface({ templates, key, isRequired, value }) {
        if (!templates || !key || !value) return;
        templates.requestInterfaceTemplate += `\t${key}${isRequired || key === "XApiVersion" ? ": " : "?: "
            }${value}\n`;
    }
    #appendToRequestServiceClass({ templates, key, placement }) {
        if (!templates || !key || !placement) return;
        templates.requestServiceClassTemplate += `\t\t\t{type: RequestPlacement.${placement}, key: ${key}, value: null},\n`;
    }
    #processFormData = (contentFormData, templates) => {
        if (!contentFormData || !templates) return;

        console.log(contentFormData["schema"]["properties"])
        let obj = contentFormData["schema"]["properties"];
        if (obj == undefined)
            return;
        Object.entries(contentFormData["schema"]["properties"]).forEach(
            ([key, value]) => {
                const isRequired = contentFormData["schema"]["required"]?.includes(key);
                this.#appendToRequestInterface({
                    templates,
                    key: `'${key}'`,
                    isRequired,
                    value: this.convertValueToType(value),
                });
                this.#appendToRequestServiceClass({
                    templates,
                    key: `'${key}'`,
                    placement: "QUERY",
                });
            }
        );
    };
    #processJsonData = (contentJson, templates) => {
        if (!contentJson || !templates) return;
        const contentJsonSchema = contentJson["schema"];
        let type = this.convertValueToType(contentJsonSchema);
        let key;
        if (type.indexOf("<") > -1 && type.indexOf(">") > -1) {
            key = type.match(/<([^>]+)>/)[1];
        } else {
            key = contentJsonSchema["additionalProperties"] ? "[key:string]" : type;
        }
        this.#appendToRequestInterface({
            templates,
            key,
            isRequired: true,
            value: type,
        });
        if (!contentJsonSchema["additionalProperties"]) {
            this.#appendToRequestServiceClass({
                templates,
                key: `'${key}'`,
                placement: "DATA",
            });
        }
    };
    #processParameters = (parameters, templates) => {
        if (!parameters || !templates) return;
        parameters.forEach((param) => {
            const elKey = this.#formatKey(param["name"]);
            const isRequired = param["required"];
            if (param["schema"]["$ref"]) {
                this.#appendToRequestInterface({
                    templates,
                    key: elKey,
                    isRequired,
                    value: this.findPathFromRef(param["schema"]["$ref"]),
                });
            } else {
                const isGeneric = param["schema"]["items"]
                    ? `<${typeTransfer[
                    this.findPathFromRef(param["schema"]["items"]["type"])
                    ]
                    }>`
                    : "";
                this.#appendToRequestInterface({
                    templates,
                    key: elKey,
                    isRequired,
                    value: typeTransfer[param["schema"]["type"]] + isGeneric,
                });
            }
            const formatType =
                param["in"] === "query" ? "QUERYSTRING" : param["in"].toUpperCase();
            this.#appendToRequestServiceClass({
                templates,
                key: `'${elKey}'`,
                placement: formatType,
            });
        });
    };
    #parsingParametersAndRequestBody = (apiMethodType, apiMethDetails) => {
        if (!apiMethDetails) return {};
        let getParamsFormUsedAdditional = false;
        let fileType = ApiContentType.JSON;
        let templates = {
            requestInterfaceTemplate: "",
            requestServiceClassTemplate: "",
        };
        // 處理requestBody
        if (this.hasRequestAxiosMethods.includes(apiMethodType)) {
            const requestContent = apiMethDetails["requestBody"]?.["content"];
            const contentTypes = [
                {
                    type: ApiContentType.FORMDATA,
                    handler: this.#processFormData.bind(this),
                },
                {
                    type: ApiContentType.JSON,
                    handler: this.#processJsonData.bind(this),
                },
                {
                    type: ApiContentType.URLENCODED,
                    handler: this.#processFormData.bind(this),
                },
            ];
            contentTypes.forEach(({ type, handler }) => {
                const content = requestContent?.[type];
                if (content) {
                    fileType = type;
                    handler(content, templates);
                    if (type === ApiContentType.JSON) {
                        getParamsFormUsedAdditional =
                            !!content["schema"]["additionalProperties"];
                    }
                }
            });
        }
        // 處理parameters
        this.#processParameters(apiMethDetails["parameters"], templates);
        return { getParamsFormUsedAdditional, fileType, ...templates };
    };
    #getInterfaceName(apiUrl, apiMethodType) {
        if (!apiUrl || !apiMethodType) return "";
        const { apiGroup, apiEntity, apiVariable, apiOthers } =
            new ApiSegmentsGenerater({ apiUrl, sequencer: this.sequencer });
        return `${apiGroup}${apiEntity ? apiEntity : ""}${apiMethodType}${apiVariable ? `By${apiVariable}` : ""
            }${apiOthers ? apiOthers : ""}Request`;
    }
    buildView = () => {
        Object.entries(this.paths).forEach(([apiUrl, apiDetails]) => {
            Object.entries(apiDetails).forEach(([apiMethodType, apiMethDetails]) => {
                const interfaceName = this.#getInterfaceName(apiUrl, apiMethodType);
                const requestProps = {
                    pathViews: this.pathViews,
                    interfaceName,
                    ...this.#parsingParametersAndRequestBody(
                        apiMethodType,
                        apiMethDetails
                    ),
                };
                const requestViewBuilder = new RequestViewBuilder(requestProps);
                requestViewBuilder.buildView();
            });
        });
        return this.pathViews;
    };
}
class ModelGenerater {
    constructor(sequencer) {
        this.sequencer = sequencer;
    }
    run({ folderName, sourceJson, outputDir }) {
        const componentBuilder = new ComponentViewBuilder(
            sourceJson.components.schemas
        );
        const pathViewBuilder = new PathViewBuilder(
            sourceJson.paths,
            this.sequencer
        );
        const view = {
            componentInterface: componentBuilder.buildView(),
            pathViews: pathViewBuilder.buildView(),
        };
        const mustacheHandler = new MustacheHandler({
            template: "model.mustache",
            view,
            fileName: "model.ts",
            folderName,
            outputDir,
        });
        mustacheHandler.generateFile();
    }
}
/* api.ts */
class ApiViewBuilder {
    constructor(paths, sequencer, moduleName) {
        this.paths = paths;
        this.sequencer = sequencer;
        this.view = {
            apiResources: [],
            apiBase: "",
            level1: [],
            level2: [],
            level3: [],
        };
        this.allApiSegmentsGroups = this.#parsingAllSegments();
        this.moduleName = moduleName
    }
    #parsingAllSegments = () => {
        return Object.entries(this.paths).flatMap(([apiUrl, apiDetails]) => {
            const apiSegments = new ApiSegmentsGenerater({
                apiUrl,
                sequencer: this.sequencer,
                apiDetails,
            });
            return apiSegments.getAllSegmentsByMethodUnit();
        });
    };
    #findSameArr(sourceArr, target, key) {
        if (!target || !key) return null;
        return sourceArr.find((el) => el[key] === target[key]);
    }
    #isSameExsited(sourceArr, target, key) {
        if (!target || !key) return false;
        return sourceArr.some((el) => el[key] === target[key]);
    }
    #filterLevel2RepeaterByLevel3() {
        if (!this.view.level2 || !this.view.level3) return;
        const level3Map = new Map(
            this.view.level3.map((level3item) => [level3item.apiGroup, level3item])
        );
        this.view.level2 = this.view.level2.filter((level2Item) => {
            const level3Item = level3Map.get(level2Item.apiGroup);
            if (!level3Item) return true;
            // level3的命名為{apiGroup}{apiEntity}，當level3Item子層的apiEntity為null，可以確保level3與level2的命名相同，必須過濾
            const repeatVarsFromLevel2 = level3Item.apiEntities.find(
                (level3item) => !level3item.apiEntity
            );
            if (repeatVarsFromLevel2) {
                repeatVarsFromLevel2.repeatVariables =
                    level2Item.apiEntities?.map((el) => {
                        let entity = {};

                        if (el.apiEntity == null) {
                            entity = {
                                key: level2Item.apiGroup + el.apiEntity,
                                value: level2Item.apiGroup + el.apiEntity,
                            };
                        }
                        else {
                            entity = {
                                key: el.apiEntity,
                                value: level2Item.apiGroup + el.apiEntity,
                            };
                        }

                        return entity;
                    }) || [];
                return false; // 過濾掉重複的level2
            }
            return true;
        });
    }
    buildView = () => {
        this.allApiSegmentsGroups?.forEach((item, index) => {
            if (index === 0) {
                this.view.apiBase = item.apiBase;
            }
            this.#addLevel1(item);
            this.#addLevel2(item);
            this.#addLevel3(item);
            this.#addApiResources(item);
        });
        this.#filterLevel2RepeaterByLevel3();
        return this.view;
    };
    #addLevel1 = (item) => {
        if (!this.#isSameExsited(this.view.level1, item, "apiGroup")) {
            this.view.level1.push({ apiGroup: item.apiGroup });
        }
    };
    #addLevel2 = (item) => {
        let level2Group = this.#findSameArr(this.view.level2, item, "apiGroup");
        if (!level2Group) {
            level2Group = { apiGroup: item.apiGroup, apiEntities: [] };
            this.view.level2.push(level2Group);
        }
        if (
            item.apiEntity &&
            !this.#isSameExsited(level2Group.apiEntities, item, "apiEntity")
        ) {
            level2Group.apiEntities.push({ apiEntity: item.apiEntity });
        }
    };
    #addLevel3 = (item) => {

        // 把Module name 取代掉
        item.apiPath = item.apiPath.replace(`/${this.moduleName}`, "")

        let level3Group = this.#findSameArr(this.view.level3, item, "apiGroup");
        if (!level3Group) {
            level3Group = { apiGroup: item.apiGroup, apiEntities: [] };
            this.view.level3.push(level3Group);
        }
        let apiEntityGroup = this.#findSameArr(
            level3Group.apiEntities,
            item,
            "apiEntity"
        );
        if (!apiEntityGroup) {
            apiEntityGroup = { apiEntity: item.apiEntity, methods: [] };
            level3Group.apiEntities.push(apiEntityGroup);
        }
        const methodTemplate = this.#createDynamicMethodTemplate(item);
        apiEntityGroup.methods.push({ methodTemplate });
    };
    #createDynamicMethodTemplate(item) {
        if (!item.apiGroup || !item.apiMethod) return "";
        const hasApiVariable = item.apiVariable ? `By${item.apiVariable}` : "";
        const hasApiOthers = item.apiOthers ? item.apiOthers : "";
        const hasApiEntity = item.apiEntity ? item.apiEntity : "";
        const requestPrefix = `${item.apiGroup}${hasApiEntity}${item.apiMethod}${hasApiVariable}${hasApiOthers}Request`;
        return (
            `${item.apiMethod}${hasApiVariable}${hasApiOthers}(requestParameters?: ${requestPrefix}){\n` +
            `\t\tlet requestService = new ${requestPrefix}Service(this.axiosHeaders, requestParameters)\n` +
            `\t\treturn AxiosService.${item.apiMethod}(this.basePath+'${item.apiPath}', this.globalAxios, requestService.getRequestOptions());\n` +
            `\t}`
        );
    }
    #addApiResources(item) {
        const resourceName = `${item.apiGroup}${item.apiEntity ? item.apiEntity : ""
            }${item.apiMethod}${item.apiVariable ? `By${item.apiVariable}` : ""}${item.apiOthers ? item.apiOthers : ""
            }`;
        this.view.apiResources.push({ apiResource: `${resourceName}Request` });
        this.view.apiResources.push({
            apiResource: `${resourceName}RequestService`,
        });
    }
}
class ApiGenerator {
    constructor(sequencer) {
        this.sequencer = sequencer;
    }
    #buildApiView(paths, folderName) {
        const apiBuilder = new ApiViewBuilder(paths, this.sequencer, folderName);
        return apiBuilder.buildView();
    }
    run = ({ folderName, sourceJson, outputDir }) => {
        const mustacheHandler = new MustacheHandler({
            template: "api.mustache",
            fileName: "api.ts",
            folderName,
            view: this.#buildApiView(sourceJson.paths, folderName),
            outputDir,
        });
        mustacheHandler.generateFile();
    };
}

export default class genApi {
    async run(config) {
        print("start");
        const { sources, outputDir = null } = config;
        for (const { source, sequencer = [] } of sources) {
            let { folderName, sourceJson } = await FileHandler.sourceToJson(source);
            const commonGenerator = new CommonGenerator();

            for (let key in sourceJson["paths"]) {
                if (key.indexOf(".well-known") != -1) {
                    delete sourceJson["paths"][key];
                }
            }

            commonGenerator.run(folderName, outputDir);
            print("processing", `已執行 ${folderName} - common.ts`);
            const modelGenerater = new ModelGenerater(sequencer);
            modelGenerater.run({ folderName, sourceJson, outputDir });
            print("processing", `已執行 ${folderName} - model.ts`);
            const apiGenerator = new ApiGenerator(sequencer);
            apiGenerator.run({ folderName, sourceJson, outputDir });
            print("processing", `已執行 ${folderName} - api.ts`);
        }
        print("success");
    }
}
