FROM nginx:alpine

# Instala o módulo NJS
RUN apk add --no-cache nginx-module-njs

# Remove a configuração padrão
RUN rm /etc/nginx/conf.d/default.conf

# Copia os arquivos de configuração
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/conf.d/app.conf /etc/nginx/conf.d/app.conf

# Copia o script NJS
COPY njs/status.js /etc/nginx/njs/status.js

# Copia a página HTML de contenção
COPY html/contencao.html /usr/share/nginx/html/contencao.html
COPY html/login.html /usr/share/nginx/html/login.html

# Cria o diretório para o arquivo de estado e define permissões
RUN mkdir -p /etc/nginx/data && \
    touch /etc/nginx/data/contencao.txt && \
    echo "false" > /etc/nginx/data/contencao.txt && \
    chown -R nginx:nginx /etc/nginx/data

# Expõe a porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]