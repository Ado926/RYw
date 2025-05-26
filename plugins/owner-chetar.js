const handler = async (m, { conn }) => {
    const allowedNumber = '51921826291@s.whatsapp.net';
    
    if (m.sender !== allowedNumber) {
        // Opcional: enviar mensaje de acceso denegado
        return conn.sendMessage(m.chat, { text: 'No tienes permiso para usar este comando.' }, { quoted: m });
    }

    const user = global.db.data.users[m.sender];
    conn.sendMessage(m.chat, { text: `🚩 *@${m.sender.split('@')[0]} Ahora tienes recursos ilimitados*`, mentions: [m.sender] }, { quoted: m });
    
    global.db.data.users[m.sender].money = Infinity;
    global.db.data.users[m.sender].estrellas = Infinity;
    global.db.data.users[m.sender].level = Infinity;
    global.db.data.users[m.sender].exp = Infinity;
};

handler.help = ['cheat'];
handler.tags = ['owner'];
handler.command = /^(ilimitado|infiniy|chetar)$/i;
// Quita rowner para que no solo los dueños puedan usarlo, porque ya controlamos por número
handler.rowner = false;
handler.fail = null;

export default handler;
