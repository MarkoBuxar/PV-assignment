// todo: create basic route abstract class

import { Router } from 'express';
import { Database } from '../Database';

export class Check {
  public baseRoute: string;
  public router: Router;
  public static schemas: string[] = [];

  constructor() {
    this.baseRoute = '/';
    this.router = Router();

    this.router.put('/check/:id', async (req, res) => {
      // #swagger.tags = ['Todo List']

      /* #swagger.responses[200] = {
                description: "Checks off a TODO task",
                }
            }  
        */

      try {
        const id = req.params.id;

        if (typeof id == null || typeof id == 'undefined') return;

        const todoDB = await Database.Instance.endpoints['todos'];

        const currentData = await todoDB.findByPk(id);

        let newDate: any = null;

        if (currentData.completed_at == null || currentData.completed_at == '')
          newDate = new Date();

        await todoDB.update(
          { completed_at: newDate },
          {
            where: {
              id: id,
            },
          },
        );

        res.status(200).send('okay');
      } catch (error) {
        res.status(400).send(error);
      }
    });
  }
}
