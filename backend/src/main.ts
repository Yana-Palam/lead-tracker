import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule)

    app.enableCors({
        origin: process.env.FRONTEND_URL,
    })

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        })
    )

    app.setGlobalPrefix('api')

    const config = new DocumentBuilder()
        .setTitle('Lead Tracker API')
        .setDescription('Mini CRM for managing leads')
        .setVersion('1.0')
        .addTag('Leads')
        .addTag('Comments')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document)

    await app.listen(process.env.PORT ?? 4000)
}

bootstrap().catch((err) => {
    console.error('Failed to start server:', err)
    process.exit(1)
})
