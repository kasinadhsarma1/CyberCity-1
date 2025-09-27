import { app, BrowserWindow, shell, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import * as https from 'https';

const LIVE_URL = 'https://cyber-city-utvz.vercel.app';
const DEV_SERVER_URL = 'http://localhost:3000';

interface LoadStrategy {
    type: 'local' | 'dev' | 'live';
    url: string;
}

async function checkUrlAvailable(url: string): Promise<boolean> {
    return new Promise((resolve) => {
        const request = https.get(url, (response) => {
            resolve(response.statusCode === 200);
        }).on('error', () => {
            resolve(false);
        });
        request.end();
    });
}

async function determineLoadStrategy(): Promise<LoadStrategy> {
    // Production mode with packaged app
    if (app.isPackaged) {
        const staticPath = path.join(__dirname, '../out/index.html');
        if (fs.existsSync(staticPath)) {
            return { type: 'local', url: 'file://' + staticPath };
        }
        // Fallback to live URL in production if static files not found
        return { type: 'live', url: LIVE_URL };
    }

    // Development mode
    const devStaticPath = path.resolve(__dirname, '../../out/index.html');
    
    // Check if static export exists
    if (fs.existsSync(devStaticPath)) {
        return { type: 'local', url: 'file://' + devStaticPath };
    }
    
    // Try development server
    if (process.env.ELECTRON_START_URL || await checkUrlAvailable(DEV_SERVER_URL)) {
        return { type: 'dev', url: process.env.ELECTRON_START_URL || DEV_SERVER_URL };
    }
    
    // Fallback to live URL
    if (await checkUrlAvailable(LIVE_URL)) {
        return { type: 'live', url: LIVE_URL };
    }

    throw new Error('No valid load strategy found');
}

async function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            webSecurity: true,
        },
        autoHideMenuBar: true,
        show: false,
    });

    win.once('ready-to-show', () => {
        win.show();
    });

    // Handle external links
    win.webContents.setWindowOpenHandler(({ url }) => {
        // Allow navigation to our known URLs
        if (url.startsWith(LIVE_URL) || url.startsWith(DEV_SERVER_URL)) {
            return { action: 'allow' };
        }
        // Open external links in browser
        shell.openExternal(url);
        return { action: 'deny' };
    });

    try {
        const strategy = await determineLoadStrategy();
        console.log(`Loading app using ${strategy.type} strategy: ${strategy.url}`);
        await win.loadURL(strategy.url);

        // Development features
        if (!app.isPackaged) {
            win.webContents.openDevTools();
            console.log('DevTools opened in development mode');
        }
    } catch (error) {
        dialog.showErrorBox('Loading Error', 
            'Failed to load the application. Please check your internet connection or contact support.');
        app.quit();
    }

    return win;
}

// App lifecycle events
app.whenReady().then(async () => {
    await createWindow();

    app.on('activate', async () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            await createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
