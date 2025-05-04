# Sistema de Previsão de Sentimentos - IFSULDEMINAS

Este é um sistema de análise de sentimentos que utiliza o modelo **Gemini** para classificar textos como **POSITIVO**, **NEGATIVO** ou **NEUTRO**. A aplicação foi desenvolvida para fins educacionais e demonstra o uso de APIs de linguagem natural para análise de texto.

## Funcionalidades

- Entrada de texto para análise.
- Classificação do sentimento do texto inserido.
- Exibição do resultado diretamente na interface.

## Tecnologias Utilizadas

- **HTML5** e **CSS3** com **Bootstrap 5** para a interface.
- **JavaScript** para a lógica de interação e requisições.
- **Gemini API** para análise de sentimentos.

## Como Funciona

1. O usuário insere um texto no campo de entrada.
2. Ao clicar no botão "Analisar Sentimento", o texto é enviado para a API **Gemini**.
3. A API processa o texto e retorna a classificação do sentimento.
4. O resultado é exibido na tela.

## Configuração Necessária

Para que a aplicação funcione corretamente, é necessário configurar uma chave de API (**API Key**) no arquivo `config.js`. Siga os passos abaixo:

### 1. Criar uma API Key

1. Acesse o console do Google Cloud Platform.
2. Ative a API **Generative Language API**.
3. Crie uma chave de API para o projeto.

### 2. Configurar o Arquivo `config.js`

Crie um arquivo chamado `config.js` no mesmo diretório do arquivo `script.js` e adicione o seguinte conteúdo:

```javascript
const apiKey = 'SUA_CHAVE_DE_API_AQUI'; // Substitua pela sua chave de API