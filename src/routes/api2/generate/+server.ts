import { json, type RequestHandler } from '@sveltejs/kit';
import { Ollama } from 'ollama';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const ollama = new Ollama({ host: 'http://localhost:11434' });

		const body = await request.json();
		const chatMessage = body.chat?.trim();

		if (!chatMessage) {
			return json({ error: 'Missing message in request body.' }, { status: 400 });
		}

		const user = {
			name: 'Nicole Izabella Casalan',
			likes: ['formula 1', 'k-drama', 'ice cream'],
			hobbies: ['painting', 'reading', 'gaming'],
			userType: 'tu-tu-du-du max verstappen'
		};

		const chat = await ollama.chat({
			model: 'gemma:2b',
			messages: [
				{
					role: 'system',
					content: `You are an assistant. You can only answer questions using this user profile:

Name: ${user.name}
Likes: ${user.likes.join(', ')}
Hobbies: ${user.hobbies.join(', ')}
User Type: ${user.userType}

Rules:
- If asked "what is my name?" reply only: "My name is ${user.name}."
- If asked "what are my hobbies?" reply only: "My hobbies are ${user.hobbies.join(', ')}."
- If asked "what do I like?" reply only: "I like ${user.likes.join(', ')}."
- If asked "what is my user type?" reply only: "My user type is ${user.userType}."
- Do NOT explain or mention you are an AI. No extra context. Just answer directly.`
				},
				{
					role: 'user',
					content: chatMessage
				}
			]
		});

		return json({ response: chat.message?.content || 'No response.' });
	} catch (err: any) {
		console.error('Error in chat handler:', err);
		return json({ error: 'Something went wrong' }, { status: 500 });
	}
};