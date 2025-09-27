
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

function getLocalIndexHtml() {
	// Try Next.js static export (out/index.html)
	const outPath = path.resolve(__dirname, '../../out/index.html');
	if (fs.existsSync(outPath)) return 'file://' + outPath;
	// Try Next.js .next/server/pages/index.html (for SSR build)
	const nextPath = path.resolve(__dirname, '../../.next/server/pages/index.html');
	if (fs.existsSync(nextPath)) return 'file://' + nextPath;
	return null;
}

function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
		},
	});

	// Try to load local build first
	const localIndex = getLocalIndexHtml();
		if (localIndex) {
			win.loadURL(localIndex);
		} else {
			// Fallback: load online URL (set ELECTRON_ONLINE_URL env var)
			const onlineUrl = process.env.ELECTRON_ONLINE_URL;
			if (onlineUrl) {
				win.loadURL(onlineUrl);
			} else {
				win.loadURL('about:blank'); // Show blank if nothing is available
			}
		}
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
