{SerialPort}  =   require('serialport')
fs 		      =   require 'fs'
express       =   require 'express'
io 		      =   require 'socket.io'
http 	      =   require 'http'
sys 		  =   require 'sys'
red 		  =   require 'node-red'
dweetClient   =   require 'node-dweetio'
port 		  =   '/dev/ttyACM1'
serialport	  =   null
debug		  =	  true
ard_data	  =	  "$"
scan	      =	  "$"
resetspec	  =	  "$"
dweet         =   "$"

# Server listens for get requests, socket.io communication at http port
app = express()
server = http.createServer app
server.listen 7000
io = io.listen server
io.set 'log level', 3

# Session configuration
#app.use express.static(__dirname + '/spectra')
app.use("/",express.static(__dirname + '/spectra'))

app.use express.cookieParser()
app.set 'view engine', 'jade'

# Routes
app.get '/', (req, res) ->
    res.sendfile __dirname + '/spectra/index.html'
    req.session.views++

app.get '/spectra/stylesheets/screen.css', (req, res) ->
    res.sendfile __dirname + '/spectra/stylesheets/screen.css'
    
app.get '/spectra/favicon.png', (req, res) ->
    res.sendfile __dirname + '/spectra/favicon.png'

app.get '/spectra/javascripts/snap.svg-min.js', (req, res) ->
	res.sendfile __dirname + '/spectra/javascripts/snap.svg-min.js'
	
app.get '/spectra/javascripts/jquery.fancybox.pack.js', (req, res) ->
    res.sendfile __dirname + '/spectra/javascripts/jquery.fancybox.pack.js'
    
app.get '/spectra/images/social/github.png', (req, res) ->
    res.sendfile __dirname + '/spectra/images/social/github.png'

app.get '/spectra/images/social/rss.png', (req, res) ->
    res.sendfile __dirname + '/spectra/images/social/rss.png'

app.get '/spectra/font/fontawesome-webfont.ttf', (req, res) ->
    res.sendfile __dirname + '/spectra/font/fontawesome-webfont.ttf'
    
app.get '/spectra/atom.xml', (req, res) ->
    res.sendfile __dirname + '/spectra/atom.xml'
    
app.get '/spectra/images/test.svg', (req, res) ->
    res.sendfile __dirname + '/spectra/images/test.svg'


# Socket Signal
io.sockets.on 'connection', (socket) ->
	socket.on 'message', (msg) ->
		if debug is true then console.log msg
		
	socket.on 'disconnect', ->
		if debug is true then console.log 'Disconnected'

	socket.on 'initspec', (startwave,stopwave) ->
		ard_data = "#0!" + startwave + stopwave + "."
		if debug is true then console.log startwave, stopwave, ard_data
		if sf is true then serialport.write ard_data else socket.emit 'sff'
		
	socket.on 'scanspec', ->
		scanspec = "#1!."
		if debug is true then console.log scanspec
		if sf is true then serialport.write scanspec else socket.emit 'sff'
		
	socket.on 'resetspec', ->
		resetspec = "#2!."
		if debug is true then console.log resetspec
		if sf is true then serialport.write resetspec else socket.emit 'sff'

				
#----------------------------Serial Data-------------------------------#

cleanData = '' # this stores the clean data
readData = ''  # this stores the buffer
sf = false     # flag to write to serialport, for communicating with arduino, ...

# Checking arduino connected to usb port
console.log "Starting..."

#----------------------------TCP/IP Data-------------------------------#

# Dweet Setup    
dweetio = new dweetClient
dweetio.listen_for "d2dweath", (dweet) ->
	io.sockets.emit 'hour', dweet.content
	console.log dweet.content
