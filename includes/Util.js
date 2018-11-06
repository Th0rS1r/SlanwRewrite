const snekfetch = require("snekfetch");
const { IMGUR_KEY } = process.env;

class Util {

	static duration(ms) {
		const secs = Math.floor((ms / 1000) % 60).toString();
		const mins = Math.floor((ms / (1000 * 60)) % 60).toString();
		const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
		const days = Math.floor(ms / (1000 * 60 * 60 * 24)).toString();
		return `${days.padStart(2, '0')}:${hrs.padStart(2, '0')}:${mins.padStart(2, '0')}:${secs.padStart(2, '0')}`;
	}

	static shorten(text, maxLen = 2000) {
		return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
	}

	static base64(text, mode = 'encode') {
		if (mode === 'encode') return Buffer.from(text).toString('base64');
		if (mode === 'decode') return Buffer.from(text, 'base64').toString('utf8');
		throw new TypeError(`${mode} is not a supported base64 mode.`);
	}

	static cleanXML(text) {
		return text
			.replace(/<br \/>/g, '')
			.replace(/&apos;|&#0?39;/g, '\'')
			.replace(/&mdash;/g, '—')
			.replace(/&ndash;/g, '–')
			.replace(/&quot;|&#0?34;/g, '"')
			.replace(/&lt;|&#0?60;/g, '<')
			.replace(/&gt;|&#0?62;/g, '>')
			.replace(/&amp;|&#0?38;/g, '&')
			.replace(/&eacute;/g, 'é')
			.replace(/\[i\]|\[\/i\]/g, '*');
	}

	static async randomFromImgurAlbum(album) {
		const { body } = await snekfetch
			.get(`https://api.imgur.com/3/album/${album}`)
			.set({ Authorization: `Client-ID ${IMGUR_KEY}` });
		if (!body.data.images.length) return null;
		return body.data.images[Math.floor(Math.random() * body.data.images.length)].link;
	}
  }
  
module.exports = Util;
