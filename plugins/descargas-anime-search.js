/* Código hecho por I'm Fz `
 - https/Github.com/FzTeis
*/

const searchAnime = async (query) => {
  const url = `https://tioanime.com/directorio?q=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(url);
    const html = response.data;

    const $ = cheerio.load(html);

    const results = [];
    $('ul.animes li').each((_, element) => {
      const name = $(element).find('h3.title').text().trim();
      const id = $(element).find('a').attr('href').split('/').pop();
      const image = $(element).find('img').attr('src');
      const animeUrl = `https://tioanime.com${$(element).find('a').attr('href')}`; 

      results.push({
        name,
        id,
        image: `https://tioanime.com${image}`,
        url: animeUrl, 
      });
    });

    return results;
  } catch (error) {
    console.error('Error al buscar el anime:', error.message);
    return { error: 'No se pudieron obtener los resultados' };
  }
};

let handler = async (m, { conn, command, args, text, usedPrefix }) => {
  if (!args[0]) throw `*\`🌱 Ingresa el nombre de un anime para buscar.\`*`
  // if (args.length > 1) throw `*\`🌱 Sólo se admite un argumento.\`*`
  const results = await searchAnime(args[0]);
  if (results.length === 0) throw `*\`🌱 No se encontraron resultados.\`*`

  const messages = [];
  for (const { name, id, url, image } of results) {
    messages.push([
      `Info del anime`,
      `Título: ${name}\n\n🔖 ID: ${id}\n*Usa este ID para descargar el anime o bien, selecciona una opción de la lista.*`,
      image,
      [],
      [[`${url}`]],
      [],
      [{ title: `Selecciona para obtener la información del anime.`, rows: [
        { title: name, description: 'Click para obtener información detallada del anime.', rowId: `${usedPrefix}animeinfo ${url}` }
      ]}]
    ]);
  }

  await conn.sendCarousel(m.chat, '', `\`\`\`¡Hola! A continuación te muestro la lista de animes encontrados\`\`\``, "", messages, m);
}

handler.command = ['animes', 'animesearch', 'animess']
handler.estrellas = 0;

export default handler