# Servidor Web com Express E MySQL - Professor Lucas

Este é um projeto Node.js que utiliza o [Nodemon](https://nodemon.io/) para reiniciar automaticamente o servidor durante o desenvolvimento.

## Instruções de Instalação

### Baixando o Repositório

1. Acesse o repositório no GitHub e clique no botão `Code` (Código).
2. Selecione a opção `Download ZIP` para baixar o repositório como um arquivo ZIP.

### Extraindo o Repositório

1. Navegue até o diretório onde o arquivo ZIP foi baixado.
2. Extraia o conteúdo do arquivo ZIP para um diretório conhecido. Por exemplo: `C:\projetos\projeto-express`.
3. Nesse momento será criada outra pasta dentro do diretório "projeto-express", pode mover os arquivos contidos nela para a pasta "projeto-express" e apagar a referida pasta.
4. Caso tenha dúvidas nessa etapa, leia a seção: "Recomendação de criação de diretório", a seguir.

### Recomendação de criação de diretório

1. Recomendo criar uma pasta chamada "projetos" na raiz do C:\
2. Dentro da pasta, crie outra pasta chamada "projeto-express"
3. Extrair os arquivos nessa pasta
4. Quando é extraido vai ser criada uma pasta com o nome desse repositório, sendo assim mova os arquivos dentro da pasta para a pasta "projeto-express"
5. Pode deletar a pasta que foi criada ao extrai esse repositório mantendo somente a pasta src com o arquivo index.js, o arquivo .gitignore, package.json, package-lock.json

### Abrindo o Projeto no Visual Studio Code

1. Abra o Visual Studio Code.
2. No menu principal, selecione `File` (Arquivo) > `Open Folder...` (Abrir Pasta...).
3. Navegue até o diretório onde você extraiu o repositório e selecione a pasta do projeto. Por exemplo: `C:\projetos\projeto-express`.

### Instalando as Dependências

1. Abra um terminal no Visual Studio Code. Você pode fazer isso selecionando `Terminal` > `New Terminal` (Novo Terminal) no menu principal.
2. No terminal, certifique-se de que você está no diretório raiz do projeto. Caso contrário, navegue até lá usando o comando `cd`. Por exemplo:
   ```sh
   cd C:\projetos\projeto-express
   ```
3. Execute o comando abaixo para instalar todas as dependências necessárias:
   ```sh
   npm install
   ```

### Rodando o Projeto

1. Após instalar as dependências, ainda no terminal, execute o comando abaixo para iniciar o projeto usando o Nodemon:
   ```sh
   npx nodemon src/index.js
   ```

Isso iniciará o servidor e o Nodemon irá monitorar as mudanças nos arquivos para reiniciar automaticamente o servidor sempre que necessário.
