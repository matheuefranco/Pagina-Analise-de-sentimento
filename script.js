async function analisarSentimento() {
    const texto = document.getElementById("textoParaAnalisar").value;
    const resultadoDiv = document.getElementById("resultado");
    if (typeof apiKey === 'undefined') {
        console.error("O arquivo config.js não foi carregado ou a variável apiKey não está definida.");
        resultadoDiv.textContent = "Erro: O arquivo config.js não foi carregado ou a chave de API não está configurada.";
        return;
    }
    resultadoDiv.textContent = "Analisando...";




    const model = 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const prompt = `Analise o sentimento da seguinte sentença e classifique-o como POSITIVO, NEGATIVO ou NEUTRO. Apresente apenas a classificação.`;

    const payload = {
        contents: [
            {
                role: "user",
                parts: [{ text: prompt }],
            },
            {
                role: "user",
                parts: [{ text: texto }],
            },
        ],
        generationConfig: {
            temperature: 0.2, // Ajuste a temperatura conforme necessário (máximo 1.0)
            topK: 32,        // Ajuste o topK conforme necessário
            topP: 0.8,       // Ajuste o topP conforme necessário
        },
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erro na requisição:", errorData);
            resultadoDiv.textContent = `Erro na análise: ${errorData.error.message || response.statusText}`;
            return;
        }

        const data = await response.json();
        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
            resultadoDiv.textContent = data.candidates[0].content.parts[0].text.trim().toUpperCase();
        } else {
            resultadoDiv.textContent = "Não foi possível obter o sentimento.";
        }

    } catch (error) {
        console.error("Erro ao enviar a requisição:", error);
        resultadoDiv.textContent = `Erro na análise: ${error.message}`;
    }
}