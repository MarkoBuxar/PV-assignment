// todo: create basic route abstract class

import { Router } from 'express';
import { Database } from '../Database';

export type todoResponse = {
  title: string;
  created_at: any;
  completed_at: any;
  due_date: any;
};

export type todoConstruct = {
  title: string;
  due_date?: any;
};

export type todoUpdate = {
  title?: string;
  due_date?: any;
  completed_at?: any;
};

export class Todo {
  public baseRoute: string;
  public router: Router;
  public static schemas: string[] = [
    'todoResponse',
    'todoConstruct',
    'todoUpdate',
  ];

  constructor() {
    this.baseRoute = '/';
    this.router = Router();

    this.router.get('/todo', async (req, res) => {
      // #swagger.tags = ['Todo List']

      /* #swagger.responses[200] = {
                description: "Returns all TODO tasks",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#components/schemas/todoResponse"
                        },
                        example: [{ 
                            title: "Clean Up", 
                            created_at: "234234234",
                            completed_at: "234234234",
                            due_date: "234234234"
                        }]
                    }           
                }
            }  
        */

      try {
        const todo = await Database.Instance.endpoints['todos'].findAll();

        res.status(200).send(todo);
      } catch (error) {
        res.status(400).send(error);
      }
    });

    this.router.post('/todo', async (req, res) => {
      // #swagger.tags = ['Todo List']

      /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/todoConstruct" },
                    example: { 
                        title: "clean up",
                        due_date: "234234234"
                    }
                }
            }
        }
    */

      /*
      #swagger.responses[200] = {
        description: "Creates a TODO task"
      }  
    */

      try {
        const body = req.body;

        const todoDB = await Database.Instance.endpoints['todos'];
        const todo = await todoDB.build(body);

        await todo.save();

        res.status(200).send('okay');
      } catch (error) {
        res.status(400).send(error);
      }
    });

    this.router.put('/todo/:id', async (req, res) => {
      // #swagger.tags = ['Todo List']

      /* #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/todoUpdate" },
                    example: { 
                        title: "clean up",
                        due_date: "234234234"
                    }
                }
            }
        }
    */

      /*
      #swagger.responses[200] = {
        description: "updates a TODO task"
      }  
    */

      try {
        const id = req.params.id;

        const body = req.body;

        const todoDB = await Database.Instance.endpoints['todos'];
        await todoDB.update(body, {
          where: {
            id: id,
          },
        });

        res.status(200).send('okay');
      } catch (error) {
        res.status(400).send(error);
      }
    });

    this.router.delete('/todo/:id', async (req, res) => {
      // #swagger.tags = ['Todo List']

      /*
      #swagger.responses[200] = {
        description: "deletes a TODO task"
      }  
    */

      try {
        const id = req.params.id;

        if (typeof id == 'undefined') throw new Error('ID cannot be empty');

        const todoDB = await Database.Instance.endpoints['todos'];
        await todoDB.destroy({
          where: {
            id: id,
          },
        });

        res.status(200).send('okay');
      } catch (error) {
        res.status(400).send(error);
      }
    });
  }
}
