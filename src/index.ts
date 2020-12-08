import {Get, HttpRequest, HttpResponse, Post, Start} from '@oneline/core';
import * as net from 'superagent';
const start = new Start();




async function request() {
    const promise = new Promise((resolve)=>{
       net.get("https://www.youtube.com").end((err, resp)=>{
           console.log(resp)
           resolve({header: resp.header, html: resp.text});
       })
    })

    return promise;
}


class Index {
  @Post("/wall")
  public async wall(req:HttpRequest, resp: HttpResponse) {
 
     const result:any = await request();

     resp.setContentType("text/html");
     resp.send(result.html);
      
     return;
  }
}

start.start(parseInt(process.env.PORT||"5000") || 5000, "0.0.0.0", ()=>{
    console.log("启动成功");
})