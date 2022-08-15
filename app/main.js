const electron = require( "electron" );
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
electron.crashReporter.start( { companyName: "my company", submitURL: "https://mycompany.com" } );
 
var mainWindow = null;

app.on(
    "window-all-closed",
    function()
    {
        // if ( process.platform != "darwin" )
        {
            app.quit();
        }
    }
);

app.on(
    "ready",
    function()
    {
        var subpy = require( "child_process" ).spawn( "python", [ "./hello.py" ] );
        // var subpy = require( "child_process" ).spawn( "./dist/hello.exe" );
        var rp = require( "request-promise" );
        var mainAddr = "http://127.0.0.1:3000/app/index.html";

        var OpenWindow = function()
        {
            mainWindow = new BrowserWindow( {width: 800, height: 600} );
            //mainWindow.loadURL( "index.html" );
            mainWindow.loadURL( mainAddr );
            //mainWindow.webContents.openDevTools();
            var python = require('child_process').spawn('python', ['./hello.py']);
    python.stdout.on('data',function(data){
	    console.log("data: ",data.toString('utf8'));
    });
            mainWindow.on(
                "closed",
                function()
                {
  
                    mainWindow = null;
                    
                    subpy.kill( "SIGINT" );
                }
            );
        };

        var StartUp = function()
        {
            rp( mainAddr )
            .then(
                function( htmlString )
                {
                    console.log( "server started!" );
                    OpenWindow();
                }
            )
            .catch(
                function( err )
                {
                    console.log( "waiting for the server start..." );
                    // without tail call optimization this is a potential stack overflow
                    StartUp();
                }
            );
        };

        // fire!
        StartUp();
        
        
});