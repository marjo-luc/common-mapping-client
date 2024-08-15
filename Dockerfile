FROM node:16.4.1

WORKDIR /app
COPY . /app

RUN npm install --legacy-peer-deps
RUN npm run build

# UI
EXPOSE 9014

CMD [ "npm", "run", "start" ]
