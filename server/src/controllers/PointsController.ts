import { Request, Response } from 'express'
import knex from '../database/connection'

class PointsController {
  async store(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body

    try {
      const trx = await knex.transaction()

      const item = {
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
      }

      const insertedIds = await trx('points').insert(item)

      const point_id = insertedIds[0]

      const pointItems = items.map((item_id: number) => {
        return {
          item_id,
          point_id,
        }
      })

      await trx('point_items').insert(pointItems)

      trx.commit()
      return response.json({
        id: point_id,
        ...item,
      })
    } catch (error) {
      console.error(error)
      return response.json({ error: 'um erro inesperado ocorreu' })
    }
  }
}

export default PointsController
