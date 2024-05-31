# FROM node:14-alpine

# WORKDIR /app

# COPY package.json .
# COPY package-lock.json .

# RUN npm install
# RUN npm install yarn

# COPY . .

# # RUN npm run build
# RUN yarn run build

# RUN yarn add -g serve

# EXPOSE 5000

# CMD [ "serve", "-s", "build", "-l", "5000" ]
# ENV NODE_OPTIONS=--max_old_space_size=4096


# FROM node:18-alpine

# WORKDIR /app

# COPY package.json .
# COPY package-lock.json .

# RUN npm install --force --legacy-peer-deps
# # RUN npm install yarn

# COPY . .
# # RUN yarn add @sweetalert2/theme-wordpress-admin material-react-table @mui/material @tanstack/react-query @mui/icons-material material-react-table @mui/material @tanstack/react-query  @koale/useworker react-table
# RUN npm run build

# RUN npm install -g serve

# EXPOSE 3000

# CMD [ "serve", "-s", "build", "-l", "3000" ]
# EXPOSE 3001

# # 運行應用
# CMD ["npm", "start"]


# FROM node:12.20.1-alpine3.12

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .
# RUN yarn add @sweetalert2/theme-wordpress-admin material-react-table @mui/material @tanstack/react-query @mui/icons-material material-react-table @mui/material @tanstack/react-query  @koale/useworker react-table

# EXPOSE 3002

# CMD [ "npm", "start" ]


FROM node:18 AS builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install --force --legacy-peer-deps

COPY . .
ENV NODE_OPTIONS=--max-old-space-size=4096
# 增加内存限制后再运行构建
RUN npm run build

# 第二阶段：生产阶段
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/build .

RUN npm install -g serve

EXPOSE 3000

CMD [ "serve", "-s", "build", "-l", "3000" ]