import {Post, Start} from '@oneline/core';

const start = new Start();

class Index {
  @Post("/wall")
  public async wall() {
     return "hello";
  }
}

start.start(5000, ()=>{
    console.log("启动成功");
})