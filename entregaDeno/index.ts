import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

const port = 8000;
const app = new Application();

const router = new Router();
const colores:any[]=[];
router.get('/', (ctx) => {
    ctx.response.body = JSON.parse(localStorage.getItem('colores') || "[]");
});
router.post('/:color', (ctx) => {
    if(ctx.params.color){
        colores.push(ctx.params.color);
        localStorage.setItem("colores", JSON.stringify(colores));
    }
  ctx.response.body = 'Received a POST '+ctx.params.color;
});

app.use(router.allowedMethods());
app.use(router.routes());

app.addEventListener('listen', () => {
  console.log(`Listening on: localhost:${port}`);
});

await app.listen({ port });