FROM public.ecr.aws/docker/library/node:16 as install
LABEL stage=install
RUN mkdir -p /card-tokenization/install
WORKDIR /card-tokenization/install

COPY package.json .
COPY yarn.lock .

RUN yarn install

FROM public.ecr.aws/docker/library/node:16 as builder
LABEL stage=builder
RUN mkdir -p /card-tokenization/build
WORKDIR /card-tokenization/build

COPY --from=install /card-tokenization/install .
COPY . .

RUN yarn run build
RUN yarn install --production=true

FROM public.ecr.aws/docker/library/node:current-alpine3.16 as production
RUN mkdir -p /card-tokenization/app
WORKDIR /card-tokenization/app

COPY --from=builder /card-tokenization/build/dist ./dist
COPY --from=builder /card-tokenization/build/node_modules ./node_modules

EXPOSE 3000:3000

CMD ["node","dist/main.js"]