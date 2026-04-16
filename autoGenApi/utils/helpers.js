import { error } from "console";

export const print = (status, message) => {
	const statusMessages = {
        start: () => console.log(`🚀 開始執行...`),
		processing: () => console.log(`📦 ${message}`),
		success: () => console.log(`✅ 執行成功`),
        error: () => console.error(`❌ ${message}`),
	};
	statusMessages[status] && statusMessages[status]();
}