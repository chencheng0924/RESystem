import genApi from './core.js'
const genApiConfig = {
  /* 
    1. sources: [{
        source(必填):檔案或是json網址, 
        sequencer(非必填、陣列):指定哪些二層路由，固定為主路由; 沒有指定大小寫  
      }]
    2. outputDir: 若沒有傳入outputDir，則預設輸出到當前目錄下。
  */
  sources: [
    // 	{ source: 'https://dev-citygpt.foxconn.com/bsuper/maas/v1/swagger.json', sequencer: ['Login', 'GoogleMap'] },
    // 	{ source: 'https://dev-citygpt.foxconn.com/rstorage/maas/v1/swagger.json' },
    //{ source: 'https://dev-maas.foxconn.com/rbasic/maas/v1/swagger.json' },
    //{ source: "https://dev-maas.foxconn.com/ridp/maas/v1/swagger.json" },
    { source: "https://dev-maas.foxconn.com/rai/maas/v1/swagger.json" },
  ],
  outputDir: "/src/api",
};
let gen = new genApi();
gen.run(genApiConfig);
