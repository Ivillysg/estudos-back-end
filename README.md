# Aplicação de estudos
 A aplicação tem como propósito otimizar o sistema de autenticação e manipulação de transações bancárias dos usuários. A ideia é utilizar tecnologias que garantam performance, como o Redis para leitura rápida de dados do usuário e RabbitMQ para comunicação entre serviços, garantindo escalabilidade e modularidade.

#### Serviço Usuário:
- [X] Criar um fluxo de cadastro e autenticação completo no Fastify utilizando SQL sem ORM implementando migrations no banco.
- [X] Criar uma entidade Profile que consiste em armazenar os dados do usuário nesse sistema de autenticação utilizando o JSONB(banco NoSQL do Postgres)
- [X] Quando o usuário estiver logado armazenar as informações dele no Redis pra ter uma leitura mais rápida
  
#### Serviço transações bancárias:
- [ ] Criar um serviço utilizando o Express que armazenará transações bancárias
- [ ] Essas transações devem estar armazenadas num banco mongoDB
- [ ] Deixar as duas aplicações em containers docker
- [ ] Realizar a comunicação entre os dois serviços utilizando o RabbitMQ

