# syntax=docker/dockerfile:1
FROM node:18-alpine
ENV NODE_ENV=production
COPY frontend /frontend
WORKDIR /frontend
RUN npm install --production && ng build --prod

FROM golang:1.19
COPY backend /backend
WORKDIR /backend
RUN go mod download
ARG PORT=8080
RUN CGO_ENABLED=0 GOOS=linux go build -o /bin/backend
EXPOSE 8080

CMD ["/bin/backend"]
