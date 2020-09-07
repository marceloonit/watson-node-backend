require('dotenv').config();
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistant = new AssistantV2({
  authenticator: new IamAuthenticator({ apikey: process.env.WATSONASSISTANT_APIKEY }),
  serviceUrl: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-09-19'
});

const App = async () => {
    const session = async (assistantId) => {
            const response = await assistant.createSession({
                assistantId: assistantId
            })

        return response.result.session_id;
    }

    const session_id = await session(process.env.WATSONASSISTANT_ID);

    assistant.message({
        input: { text: "Olá, pode me passar o contato da Indyxa?" },
        assistantId: process.env.WATSONASSISTANT_ID,
        sessionId: session_id,
    })
    .then(response => {
        console.log(JSON.stringify(response.result, null, 2));
     })
    .catch(err => {
     console.log(err);
     });
}

App();