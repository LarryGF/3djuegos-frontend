/*
**  Nuxt
*/
const http = require('http')
const { Nuxt, Builder } = require('nuxt')
let config = require('./nuxt.config.js')
config.rootDir = __dirname // for electron-builder
// Init Nuxt.js
const nuxt = new Nuxt(config)
const builder = new Builder(nuxt)
const server = http.createServer(nuxt.render)
// Build only in dev mode
if (config.dev) {
	builder.build().catch(err => {
		console.error(err) // eslint-disable-line no-console
		process.exit(1)
	})
}
// Listen the server
server.listen()
const _NUXT_URL_ = `http://localhost:${server.address().port}`
console.log(`Nuxt working on ${_NUXT_URL_}`)





/*
** Electron
*/
let win = null // Current window
const electron = require('electron')
const path = require('path')
const app = electron.app
const newWin = () => {
	win = new electron.BrowserWindow({
		icon: path.join(__dirname, 'static/icon.png')
	})
	win.maximize()
	win.on('closed', () => win = null)
	if (config.dev) {
		// Install vue dev tool and open chrome dev tools
		const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer')
		installExtension(VUEJS_DEVTOOLS.id).then(name => {
			console.log(`Added Extension:  ${name}`)
			win.webContents.openDevTools()
		}).catch(err => console.log('An error occurred: ', err))
		// Wait for nuxt to build
		const pollServer = () => {
			http.get(_NUXT_URL_, (res) => {
				if (res.statusCode === 200) { win.loadURL(_NUXT_URL_) } else { setTimeout(pollServer, 300) }
			}).on('error', pollServer)
		}
		pollServer()
	} else { return win.loadURL(_NUXT_URL_) }
}
app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())



/*************************************************************
 * py process
 *************************************************************/

const PY_DIST_FOLDER = 'pycalcdist'
const PY_FOLDER = 'pycalc'
const PY_MODULE = 'api' // without .py suffix

let pyProc = null
let pyPort = null

const guessPackaged = () => {
	const fullPath = path.join(__dirname, PY_DIST_FOLDER)
	return require('fs').existsSync(fullPath)
}

const getScriptPath = () => {
	if (!guessPackaged()) {
		return path.join(__dirname, PY_FOLDER, PY_MODULE + '.py')
	}
	if (process.platform === 'win32') {
		return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE + '.exe')
	}
	return path.join(__dirname, PY_DIST_FOLDER, PY_MODULE, PY_MODULE)
}

const selectPort = () => {
	pyPort = 4242
	return pyPort
}

// const createPyProc = () => {
//   let script = getScriptPath()
//   let port = '' + selectPort()

//   if (guessPackaged()) {
//     pyProc = require('child_process').execFile(script, [port])
//   } else {
//     pyProc = require('child_process').spawn('python', [script, port])
//   }

//   if (pyProc != null) {
//     //console.log(pyProc)
//     console.log('child process success on port ' + port)
//   }
// }

const createPyExample = () => {
	let home = path.join(__dirname, '..', 'pyenv')
	let boot = path.join(__dirname, '..', 'boot.sh')
	process.env.PYTHONHOME = home
	let python_path = path.join(home, 'bin', 'python')
	let uvicorn = path.join(home, 'bin', 'uvicorn')
	let port = '' + selectPort()

	console.log(home)
	console.log(python_path)
	console.log(uvicorn)

	pyProc = require('child_process').spawn(boot, [], {detached: true})

	if (pyProc != null) {
		// console.log(pyProc)
		console.log('child process success on port ' + boot)
	}
}

const exitPyProc = () => {
	// pyProc.kill()
	process.kill(-pyProc.pid)
	pyProc = null
	pyPort = null
}
if (!config.dev) {
	app.on('ready', createPyExample)
	app.on('will-quit', exitPyProc)
}