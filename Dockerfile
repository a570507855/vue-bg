FROM node:alpine

COPY . /$GIT_GROUP/$PROJECT
WORKDIR /$GIT_GROUP/$PROJECT
EXPOSE 80
CMD ["tsc","-p","."]
CMD ["node", "dist"]