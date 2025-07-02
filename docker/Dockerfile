# FROM node:20 
# layer1

# WORKDIR /app
# layer2

# COPY . .
# layer3

# RUN npm install
# layer4

# RUN npm install typescript
# layer5


# EXPOSE 3000

# CMD [ "npm" , "run" , "start" ]

#Better way

FROM node:20

WORKDIR /app

COPY package* .
COPY ./prisma .
COPY tsconfig* .

RUN npm install
RUN npm install typescript
RUN npm run build
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD [ "node" , "run" , "start" ]