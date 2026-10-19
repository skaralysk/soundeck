<p align="center">
  <img src="https://i.imgur.com/ZVHG3hf.png" alt="Logo" width="300">
</p>
# Soundeck

**Controle o áudio dos seus aplicativos e abas em uma barra lateral para Windows.**

O Soundeck mostra os programas que estão reproduzindo som, permite ajustar ou silenciar cada sessão e pode recolher a barra quando não está em uso. Instale a extensão opcional do navegador para identificar abas audíveis pelo título e favicon e controlar individualmente mídias compatíveis.
<p align="center">
  <img src="https://i.imgur.com/zv352H6.png" alt="Logo" width="600">
</p>
## Recursos

- Mixer nativo do Windows para sessões de áudio por aplicativo.
- Barra lateral que pode ser movida, encaixada e configurada para recolher após um período sem interação.
- Ajuste de volume pela roda do mouse e botão de mudo em cada controle.
- Extensões opcionais para Firefox e navegadores Chromium, com nome e favicon das abas audíveis.
- Atalhos globais configuráveis para volume, mudo e controle da barra.
- Pulso visual suave na borda quando a barra está recolhida.
- Configurações salvas localmente no Windows.

## Baixar e instalar

Na seção **Releases**, baixe o Soundeck para Windows e, se quiser controlar o áudio por aba, a extensão do seu navegador. Use sempre o aplicativo e a extensão da mesma versão.

### Soundeck para Windows

1. Baixe o [![Download Soundeck.exe](https://img.shields.io/badge/Download-Soundeck.exe-black?style=flat-square)](https://github.com/skaralysk/soundeck/releases/download/App/Soundeck.exe) na versão desejada.
2. Abra o arquivo para iniciar o Soundeck.
3. O ícone do aplicativo fica na área de notificação do Windows. Abra as configurações por esse ícone ou pela barra lateral.

O Soundeck não precisa da extensão para controlar o volume por aplicativo. Sem ela, o Windows pode agrupar várias abas de um navegador na mesma sessão de áudio.

### Firefox

1. Baixe [`Soundeck-Firefox-Extension.xpi`](https://github.com/skaralysk/soundeck/releases/download/App/Soundeck-Firefox-Extension.xpi) da mesma versão do aplicativo.
2. No Firefox, abra `about:debugging#/runtime/this-firefox`.
3. Clique em **Carregar extensão temporária…** e selecione o arquivo `.xpi`.
4. Mantenha o Soundeck aberto e recarregue as abas com áudio.

O carregamento por `about:debugging` é temporário e precisa ser repetido quando o Firefox for reiniciado. Para instalação permanente, a extensão precisa ser assinada e distribuída pelo Firefox Add-ons.

### Chrome, Edge, Brave, Opera e Vivaldi

1. Baixe [`Soundeck-Chromium-Extension.zip`](https://github.com/skaralysk/soundeck/releases/download/App/Soundeck-Chromium-Extension.zip) da mesma versão do aplicativo.
2. Extraia o arquivo para uma pasta que não será movida ou apagada.
3. Abra a página de extensões do navegador, por exemplo `chrome://extensions` ou `edge://extensions`.
4. Ative o **Modo do desenvolvedor** e escolha **Carregar sem compactação**.
5. Selecione a pasta extraída, mantenha o Soundeck aberto e recarregue as abas com áudio.

## Usar o Soundeck

- Passe o mouse sobre um controle para interagir com ele.
- Use a roda do mouse sobre o anel para aumentar ou diminuir o volume.
- Clique no controle para alternar o mudo.
- Arraste a alça da barra para movê-la e encaixá-la em outra borda da tela.
- Abra **Configurações** para ajustar o lado, o recolhimento automático, o pulso visual e os atalhos globais.

Com a extensão instalada, cada aba audível compatível aparece com seu título e favicon. O controle nativo do navegador continua disponível para ajustar o volume geral dele.

## Atalhos globais

Os atalhos podem ser configurados para combinações como `Control+Alt+1`, `Control+Alt+K` ou teclas de função. As ações incluem aumentar ou diminuir volume, definir um nível, alternar o mudo, recolher ou mostrar a barra e enviar o pulso visual.

## Privacidade e limitações

- A extensão se comunica com o Soundeck pelo endereço local `127.0.0.1`; não é necessário criar uma conta.
- Para identificar abas, a extensão lê informações de abas e mídia nos sites em que tem permissão para funcionar.
- O controle por aba funciona com elementos de áudio e vídeo HTML compatíveis. Algumas páginas que geram som por Web Audio podem não permitir ajuste individual.
- O mixer do Windows normalmente controla o navegador inteiro quando o sistema agrupa várias abas em uma sessão.
- Se um aplicativo estiver sendo executado como administrador, o Soundeck também pode precisar ser executado como administrador para interagir com ele.

### Erro 403 entre a extensão e o aplicativo

Confira se o Soundeck e a extensão são da mesma versão. Feche instâncias antigas do Soundeck, remova a extensão anterior, instale os dois arquivos da mesma versão e reinicie o navegador.

## Configuração

As configurações são armazenadas em `%APPDATA%\Soundeck\config.json`. Configurações de instalações anteriores em `%APPDATA%\VolumeDeck` são migradas na primeira execução.
