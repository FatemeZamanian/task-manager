import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { NextFunction, Request, Response } from "express"
require("dotenv").config()
@Injectable()
export class TaskMiddleware implements NestMiddleware {
  constructor(private jwt: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers["authorization"]) {
      let jsn: any = null
      try {
        jsn = this.jwt.verify(req.headers["authorization"].split(" ")[1], {
          secret: process.env.APP_SECRET,
        })
      } catch (e) {
        console.log(e)
        throw new HttpException("Unauthorised Access", HttpStatus.UNAUTHORIZED)
      }

      if (!req.body) {
        req.body = {
          jwt: jsn,
        }
      } else {
        req.body.jwt = jsn
        ;(req as any).jwt = jsn
      }
      next()
    } else {
      throw new HttpException(
        "Your request has been unauthorized. please login",
        HttpStatus.UNAUTHORIZED,
      )
    }
  }
}
