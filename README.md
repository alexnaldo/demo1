# Iniciando - Instalar o Json Server (porta 3000)

**Note**: É necessário ter o [JSon Server](https://github.com/typicode/json-server)
```bash
npm install -g json-server
```
 ## Rodando o JSon Server
Execute o comando a seguir diretamente na pasta principal do projeto

```bash
json-server --watch db.json
```
Se o app der algum erro de conexão, reinie o json-server assim:
```bash
json-server --host 127.0.0.1 --watch db.json

```

**Note** Os testes foram feitos no emulador do Android, que utiliza a porta 10.0.2.2 como alternativa ao localhost. Para rodar no iOS, necessário alterar o arquivo src/data/api.ts