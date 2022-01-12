# build environment
FROM node:14-alpine as react-build
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# server environment

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=react-build /app/build .
ADD  /nginx/default.conf /etc/nginx/conf.d/default.template

EXPOSE $PORT

CMD sh -c "envsubst \"`env | awk -F = '{printf \" \\\\$%s\", $1}'`\" < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"

