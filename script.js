const apiKey = 'AIzaSyDMK3ULxaBRqza9tT5pWwE_7noXtMdZCSA'; // Substitua pela sua chave de API

async function analisarSentimento() {
    const texto = document.getElementById("textoParaAnalisar").value;
    const resultadoDiv = document.getElementById("resultado");
    if (typeof apiKey === 'undefined') {
        console.error("O arquivo config.js não foi carregado ou a variável apiKey não está definida.");
        resultadoDiv.textContent = "Erro: O arquivo config.js não foi carregado ou a chave de API não está configurada.";
        return;
    }
    resultadoDiv.textContent = "Analisando...";


    const model = 'gemini-3.1-flash-lite';
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