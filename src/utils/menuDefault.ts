export class MenuDefault{
    menus: any[]
    oldMenus: any[]
    constructor() {
        this.menus = [
            {
                "key": "Dashboard",
                "id": "31884927165308928",
                "label": "Layout.Menu.Dashboard_Title",
                "items": [
                    {
                        "id": "31884927170289664",
                        "label": "Layout.Menu.Dashboard_Chart",
                        "to": "/Dashboard",
                        "key": "Dashboard",
                        "parentId": "31884927165308928"
                    }
                ]
            },
            {
                "key": "Agent",
                "id": "31884927171403776",
                "label": "Layout.Menu.Agent_Title",
                "items": [
                    {
                        "id": "31884927171403777",
                        "label": "Layout.Menu.Agent_Project",
                        "to": "/AIProject",
                        "key": "AIProject",
                        "parentId": "31884927171403776"
                    },
                    {
                        "id": "31884927171403779",
                        "label": "Layout.Menu.Agent_Standard",
                        "to": "/AIAgent",
                        "key": "AIAgent",
                        "parentId": "31884927171403776"
                    },
                    {
                        "id": "31884927171469313",
                        "label": "Layout.Menu.Agent_Summary",
                        "to": "/AISummary",
                        "key": "AISummary",
                        "parentId": "31884927171403776"
                    },
                    {
                        "id": "31884927171469315",
                        "label": "Layout.Menu.Agent_Flow",
                        "to": "/AIFlow",
                        "key": "AIFlow",
                        "parentId": "31884927171403776"
                    },
                    {
                        "id": "31884927171469317",
                        "label": "Layout.Menu.Agent_ChatGroup",
                        "to": "/AIChatGroup",
                        "key": "AIChatGroup",
                        "parentId": "31884927171403776"
                    },
                    {
                        "id": "31884927171469319",
                        "label": "Layout.Menu.Agent_Proxy",
                        "to": "/AIProxy",
                        "key": "AIProxy",
                        "parentId": "31884927171403776"
                    }
                ]
            },
            {
                "key": "AgentSetting",
                "id": "31884927171600384",
                "label": "Layout.Menu.Agent_Setting",
                "items": [
                    {
                        "id": "31884927171665920",
                        "label": "Layout.Menu.Agent_LLMModel",
                        "to": "/AILLMModel",
                        "key": "AILLMModel",
                        "parentId": "31884927171600384"
                    },
                    {
                        "id": "31884927171665922",
                        "label": "Layout.Menu.Agent_EmbeddingModel",
                        "to": "/AIEmbeddingModel",
                        "key": "AIEmbeddingModel",
                        "parentId": "31884927171600384"
                    },
                    {
                        "id": "31884927171665924",
                        "label": "Layout.Menu.Agent_VectorDb",
                        "to": "/AIVectorDb",
                        "key": "AIVectorDb",
                        "parentId": "31884927171600384"
                    },
                    {
                        "id": "31884927171665926",
                        "label": "Layout.Menu.Agent_Tag",
                        "to": "/AITag",
                        "key": "AITag",
                        "parentId": "31884927171600384"
                    },
                    {
                        "id": "31884927171665928",
                        "label": "Layout.Menu.Agent_PromptTemplate",
                        "to": "/AIPromptTemplate",
                        "key": "AIPromptTemplate",
                        "parentId": "31884927171600384"
                    },
                    {
                        "id": "31884927171665930",
                        "label": "Layout.Menu.Agent_SummaryMethod",
                        "to": "/AISummaryMethod",
                        "key": "AISummaryMethod",
                        "parentId": "31884927171600384"
                    }
                ]
            },
            {
                "key": "AgentTool",
                "id": "31884927171862528",
                "label": "Layout.Menu.Agent_Tool",
                "items": [
                    {
                        "id": "31884927171862529",
                        "label": "Layout.Menu.Agent_Tool_Planner",
                        "to": "/AIPlanner",
                        "key": "AIPlanner",
                        "parentId": "31884927171862528"
                    },
                    {
                        "id": "31884927171862531",
                        "label": "Layout.Menu.Agent_Tool_Prompt",
                        "to": "/AIPrompt",
                        "key": "AIPrompt",
                        "parentId": "31884927171862528"
                    },
                    {
                        "id": "31884927171862533",
                        "label": "Layout.Menu.Agent_Tool_Plugin",
                        "to": "/AIPlugin",
                        "key": "AIPlugin",
                        "parentId": "31884927171862528"
                    },
                    {
                        "id": "31884927171862535",
                        "label": "Layout.Menu.Agent_Tool_Tool",
                        "to": "/AITool",
                        "key": "AITool",
                        "parentId": "31884927171862528"
                    },
                    {
                        "id": "31884927171862537",
                        "label": "Layout.Menu.Agent_Tool_Library",
                        "to": "/AILibrary",
                        "key": "AILibrary",
                        "parentId": "31884927171862528"
                    },
                    {
                        "id": "31884927171862539",
                        "label": "Layout.Menu.Agent_Tool_McpPlugin",
                        "to": "/AIMcpPlugin",
                        "key": "AIMcpPlugin",
                        "parentId": "31884927171862528"
                    }
                ]
            },
            {
                "key": "AgentTest",
                "id": "31884927172255744",
                "label": "Layout.Menu.Agent_Test",
                "items": [
                    {
                        "id": "31884927172255745",
                        "label": "Layout.Menu.Agent_Test_BatchChat",
                        "to": "/AIBatchChatAgentInfo",
                        "key": "AIBatchChatAgentInfo",
                        "parentId": "31884927172255744"
                    }
                ]
            },
            {
                "key": "Agentconfig",
                "id": "31884927172386816",
                "label": "Layout.Menu.Agent_Config",
                "items": [
                    {
                        "id": "31884927172452352",
                        "label": "Layout.Menu.Agent_Config_ChatRoom",
                        "to": "/AIChatRoom",
                        "key": "AIChatRoom",
                        "parentId": "31884927172386816"
                    },
                    {
                        "id": "31884927172452354",
                        "label": "Layout.Menu.Agent_Config_ChatFeedback",
                        "to": "/AIChatFeedback",
                        "key": "AIChatFeedback",
                        "parentId": "31884927172386816"
                    }
                ]
            },
            {
                "key": "SystemConfig",
                "id": "31884927172583424",
                "label": "Layout.Menu.SystemConfig_Title",
                "items": [
                    {
                        "id": "31884927172583425",
                        "label": "Layout.Menu.SystemConfig_FunctionUsage",
                        "to": "/AIAgentFunctionUsage",
                        "key": "AIAgentFunctionUsage",
                        "parentId": "31884927172583424"
                    },
                    {
                        "id": "31884927172583427",
                        "label": "Layout.Menu.SystemConfig_ChatRoomNode",
                        "to": "/AIChatRoomNode",
                        "key": "AIChatRoomNode",
                        "parentId": "31884927172583424"
                    },
                    {
                        "id": "31884927172648961",
                        "label": "Layout.Menu.SystemConfig_TenantParameter",
                        "to": "/AITenantParameter",
                        "key": "AITenantParameter",
                        "parentId": "31884927172583424"
                    }
                ]
            },
            {
                "key": "platefrom",
                "id": "31884927173042176",
                "label": "Layout.Menu.Platform_Title",
                "items": [
                    {
                        "id": "31884927173042177",
                        "label": "Layout.Menu.Platform_Account",
                        "to": "/Account",
                        "key": "Account",
                        "parentId": "31884927173042176"
                    },
                    {
                        "id": "31884927173042179",
                        "label": "Layout.Menu.Platform_User",
                        "to": "/Usr",
                        "key": "Usr",
                        "parentId": "31884927173042176"
                    },
                    {
                        "id": "31884927173042181",
                        "label": "Layout.Menu.Platform_Tenant",
                        "to": "/Tenant",
                        "key": "Tenant",
                        "parentId": "31884927173042176"
                    },
                    {
                        "id": "31884927173042183",
                        "label": "Layout.Menu.Platform_Role",
                        "to": "/Role",
                        "key": "Role",
                        "parentId": "31884927173042176"
                    },
                    {
                        "id": "31884927173042185",
                        "label": "Layout.Menu.Platform_TenantRole",
                        "to": "/TenantRole",
                        "key": "TenantRole",
                        "parentId": "31884927173042176"
                    },
                    {
                        "id": "31884927173107713",
                        "label": "Layout.Menu.Platform_Department",
                        "to": "/Department",
                        "key": "TenantRole",
                        "parentId": "31884927173042176"
                    },
                    {
                        "id": "31884927173107715",
                        "label": "Layout.Menu.Platform_Language",
                        "to": "/Language",
                        "key": "Language",
                        "parentId": "31884927173042176"
                    },
                    {
                        "id": "31884927173107717",
                        "label": "Layout.Menu.Platform_Menu",
                        "to": "/AIMenuScope",
                        "key": "AIMenuScope",
                        "parentId": "31884927173042176"
                    }
                ]
            }
        ]
        this.oldMenus = [
            {
                key: "Dashboard",
                id: 'Dashboard',
                label: 'Layout.Menu.Dashboard_Title',
                items: [
                    {
                        label: 'Layout.Menu.Dashboard_Chart',
                        to: '/Dashboard', key: "Dashboard"
    
                    },
    
                ]
            },
            {
                key: "Agent",
                id: 'Agent',
                label: 'Layout.Menu.Agent_Title',
                items: [
                    {
                        label: 'Layout.Menu.Agent_Project',
                        to: '/AIProject', key: "AIProject"
    
                    },
                    {
                        label: 'Layout.Menu.Agent_Standard',
                        to: '/AIAgent', key: "AIAgent"
                    },
                    {
                        label: 'Layout.Menu.Agent_Summary',
                        to: '/AISummary', key: "AISummary"
                    },
                    {
                        label: 'Layout.Menu.Agent_Flow',
                        to: '/AIFlow', key: "AIFlow"
                    },
    
                    {
                        label: 'Layout.Menu.Agent_ChatGroup',
                        to: '/AIChatGroup', key: "AIChatGroup"
                    },
                    {
                        label: 'Layout.Menu.Agent_Proxy',
                        to: '/AIProxy', key: "AIProxy"
                    },
    
                ]
            },
            {
                key: "AgentSetting",
                id: 'AgentSetting',
                label: 'Layout.Menu.Agent_Setting',
                items: [
                    {
                        label: 'Layout.Menu.Agent_LLMModel',
                        to: '/AILLMModel', key: "AILLMModel"
    
                    },
                    {
                        label: 'Layout.Menu.Agent_EmbeddingModel',
                        to: '/AIEmbeddingModel', key: "AIEmbeddingModel"
                    },
                    {
                        label: 'Layout.Menu.Agent_VectorDb',
                        to: '/AIVectorDb', key: "AIVectorDb"
                    },
                    {
                        label: 'Layout.Menu.Agent_Tag',
                        to: '/AITag', key: " AITag"
                    },
                    // {
                    //     label: '向量資料庫內容',
                    //     to: '/AIVectorData', key: " AIVectorData"
                    // },
                    {
                        label: 'Layout.Menu.Agent_PromptTemplate',
                        to: '/AIPromptTemplate', key: " AIPromptTemplate"
                    },
    
                    // {
                    //     label: '清單-服代理人參數',
                    //     to: '/AIProxyDictPara', key: "AIProxyDictPara"
    
                    // },
                    {
                        label: 'Layout.Menu.Agent_SummaryMethod',
                        to: '/AISummaryMethod', key: "AISummaryMethod"
    
                    },
                ]
            },
            {
                key: "AgentTool",
                id: 'AgentTool',
                label: 'Layout.Menu.Agent_Tool',
                items: [
                    {
                        label: 'Layout.Menu.Agent_Tool_Planner',
                        to: '/AIPlanner', key: "AIPlanner"
    
                    },
                    {
                        label: 'Layout.Menu.Agent_Tool_Prompt',
                        to: '/AIPrompt', key: "AIPrompt"
                    },
                    {
                        label: 'Layout.Menu.Agent_Tool_Plugin',
                        to: '/AIPlugin', key: "AIPlugin"
                    },
                    {
                        label: 'Layout.Menu.Agent_Tool_Tool',
                        to: '/AITool', key: "AITool"
                    },
                    {
                        label: 'Layout.Menu.Agent_Tool_Library',
                        to: '/AILibrary', key: "AILibrary"
                    },
                    {
                        label: 'Layout.Menu.Agent_Tool_McpPlugin',
                        to: '/AIMcpPlugin', key: "AIMcpPlugin"
                    },
                    // {
                    //     label: 'MCP 插件工具資訊',
                    //     to: '/AIMcpPluginTool', key: "AIMcpPluginTool"
                    // },
    
                ]
            },
            {
                key: "AgentTest",
                id: 'AgentTest',
                label: 'Layout.Menu.Agent_Test',
                items: [
    
                    {
                        label: 'Layout.Menu.Agent_Test_BatchChat',
                        to: '/AIBatchChatAgentInfo', key: "AIBatchChatAgentInfo"
    
                    },
                    // {
                    //     label: '批次問答-細節內容',
                    //     to: '/AIBatchChat', key: "AIBatchChat"
    
                    // },
    
    
                ]
            },
            {
                key: "Agentconfig",
                id: 'Agentconfig',
                label: 'Layout.Menu.Agent_Config',
                items: [
                    {
                        label: 'Layout.Menu.Agent_Config_ChatRoom',
                        to: '/AIChatRoom', key: "AIChatRoom"
    
                    },
                    {
                        label: 'Layout.Menu.Agent_Config_ChatFeedback',
                        to: '/AIChatFeedback', key: "AIChatFeedback"
    
                    },
    
                ]
            },
            {
                key: "SystemConfig",
                id: 'SystemConfig',
                label: 'Layout.Menu.SystemConfig_Title',
                items: [
                    {
                        label: 'Layout.Menu.SystemConfig_FunctionUsage',
                        to: '/AIAgentFunctionUsage', key: "AIAgentFunctionUsage"
    
                    },
                    {
                        label: 'Layout.Menu.SystemConfig_ChatRoomNode',
                        to: '/AIChatRoomNode', key: "AIChatRoomNode"
    
                    },
                    // {
                    //     label: '紀錄-代理人事件訊息',
                    //     to: '/AISignalREventLog', key: "AISignalREventLog"
    
                    // },
    
    
                    // {
                    //     label: 'API',
                    //     to: '/AIToolMethod', key: "AIToolMethod"
    
                    // },
    
    
                    // {
                    //     label: '工具驗證的處理方式',
                    //     to: '/AIApiCallAuthSetting', key: "AIApiCallAuthSetting"
    
                    // },
                    // {
                    //     label: 'API設定',
                    //     to: '/AIApiCallSetting', key: "AIApiCallSetting"
    
                    // },
    
                    // {
                    //     label: '鍵值設定檔',
                    //     to: '/AIKeyValueParameter', key: "AIKeyValueParameter"
    
                    // },
    
                    {
                        label: 'Layout.Menu.SystemConfig_TenantParameter',
                        to: '/AITenantParameter', key: "AITenantParameter"
    
                    }
                ]
            },
            {
                key: "platefrom",
                id: 'platefrom',
                label: 'Layout.Menu.Platform_Title',
                items: [
                    {
                        label: 'Layout.Menu.Platform_Account',
                        to: '/Account', key: "Account"
    
                    },
                    {
                        label: 'Layout.Menu.Platform_User',
                        to: '/Usr', key: "Usr"
                    },
                    {
                        label: 'Layout.Menu.Platform_Tenant',
                        to: '/Tenant', key: "Tenant"
                    },
                    {
                        label: 'Layout.Menu.Platform_Role',
                        to: '/Role', key: "Role"
                    },
                    {
                        label: 'Layout.Menu.Platform_TenantRole',
                        to: '/TenantRole', key: "TenantRole"
                    },
                    {
                        label: 'Layout.Menu.Platform_Department',
                        to: '/Department', key: "TenantRole"
                    },
                    {
                        label: 'Layout.Menu.Platform_Language',
                        to: '/Language', key: "Language"
                    },
                    {
                        label: 'Layout.Menu.Platform_Menu',
                        to: '/AIMenuScope', key: "AIMenuScope"
                    }
                ]
            },
    
        ]
    }
}