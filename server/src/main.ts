import express from 'express';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import logger from './utils/logger';
import { closeDatabaseConnection, connectToDatabase } from './utils/database';
import { CORS_ORIGIN } from './constants';
import helmet from 'helmet';
import userRoute from './modules/user/user.route';
import thumbnailRoute from './modules/thumbnails/thumbnail.route';
import authRoute from './modules/auth/auth.route';
import videoRoute from './modules/videos/video.route';
import postRoute from './modules/posts/post.route';
import fileRoute from './modules/files/file.route';
import deserializeUser from './middleware/deserializeUser';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieparser());

app.use(express.json());
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
}))

app.use(helmet());
app.use(deserializeUser);
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/videos', videoRoute)
app.use('/api/thumbnails', thumbnailRoute);
app.use('/api/posts', postRoute);
app.use('/api/files', fileRoute);



const server = app.listen(PORT, async () => {
    await connectToDatabase();
    logger.info(`Server is running on port ${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

function gracefulShutdown( signal: string) {
    process.on(signal, async() => {
        server.close()

        await closeDatabaseConnection();

        logger.info(`Received ${signal}, shutting down gracefully`);

        process.exit(0);
    });
}

for(let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i]);
}

