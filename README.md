# Alive App

# **COMO INICIAR A APLICAÇÃO?**

A aplicação é divida em dois contextos principais: Client e API. Para executar e testar a aplicação, você precisará executar as seguintes linhas de comando no seu terminal respectivamente para cada diretório:

“**/API**”

```tsx
yarn install
yarn dev

//para testes
yarn test
```

Certifique-se de duplicar o seu .env.example e renomeá-lo para .env. Na variável TOKEN, você precisará coletá-lo (caso queira), no site oficial da API, em: [https://www.alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key)

Após isso, basta substituir após a igualdade.

RESULTADO ESPERADO:

![image](https://user-images.githubusercontent.com/58860863/184511796-5cc94305-2427-4d55-884f-82f4b7f80b65.png)

“**/client**”

```tsx
yarn install
yarn start

//para testes
yarn test
```

Por fim, certifique-se que a baseURL utilizada no serviço da API do client corresponde ao endereço que a sua API estará rodando. Por padrão, ela rodará no [localhost](http://localhost), ou seja, a sua baseURL precisará conter o seguinte:

diretório: “/client/src/services/StockingAPI.ts”

```tsx
export const stockingAPIInstance = axios.create({
  baseURL: "http://localhost:3333",
});
```

Perceba que a porta na baseURL que usei é **exatamente** a mesma que recebemos no terminal ao executar a API, ou seja, 3333.

Sua aplicação agora está configurada e pronta para ser utilizada.

# **FUNCIONAMENTO**

**OBSERVAÇÃO:** A api utilizada tem o limite de apenas 5 requisições por minuto, então poderá acontecer alguma inconsistência durante o uso da aplicação, tendo em vista que nada será respondido no próximo minuto, pois a API da alphavantage nos bloqueou temporariamente. Portanto, é normal que ao rodar “yarn test” na API, apenas 5 testes (dos 6 existentes) passem, pois o último será bloqueado.

Seguem as prints do sistema funcionando:

**QUOTES**

![image](https://user-images.githubusercontent.com/58860863/184511810-eeda1049-6bd0-49cf-8df9-b7ecf7017392.png)

![image](https://user-images.githubusercontent.com/58860863/184511815-9b5456d2-3dca-4b3e-9a78-146ff437abea.png)

![image](https://user-images.githubusercontent.com/58860863/184511819-ac378dd5-bc79-4f85-9235-a3314952576b.png)

**HISTORY**

![image](https://user-images.githubusercontent.com/58860863/184511822-5efd1248-d2f9-4d9b-a6a5-26514b5afa6a.png)

![image](https://user-images.githubusercontent.com/58860863/184511827-02448a58-d0b9-4cdb-a91b-ffddf7bc7218.png)

![image](https://user-images.githubusercontent.com/58860863/184511830-1cd8a627-a02f-4e82-8ac7-5aeb061cf5ec.png)

**COMPARISON**

![image](https://user-images.githubusercontent.com/58860863/184511833-94a43751-b58d-4001-b755-9f7f2ddaafcb.png)

![image](https://user-images.githubusercontent.com/58860863/184511835-50d32309-3fea-4363-9b79-e7e24111818f.png)

**GAINS/LOSS**

![image](https://user-images.githubusercontent.com/58860863/184511853-2be10ca2-fe97-4379-b2b8-d6395483c8bf.png)

![image](https://user-images.githubusercontent.com/58860863/184511856-1cc1e4b5-7a10-4679-9768-a1749020aec2.png)

![image](https://user-images.githubusercontent.com/58860863/184511857-abf468fe-fed8-46a0-9a1f-568e54424741.png)

![image](https://user-images.githubusercontent.com/58860863/184511859-179ce466-6a72-43c6-83bf-9e1b302a17df.png)

# **OBSERVAÇÕES**

Para construir a API, utilizei Typescript, Axios, Path Register (para aplicar o path mapping), Express, Jest para os testes e o dotenv para variáveis de ambiente.

- [x] Path mapping (clean code)
- [x] Clean Architecture
- [x] Gitmoji to commits
- [x] Export files from DIR by index practice
- [x] Exception handling with validators
- [x] Interfaces/DTOs in controllers, services etc
- [x] English with own language into code

O foco do desenvolvimento da API foi explicitar algumas práticas de organização e padrão de projeto que gosto de utilizar. A separação consiste em ter algumas pastas gerais dentro de “./src”. São elas:

Controllers → Responsáveis por processar a requisição HTTP e direcionar a chamada de serviços

Interfaces → Onde se encontram as tipagens generalistas para utilização no sistema

Lib → Onde temos o centralizador de rotas da aplicação, separadas por contexto em um objeto

Modules → Onde centralizei os casos de uso da aplicação

Dentro de modules temos alguns casos de uso, guardando os seus respectivos serviços, interfaces de transferência de objeto e seus testes automatizados

Routes → Onde temos as intâncias de rotas para o framework Express

Services → Onde centralizamos todas as configurações e chamadas da API externa que estamos consumindo ([https://www.alphavantage.co](https://www.alphavantage.co/))

Validators → Onde temos alguns modelos de Exceptions padrões para utilizar nas validações dos dados.

**PATH MAPPING**

Uma outra adaptação de suma importância para organização de código, foi a configuração do path mapping na aplicação, que aconteceu por intermédio de uma lib chamada “tsconfig-paths”, declarada nos scripts do package.json

![image](https://user-images.githubusercontent.com/58860863/184511862-c91f32cf-292a-4d87-8cb2-8d0fa540210b.png)

Sendo assim, como o próprio nome da lib já nos deixa ciente, é preciso ainda configurar os “paths” do projeto no nosso tsconfig.json. Essa foi a configuração que escolhi:

![image](https://user-images.githubusercontent.com/58860863/184511867-9b63b941-c37a-48a3-b86a-5b50a8ce2401.png)

**GITMOJI**

Uma outra abordagem interessante que senti necessidade de mostrar, foi a utilização da extensão do VSCODE chamada Gitmoji para utilizar padronizações de commits, com o fito de deixar ainda mais organizado e melhorar a experiência de desenvolvimento com os desenvolvedores. Segue uma print mostrando o exemplo:

![image](https://user-images.githubusercontent.com/58860863/184511874-12357e6b-fe7d-4460-bf51-f5b3bf16230d.png)

Cada emoji tem uma descrição subentendida, como por exemplo esses:

![image](https://user-images.githubusercontent.com/58860863/184511878-7fc3426a-6e64-4404-941f-82e16f365dad.png)
