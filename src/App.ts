import * as express from "express";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import "reflect-metadata";
require('dotenv').config();

/* Import GraphQL Resolvers, Context */
import { TodoResolver, UserResolver } from './resolvers';
import { ApolloContext } from './context/ApolloContext';

/* User AuthCheck */
import { ApolloAuthChecker } from './context/AuthChecker';

class App {
  public app: express.Application;

  public static bootstrap (): App {
    return new App();
  }

  constructor () {
    // new App을 통해서 생성하면 app에 express가 생성
    this.app = express();
    this.app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.send("TypeScript & GraphQL & ApolloServer & Express 적용 연습");
    });
  }
}

const main = async () => {

  /* DB Connection 과정 */
  // 기존에는 Sequelize를 통해 접속했다면, TypeORM의 createConnection을 통해서 DB와 연결 
  // await를 썼기 때문에 async를 위해서 main이라는 함수를 선언해서 실행했음.
  await createConnection({    
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
      __dirname + "/entity/*.ts"   // 기존에 Models를 Entity를 이용하여 담아준다.
    ],
    synchronize: true
  })
  .then(() => {
    console.log('DB connection is successful with typeorm');
  })
  .catch((err) => {
    console.log(err)
  });

  const port: number = 4000;
  const app: express.Application = App.bootstrap().app;  // new App()을 통해 생성했고 할당된 class 안에 있는 app변수를 app에 할당  
  
  const schema = await buildSchema({                     // type-graphQL 모듈의 method를 통해 resolvers 할당 
    resolvers: [ TodoResolver, UserResolver ],
    authChecker: ApolloAuthChecker
  });

  const server = new ApolloServer({                // ApolloServer를 생성하여 server에 할당 
    context: ApolloContext,                        // token을 위한 context 주입.
    schema,
    playground: true
  });

  /*
    미들웨어가 같은 경로에 마운트되도록 한다. 
    Apollo server는 미들웨어에 express.Application을 적용시킨다.
    apollo-server-express 는 express framework 위에 보다 더 쉽게 graphql resolver 를 구현할 수 있는 기능을 제공.
    Express에서 Apollo Server를 시작하는 데 필요한 부분을 가져와야합니다. 
    Apollo Server의 applyMiddleware () 메서드를 사용하면 모든 미들웨어 (이 경우 Express)를 옵트 인 할 수 있습니다.
  */
 
  server.applyMiddleware({ app, path: '/graphql' });  

  await app.listen({ port: port }, () => {
    console.log(`Express & Apollo Server listening at ${port}`);
  });
}

main();

