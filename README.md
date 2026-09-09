# 🚧 Simulação do Akamai API Prioritization com Nginx + NJS + Docker

Este projeto implementa uma simulação local do **cloudlet API Prioritization** da Akamai, utilizando apenas **Nginx** com o módulo **NJS** (nginx JavaScript) e **Docker**.  
O objetivo é controlar dinamicamente (via requisições HTTP) se uma aplicação está em modo de **contenção** ou não, servindo uma página de bloqueio ou a aplicação normal (tela de login simulada).

---

## 📦 O que foi feito?

- **Nginx** com módulo **NJS** instalado (dentro do container `nginx:alpine`).
- Um script JavaScript (`status.js`) que:
  - Lê/grava o estado da contenção em um arquivo (`/etc/nginx/data/contencao.txt`).
  - Expõe dois endpoints:
    - `/status` → retorna o estado atual em JSON.
    - `/set?value=true|false` → altera o estado.
- Uma regra no `app.conf` que:
  - Se o estado for `true`, retorna `503` e exibe uma página de contenção (`contencao.html`).
  - Se o estado for `false`, serve a tela de login (`login.html`) como aplicação normal.
- Duas páginas HTML:
  - `login.html` → simulando a interface do Bradesco Net Empresa (identidade visual personalizada).
  - `contencao.html` → mensagem de serviço indisponível.

---

## 🛠️ Tecnologias utilizadas

- Docker / Docker Compose
- Nginx (imagem `nginx:alpine`)
- Módulo NJS (`nginx-module-njs`)
- HTML + CSS (responsivo e estilizado)

---

## 📁 Estrutura de diretórios
projeto-docker/
├── docker-compose.yml (opcional, mas recomendado)
├── Dockerfile
├── nginx/
│ ├── nginx.conf
│ └── conf.d/
│ └── app.conf
├── njs/
│ └── status.js
└── html/
├── login.html
└── contencao.html


---

## 🚀 Como subir localmente

### Pré‑requisitos

- Docker (versão 20.10+)
- Docker Compose (opcional, mas facilita)
- Git Bash (no Windows) ou terminal Linux/Mac

### 1. Clone ou crie a estrutura de pastas

Certifique‑se de que todos os arquivos estejam nos lugares indicados acima.

### 2. Construa a imagem e rode o container

**Com Docker Compose:**

```bash
docker-compose up -d --build

**Sem Docker Compose:**
docker build -t containment-nginx .
docker run -d --name containment-nginx -p 8080:80 containment-nginx


# testando
#status da contencao
curl "http://localhost:8080/status"
# Liga
curl "http://localhost:8080/set?value=true"
# Acessa a página (deve retornar 503 e o HTML de contenção)
curl -v http://localhost:8080/

# Desliga
curl "http://localhost:8080/set?value=false"
# Acessa a página (deve retornar 200 e o login.html)
curl -v http://localhost:8080/