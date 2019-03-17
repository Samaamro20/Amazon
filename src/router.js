const fs = require('fs');
const path = require('path');

const router =(request,response)=>{
	if (request.url === '/' ) {
		var htmlPath = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(htmlPath, (error, file) => {
        if(error){
            response.writeHead(404, {'Content-Type': 'text/html'});
            response.end('<h1>Page Not Found</h1><p>Error Code 404</p>');
            return
        }
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(file);
    });
	}
	else
	{
		console.log('Error');
	}
}
module.exports=router;
