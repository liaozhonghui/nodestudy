/**
 * TODO: 增加处理认证的证书
 */
const key = getTLSKeySomehow()
const cert = getTLSCertSomehow()

function getTLSCertSomehow() {
    return '';
}
function getTLSKeySomehow() {
    return '';
}

// QUIC core
function geneQuic() {
    const { CreateQuickSocket } = require('net');
    const socket = CreateQuickSocket({ endpoint: { port: 1234 } })
}