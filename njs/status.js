const fs = require('fs');
const filePath = '/etc/nginx/data/contencao.txt';

// Lê o arquivo e retorna 'true' ou 'false'
function getStatus() {
    try {
        const data = fs.readFileSync(filePath, 'utf8').trim();
        return data === 'true' ? 'true' : 'false';
    } catch (e) {
        return 'false';
    }
}

// Retorna JSON com o estado atual
function statusJson(r) {
    const status = getStatus();
    r.return(200, JSON.stringify({ contencao: status === 'true' }));
}

// Altera o estado via query parameter ?value=true|false
function setStatus(r) {
    const val = r.args.value;
    if (val !== 'true' && val !== 'false') {
        r.return(400, JSON.stringify({ error: 'Valor deve ser "true" ou "false"' }));
        return;
    }
    try {
        fs.writeFileSync(filePath, val, 'utf8');
        r.return(200, JSON.stringify({ contencao: val === 'true', message: 'Status atualizado' }));
    } catch (e) {
        r.return(500, JSON.stringify({ error: 'Falha ao escrever arquivo' }));
    }
}

export default { getStatus, statusJson, setStatus };