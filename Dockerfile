FROM node:20-alpine as build-stage
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# 💡 加上這行：提高 Node.js 記憶體限制，例如 2GB
ENV NODE_OPTIONS="--max-old-space-size=3096"
RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir /etc/nginx/conf.d/cert
COPY cert /etc/nginx/conf.d/cert

# 清空原始 html 並複製 build 後檔案
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY env.template.js /usr/share/nginx/html/env.template.js
COPY entrypoint.sh /entrypoint.sh
# 轉換為 LF 並設執行權限（最保險）
RUN sed -i 's/\r$//' /entrypoint.sh && chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 80
EXPOSE 443