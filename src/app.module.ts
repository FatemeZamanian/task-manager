import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { AuthModule } from "./@auth/module/auth.module"
import { JwtService } from "@nestjs/jwt"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env", // Explicitly specify the path
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, AuthModule],
      useFactory: (configService: ConfigService) => {
        // Debug logging
        console.log("DATABASE_HOST:", configService.get("DATABASE_HOST"))
        console.log("DATABASE_PORT:", configService.get("DATABASE_PORT"))
        console.log("DATABASE_USER:", configService.get("DATABASE_USER"))
        console.log("DATABASE_DB:", configService.get("DATABASE_DB"))

        return {
          type: "postgres",
          host: configService.get("DATABASE_HOST"),
          port: configService.get("DATABASE_PORT"),
          username: configService.get("DATABASE_USER"),
          password: configService.get("DATABASE_PASSWORD"),
          database: configService.get("DATABASE_DB"),
          entities: [__dirname + "/**/*.model{.ts,.js}"],
          synchronize: false,
          autoLoadEntities: true,
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtService],
})
export class AppModule {}
