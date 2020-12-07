import {Get, HttpRequest, HttpResponse, Start} from '@oneline/core';
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
  @Get("/wall")
  public async wall() {

     const result:any = await request();
      
     return result.html;
  }
}

start.start(parseInt(process.env.PORT||"5000") || 5000, "0.0.0.0", ()=>{
    console.log("启动成功");
})