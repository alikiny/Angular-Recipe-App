import { Ingredient } from '../shared/ingredient.model';


export class Recipe{
    public name:string;
    public description:string;
    public image:string
    public level:string
    public time:number
    public ingredients:Ingredient[]
    public process:string
  

    constructor(name:string,description:string,
        image:string,level:string,time:number,ingredients:Ingredient[],process:string){
        this.name=name
        this.description=description
        this.image=image
        this.level=level
        this.time=time
        this.ingredients=ingredients
        this.process=process
        
    }
}