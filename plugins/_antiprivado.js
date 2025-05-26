export async function before(m, {conn, isAdmin, isBotAdmin, isOwner, isROwner}) {
    if (m.isBaileys && m.fromMe) return !0;
    if (m.isGroup) return !1;
    if (!m.message) return !0;
    if (m.text.includes('PIEDRA') || m.text.includes('PAPEL') || m.text.includes('TIJERA') || m.text.includes('serbot') || m.text.includes('jadibot')) return !0;
    const chat = global.db.data.chats[m.chat];
    const bot = global.db.data.settings[this.user.jid] || {};
    if (bot.antiPrivate && !isOwner && !isROwner) {
      await m.reply(`> 🤡 Hola @${m.sender.split`@`[0]}, Lo Siento No Esta 📌Permitido Escribirme Al Privado ⚠️ Por Lo Cual Seras Bloqueado/A\n\n\n\n\n _Ayudame a cumplir mi meta_\n Canal\nhttps://whatsapp.com/channel/0029Vb5UfTC4CrfeKSamhp1f
si quieres usar la bot únete al grupo OFC 
https://chat.whatsapp.com/FlTlNh9sdW5LXYXGZIX0vn`, false, {mentions: [m.sender]});
      await this.updateBlockStatus(m.chat, 'block');
    }
    return !1;
  }