interface IreqOllamaFetch {
  model: string;
  prompt: string;
}

interface IOllamaApiResponse {
  model: string;
  response: string;
  done: boolean;
}

interface IOllamaResult {
  model: string;
  response: string;
}

export async function ollamaFetch({ model, prompt }: IreqOllamaFetch): Promise<IOllamaResult> {
  const req = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
    }),
  });

  if (!req.ok) {
    throw new Error(`Erro ao chamar Ollama: ${req.status} ${req.statusText}`);
  }

  const data = (await req.json()) as IOllamaApiResponse;
  console.log('resultado: ', data);
  return {
    model: data.model,
    response: data.response,
  };
}
